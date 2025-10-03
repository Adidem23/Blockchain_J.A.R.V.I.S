import express from "express";
import { ethers } from "ethers";
import { createZGComputeNetworkBroker } from "@0glabs/0g-serving-broker";

const app = express();
app.use(express.json());

const rpcUrl = "https://evmrpc-testnet.0g.ai"; // testnet RPC
const provider = new ethers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || "", provider);

let broker: any;

// Initialize broker once
async function initBroker() {
  if (!broker) {
    broker = await createZGComputeNetworkBroker(wallet);

    // Add some ledger balance (assumes your wallet has OG tokens)
    await broker.ledger.addLedger("0.1");

    console.log("Broker initialized");
  }
}

// Endpoint: /ask
app.post("/ask", async (req, res) => {
  try {
    await initBroker();

    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Missing 'question' in body" });
    }

    // Get services
    const services = await broker.inference.listService();
    if (services.length === 0) {
      return res.status(500).json({ error: "No inference services available" });
    }

    const svc = services[0];
    const providerAddress = svc.provider;

    await broker.inference.acknowledgeProviderSigner(providerAddress);

    const { endpoint, model } = await broker.inference.getServiceMetadata(providerAddress);
    const headers = await broker.inference.getRequestHeaders(providerAddress, question);

    const resp = await fetch(`${endpoint}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: question }],
      }),
    });

    const data = await resp.json();
    const answer = data.choices?.[0]?.message?.content;

    return res.json({ question, answer, raw: data });
  } catch (err: any) {
    console.error("Error:", err);
    return res.status(500).json({ error: err.message || "Unknown error" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`0G Inference API server running at http://localhost:${PORT}`);
});
