import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { WalrusClient } from "@mysten/walrus";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Setup Walrus client
const suiClient = new SuiClient({ url: getFullnodeUrl("testnet") });
const walrusClient = new WalrusClient({ suiClient, network: "testnet" });

// Save transcript to Walrus
app.post("/store", async (req, res) => {
    console.log("Received /store request");
  try {

    console.log("Received /store request with body:", req.body);
    const { transcript } = req.body;
    if (!transcript) return res.status(400).send({ error: "No transcript provided" });


    const data = new Uint8Array(Buffer.from(transcript, "utf-8"));
const result = await walrusClient.upload({ data });


    console.log("Walrus upload result:", result);

    // Extract blobId safely

    console.log("Walrus upload result:", result);
    const blobId = result.blobId || result.certificate?.blobObject?.blobId;

    if (!blobId) {
      return res.status(500).send({ error: "No blobId returned", debug: result });
    }

    res.send({ blobId });
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).send({ error: "Failed to store transcript", details: err.message });
  }
});

// Serve frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log("✅ Backend running at http://localhost:3000");
});

