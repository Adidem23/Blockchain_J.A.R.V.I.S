import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type Testimonial = {
  name: string
  role: string
  avatar?: string
  content: string
}

type MarqueeRowProps = {
  items: Testimonial[]
  direction?: "left" | "right"
  durationSeconds?: number
  className?: string
  gapRem?: number
}

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean)
  return (parts[0]?.[0] || "").concat(parts[1]?.[0] || "").toUpperCase()
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <Card className="min-w-[300px] max-w-[240px] border bg-card">
      <div className="p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={
                t.avatar ||
                "/placeholder.svg?height=40&width=40&query=ai%20human%20face%20portrait%20web3%20professional" ||
                "/placeholder.svg"
              }
              alt={`${t.name}'s profile`}
            />
            <AvatarFallback>{initials(t.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="text-sm font-medium">{t.name}</div>
            <span className="text-xs text-muted-foreground">{t.role}</span>
          </div>
        </div>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{t.content}</p>
      </div>
    </Card>
  )
}

function MarqueeRow({ items, direction = "left", durationSeconds = 28, className, gapRem = 0.75 }: MarqueeRowProps) {
  const doubled = [...items, ...items]

  return (
    <div
      className={cn("marquee", className)}
      style={
        {
          ["--marquee-duration" as any]: `${durationSeconds}s`,
          ["--marquee-gap" as any]: `${gapRem}rem`,
        } as React.CSSProperties
      }
      aria-hidden={false}
    >
      <div className={cn("marquee-track", direction === "left" ? "animate-marquee-left" : "animate-marquee-right")}>
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const rowA: Testimonial[] = [
    {
      name: "Alex Morgan",
      role: "Smart Contract Engineer • Web3",
      avatar: "/ai-human-face-portrait-smart-contract-engineer.jpg",
      content: "The UX feels polished and fast. It just works the way I expect.",
    },
    {
      name: "Priya Shah",
      role: "DeFi Product Owner",
      avatar: "/ai-human-face-portrait-defi-product-owner.jpg",
      content: "Setup was simple. We shipped our MVP with confidence.",
    },
    {
      name: "Daniel Wu",
      role: "Full‑stack dApp Developer",
      avatar: "/ai-human-face-portrait-dapp-developer.jpg",
      content: "Performance is excellent and the components are thoughtfully designed.",
    },
    {
      name: "Sofia Hernandez",
      role: "Blockchain UI Engineer",
      avatar: "/ai-human-face-portrait-ui-engineer.jpg",
      content: "Clean, modern, and easy to customize for our brand.",
    },
    {
      name: "Liam O’Connor",
      role: "Web3 Community Lead",
      avatar: "/ai-human-face-portrait-community-lead.jpg",
      content: "Great developer experience—clear patterns and sensible defaults.",
    },
  ]

  const rowB: Testimonial[] = [
    {
      name: "Maya Patel",
      role: "Security Researcher • L2",
      avatar: "/ai-human-face-portrait-security-researcher.jpg",
      content: "Accessibility is first-class. Our users noticed the difference.",
    },
    {
      name: "Chris Evans",
      role: "Protocol PM • DeFi",
      avatar: "/ai-human-face-portrait-protocol-pm.jpg",
      content: "The architecture scales with our needs. Zero friction.",
    },
    {
      name: "Jamal Green",
      role: "Growth • Web3",
      avatar: "/ai-human-face-portrait-growth-lead.jpg",
      content: "Love the slim design. Professional without being noisy.",
    },
    {
      name: "Emma Rossi",
      role: "Token Ops Manager",
      avatar: "/ai-human-face-portrait-token-ops.jpg",
      content: "Documentation and patterns made onboarding a breeze.",
    },
    {
      name: "Noah Kim",
      role: "AI x Web3 Engineer",
      avatar: "/ai-human-face-portrait-ai-web3-engineer.jpg",
      content: "Reliable foundation for building fast, beautiful apps.",
    },
  ]

  return (
    <section id="reviews" aria-labelledby="testimonials-heading" className="w-full py-20 sm:py-8 bg-black mt-8">
      <div className="container mx-auto w-full px-4 flex flex-col items-center justify-center h-full">
        <div className="mx-auto max-w-xl text-center">
          <h1 id="testimonials-heading" className="text-balance text-4xl font-semibold tracking-tight sm:text-4xl">
            What Our Customers Say
          </h1>
          <p className="mt-2 text-pretty text-sm text-muted-foreground sm:text-base">
            Hear From 100+ Customers
          </p>
        </div>

        <div className="mt-6 w-full">
          <MarqueeRow items={rowA} direction="left" durationSeconds={26} gapRem={0.75} />
        </div>
        <div className="mt-3 sm:mt-4 w-full">
          <MarqueeRow items={rowB} direction="right" durationSeconds={30} gapRem={0.75} />
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection