// For Next.js App Router (app/contact/page.tsx)
import { Mail, Send, Twitter, Github } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 pt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-6 border">
        {/* Contact Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Your Name</label>
            <input
              type="text"
              className="mt-1 w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              className="mt-1 w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              className="mt-1 w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
              placeholder="Tell us what's on your mind..."
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </form>

        {/* Direct Contact */}
        <div className="text-center">
          <p className="text-sm text-gray-600">Prefer email?</p>
          <a
            href="mailto:support@linkdude.com"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <Mail className="w-4 h-4" />
            support@linkdude.com
          </a>
        </div>

        {/* Socials */}
        <div className="flex justify-center gap-6 pt-4">
          <a
            href="https://twitter.com/linkdude"
            target="_blank"
            className="text-gray-500 hover:text-blue-500"
          >
            <Twitter />
          </a>
          <a
            href="https://github.com/linkdude"
            target="_blank"
            className="text-gray-500 hover:text-black"
          >
            <Github />
          </a>
        </div>
      </div>
    </main>
  );
}
