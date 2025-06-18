import { Metadata } from "next"
import WaitlistContainer from "@/components/dashboard/waitlist/WaitlistContainer"

export const metadata: Metadata = {
  title: "Waitlist - ClosetMind",
  description: "Manage your virtual try-on waitlist",
}

export default function WaitlistPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Virtual Try-On Waitlist</h1>
      <WaitlistContainer />
    </div>
  )
}
