"use client"

import type React from "react"
import { useState } from "react"
import { FadeIn } from "@/components/animations/fade-in"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          message: "",
        })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // const faqs = [
  //   {
  //     question: "What is your typical process for new projects?",
  //     answer:
  //       "My process typically involves an initial consultation to understand your needs, followed by a proposal outlining scope, timeline, and cost. Once approved, I begin the creative work with regular check-ins for feedback until the final delivery.",
  //   },
  //   {
  //     question: "How long does a typical project take?",
  //     answer:
  //       "Project timelines vary based on complexity and scope. A simple design might take 1-2 weeks, while a comprehensive video production could take 4-6 weeks. I'll provide a specific timeline during our initial consultation.",
  //   },
  //   {
  //     question: "Do you offer ongoing social media management?",
  //     answer:
  //       "Yes, I offer ongoing social media management services including content creation, scheduling, community engagement, and performance analytics. We can discuss a customized package based on your needs.",
  //   },
  //   {
  //     question: "What are your payment terms?",
  //     answer:
  //       "I typically require a 50% deposit to begin work, with the remaining balance due upon project completion. For ongoing services, monthly retainers are paid at the beginning of each month.",
  //   },
  //   {
  //     question: "Do you work with clients internationally?",
  //     answer:
  //       "Yes, I work with clients globally. With modern communication tools, distance is not a barrier to creating great work together.",
  //   },
  //   {
  //     question: "What file formats do you deliver?",
  //     answer:
  //       "For designs, I provide industry-standard formats including AI, PSD, PDF, JPG, and PNG. For videos, I deliver in MP4, MOV, or other formats as needed. All deliverables are provided in both high-resolution and web-optimized versions.",
  //   },
  // ]

  return (
    <div className="max-w-[64rem] mx-auto px-4 pt-24 pb-16">
      <FadeIn>
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Get in Touch</h1>
          <p className="text-white/70">
            Have a project in mind or want to discuss a collaboration? I'd love to hear from you.
          </p>
        </div>
      </FadeIn>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <FadeIn delay={0.1}>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="text-white font-medium mb-2">Email</h3>
              <p className="text-white/70">abdikarinalimohamud@gmail.com</p>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="text-white font-medium mb-2">Phone</h3>
              <p className="text-white/70">+252 613796512</p>
              {/* <p className="text-white/70 mt-1">WhatsApp: +252 617710604</p> */}
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="text-white font-medium mb-2">Location</h3>
              <p className="text-white/70">Mogadishu, Somalia</p>
              {/* <p className="text-white/70"></p> */}
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      {/* Contact Form */}
      <FadeIn delay={0.4}>
        <Card className="bg-white/5 border-white/10 mb-12">
          <CardContent className="p-6">
            <h2 className="text-xl font-medium text-white mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border-white/20"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Your Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border-white/20"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20"
                  placeholder="+1 (123) 456-7890"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/20"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-white/10 border-white/20"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-purple-600 hover:bg-purple-700">
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </FadeIn>

      {/* FAQ Section */}
      {/* <FadeIn delay={0.5}>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <h2 className="text-xl font-medium text-white mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                  <AccordionTrigger className="text-white hover:text-white/90 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </FadeIn> */}
    </div>
  )
}
