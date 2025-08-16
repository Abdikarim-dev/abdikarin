import Link from "next/link"
import { GeometricBanner } from "@/components/geometric-banner"
import { RecentWorks } from "@/components/recent-works"

export default function HomePage() {
  const services = [
    {
      icon: "palette",
      title: "Graphic Design",
      description:
        "Social media graphics, promotional materials, and visual content to represent your brand effectively.",
    },
    {
      icon: "video",
      title: "Video Graphy & Editing",
      description:
        "Documentary-style videos, advertisements, and engaging visual stories that communicate effectively.",
    },
    {
      icon: "users",
      title: "Social Media Management",
      description: "Strategic content planning, curation, and analytics to grow your online presence and engagement.",
    },
  ]

  const experiences = [
    {
      category: "Video Editing",
      company: "Waaberi Media",
      location: "Türkiye (Remote)",
      period: "Jul 2024 - Present",
      description:
        "Edited documentary and advertisement videos, creating concise and visually engaging content using creative techniques.",
    },
    {
      category: "Social Media",
      company: "Waaberi Academy",
      location: "Türkiye (Remote)",
      period: "Jan 2025 - Present",
      description:
        "Managed social media content, designed visual materials, and analyzed metrics to optimize engagement and brand visibility.",
    },
  ]

  const skills = [
    "Content Creation",
    "Video Editing",
    "Graphic Design",
    "Social Media Management",
    "Project Management",
    "Leadership & Teamwork",
    "Research Analysis",
    "Data Analysis",
    "Public Relations",
    "Problem-Solving",
    "Critical Thinking",
    "Public Policy Analysis",
  ]

  const education = [
    {
      icon: "graduation-cap",
      title: "Bachelor's in Public Administration",
      institution: "Salaam University (SU), Mogadishu, Somalia",
      period: "2021 - 2024",
      note: "Graduated with Outstanding Performance",
    },
    {
      icon: "certificate",
      title: "Professional Certifications",
      institution:
        "Multiple certifications in Project Management, Research Methods, International Leadership, and more from prestigious institutions including IBM, University of California, and University of Geneva.",
      period: "2023 - 2024",
    },
  ]

  const languages = [
    { name: "Somali", level: "Native" },
    { name: "English", level: "Advanced" },
    { name: "Arabic", level: "Beginner" },
  ]

  return (
    <div className="max-w-[64rem] mx-auto px-4 py-8 md:py-16 animate-fade-in">
      {/* Replace the old hero section with our new geometric banner */}
      <GeometricBanner />

      {/* Recent Works Section */}
      <RecentWorks />

      {/* Services Section */}
      <section className="mb-20 animate-slide-up animate-delay-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">My Services</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            I offer a range of creative and management services to help organizations stand out in the digital landscape
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/5 p-6 rounded-md card-hover animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-md flex items-center justify-center mb-4">
                {service.icon === "palette" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-400"
                  >
                    <circle cx="13.5" cy="6.5" r=".5" />
                    <circle cx="17.5" cy="10.5" r=".5" />
                    <circle cx="8.5" cy="7.5" r=".5" />
                    <circle cx="6.5" cy="12.5" r=".5" />
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                  </svg>
                )}
                {service.icon === "video" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-400"
                  >
                    <path d="m22 8-6 4 6 4V8Z" />
                    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                  </svg>
                )}
                {service.icon === "users" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-400"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                )}
              </div>
              <h3 className="text-white font-medium text-lg mb-2">{service.title}</h3>
              <p className="text-white/70 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Experience */}
      {/*
       <section className="mb-20 animate-slide-up animate-delay-200">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">Professional Experience</h2>
          <p className="text-white/70">A glimpse into my professional journey and expertise</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-md overflow-hidden card-hover animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="aspect-video relative">
                <Image src="/placeholder.svg?height=225&width=400" alt={exp.company} fill className="object-cover" />
              </div>
              <div className="p-4">
                <div className="text-sm text-purple-400 mb-1">{exp.category}</div>
                <h3 className="text-white font-medium mb-1">{exp.company}</h3>
                <div className="flex justify-between text-sm text-white/50 mb-3">
                  <span>{exp.location}</span>
                  <span>{exp.period}</span>
                </div>
                <p className="text-white/70 text-sm">{exp.description}</p>
                <div className="mt-4">
                  <Link
                    href="/about"
                    className="text-sm text-purple-400 hover:text-purple-300 inline-flex items-center"
                  >
                    View Projects
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/about"
            className="px-6 py-3 bg-white/5 text-white rounded-md font-medium hover:bg-white/10 transition-colors inline-flex items-center"
          >
            View Full Experience
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
      */}

      {/* Skills & Expertise */}
      <section className="mb-20 animate-slide-up animate-delay-300">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">Skills & Expertise</h2>
          <p className="text-white/70">Professional tools and capabilities I use to deliver exceptional results</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white/5 p-4 rounded-md text-center hover:bg-white/10 transition-colors animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 50}ms` }}
            >
              <span className="text-white">{skill}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white/5 rounded-lg p-8 text-center animate-slide-up animate-delay-600">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to start your project?</h2>
        <p className="text-white/70 mb-6 max-w-2xl mx-auto">
          Let's collaborate to bring your vision to life with compelling content and effective strategies.
        </p>
        <Link
          href="/contact"
          className="px-6 py-3 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition-colors button-hover"
        >
          Contact Me
        </Link>
      </section>
    </div>
  )
}
