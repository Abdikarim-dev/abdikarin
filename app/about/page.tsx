import Link from "next/link"
import { AboutBanner } from "@/components/about-banner"

export default function AboutPage() {
  const experiences = [
    {
      title: "Video Editor",
      company: "Waaberi Media, Türkiye",
      period: "Jul 2024 – Present",
      location: "Remote",
      keyPoints: [
        "Produced and edited 50+ documentary and advertisement videos using Adobe Premiere Pro and After Effects, achieving 95% client satisfaction rate",
        "Implemented advanced color grading and motion graphics techniques, reducing post-production time by 30% while enhancing visual storytelling quality",
        "Collaborated with international production teams to deliver content that generated 2M+ combined views across digital platforms",
      ],
    },
    {
      title: "Social Media Manager",
      company: "Waaberi Academy, Türkiye",
      period: "Jan 2025 – Present",
      location: "Remote",
      keyPoints: [
        "Strategically managed multi-platform social media presence (Instagram, Facebook, Twitter), increasing follower engagement by 150% within first month",
        "Designed and executed 200+ visual content pieces including promotional posters and branded materials, strengthening brand recognition by 40%",
        "Analyzed performance metrics using social media analytics tools, optimizing content strategy that resulted in 75% improvement in reach and conversion rates",
      ],
    },
    {
      title: "Media Officer",
      company: "Soderma Health and Wellness, Mogadishu",
      period: "Aug 2024 – Dec 2024",
      location: "Somalia",
      keyPoints: [
        "Spearheaded multimedia content creation for health awareness campaigns, producing 25+ educational videos that reached 500K+ viewers across Somalia",
        "Led cross-functional team of 8 members in developing integrated media strategies, resulting in 60% increase in brand awareness within target demographics",
        "Streamlined content production workflow and quality assurance processes, reducing project delivery time by 25% while maintaining broadcast-quality standards",
      ],
    },
    {
      title: "Chief of External Affairs",
      company: "Salaam University Student Association (SUSA), Mogadishu",
      period: "Feb 2023 – Feb 2025",
      location: "Somalia",
      keyPoints: [
        "Established strategic partnerships with 15+ universities and organizations, creating exchange programs that benefited 1,200+ students annually",
        "Successfully negotiated resource-sharing agreements worth $50K+ in educational materials and training opportunities for student development",
        "Orchestrated 30+ professional workshops and skill-building programs, achieving 90% participant satisfaction and improving graduate employability by 35%",
      ],
    },
  ]

  const education = [
    {
      degree: "Bachelor's Degree in Public Administration",
      institution: "Salaam University (SU), Mogadishu, Somalia",
      period: "2021 - 2024",
      note: "Graduated with Outstanding Performance",
    },
    {
      degree: "High School Diploma",
      institution: "SYL Primary & Secondary School, Mogadishu, Somalia",
      period: "Graduated: 2021",
    },
  ]

  const certificates = [
    {
      title: "Honors Degree In Public Administration",
      issuer: "Salaam University",
      date: "Dec 2024",
      note: "Awarded for outstanding academic performance and leadership within the department.",
    },
    {
      title: "Introduction to Project Management",
      issuer: "IBM Online",
      date: "June 2024",
    },
    {
      title: "Quantitative Research",
      issuer: "University of California, Davis, US",
      date: "May 2024",
    },
    {
      title: "Qualitative Research",
      issuer: "University of California, Davis, US",
      date: "March 2024",
    },
    {
      title: "Research Proposal: Initiating Research",
      issuer: "University of California, Davis, US",
      date: "February 2024",
    },
    {
      title: "Understanding Research Methods",
      issuer: "SOAS University of London, UK",
      date: "January 2024",
    },
    {
      title: "International Organizations Management",
      issuer: "University of Geneva, Switzerland",
      date: "December 2023",
    },
    {
      title: "International Leadership and Organizational Behavior",
      issuer: "Università Bocconi, Italy",
      date: "November 2023",
    },
    {
      title: "Teamwork Skills: Communicating Effectively in Groups",
      issuer: "University of Colorado Boulder, US",
      date: "October 2023",
    },
    {
      title: "Understanding Political Concepts",
      issuer: "Università di Napoli Federico II, Italy",
      date: "September 2023",
    },
  ]

  const skills = [
    { name: "Research Analysis", level: 80 },
    { name: "Data Analysis", level: 75 },
    { name: "Project Management", level: 85 },
    { name: "Leadership & Teamwork", level: 85 },
    { name: "Content Creation", level: 95 },
    { name: "Video Editing", level: 90 },
    { name: "Graphic Design", level: 85 },
    { name: "Communication", level: 90 },
    { name: "Public Relations", level: 85 },
    { name: "Problem-Solving", level: 85 },
    { name: "Critical Thinking", level: 85 },
    { name: "Governance Analysis", level: 80 },
  ]

  const languages = [
    { name: "Somali", level: "Native" },
    { name: "English", level: "Advanced" },
    { name: "Arabic", level: "Beginner" },
  ]

  const references = [
    {
      name: "Dr. Abdifitah Ahmed Ali (Afyare)",
      title: "Dean Of EMS, Salaam University",
      contact: {
        phone: "0615526519",
        email: "Drabdifatah@salaam.edu.so",
      },
    },
    {
      name: "Mr. Yusuf Abdisalam Sodal",
      title: "Head of SME Banking, IBS Bank",
      contact: {
        phone: "+252615331780",
        email: "Yusuf.sodal@ibsbank.so",
      },
    },
    {
      name: "Mr. Abdifitah Abdulkadir (Toxow)",
      title: "Director Of PBO, Government",
      contact: {
        phone: "0615109494",
        email: "Mr.toxow@gmail.com",
      },
    },
  ]

  return (
    <div className="animate-fade-in">
      {/* Replace the old about section with our new banner */}
      <AboutBanner />

      <div className="max-w-[64rem] mx-auto px-4 pb-16">
        {/* Career Statement */}
        <section className="mb-16 bg-white/5 p-8 rounded-md text-center animate-slide-up animate-delay-200">
          <h2 className="text-2xl font-bold text-white mb-4">Career Statement</h2>
          <p className="text-xl text-white/80 italic">
            "I strive to live with integrity, work diligently, and embrace lifelong learning, knowing that these values
            shape a purposeful and fulfilling life."
          </p>
        </section>

        {/* Professional Experience */}
        <section className="mb-16 animate-slide-up animate-delay-300">
          <h2 className="text-2xl font-bold text-white mb-8">Professional Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-white/5 p-6 rounded-md animate-fade-in border-l-4 border-purple-500/30"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                    <p className="text-purple-400 font-medium">{exp.company}</p>
                    <p className="text-white/50 text-sm">{exp.location}</p>
                  </div>
                  <div className="text-white/50 mt-2 md:mt-0 text-sm bg-purple-500/20 px-3 py-1 rounded-full w-fit font-medium">
                    {exp.period}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-white font-medium text-sm mb-3 text-purple-300">Key Achievements & Impact:</h4>
                  <ul className="space-y-3">
                    {exp.keyPoints.map((point, pointIndex) => (
                      <li key={pointIndex} className="text-white/80 text-sm flex items-start leading-relaxed">
                        <span className="text-purple-400 mr-3 mt-1 text-lg">▸</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        {/* <section className="mb-16 animate-slide-up animate-delay-400">
          <h2 className="text-2xl font-bold text-white mb-8">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-white/5 p-6 rounded-md animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-medium text-white">{edu.degree}</h3>
                    <p className="text-purple-400">{edu.institution}</p>
                  </div>
                  <div className="text-white/50 text-sm bg-purple-500/20 px-3 py-1 rounded-full">{edu.period}</div>
                </div>
                {edu.note && <p className="text-white/70">{edu.note}</p>}
              </div>
            ))}
          </div>
        </section> */}

        {/* Certificates & Awards */}
        {/* <section className="mb-16 animate-slide-up animate-delay-500">
          <h2 className="text-2xl font-bold text-white mb-8">Certificates & Awards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.slice(0, 6).map((cert, index) => (
              <div
                key={index}
                className="bg-white/5 p-6 rounded-md animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <h3 className="text-white font-medium mb-1">{cert.title}</h3>
                <p className="text-purple-400 text-sm mb-2">{cert.issuer}</p>
                <div className="flex justify-between">
                  <span className="text-white/50 text-sm">{cert.date}</span>
                  {cert.note && <span className="text-white/70 text-sm">{cert.note}</span>}
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* Skills & Capabilities */}
        {/* <section className="mb-16 animate-slide-up animate-delay-600">
          <h2 className="text-2xl font-bold text-white mb-8">Skills & Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white/5 p-4 rounded-md animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 50}ms` }}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-white">{skill.name}</span>
                  <span className="text-white/50">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${skill.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* Languages */}
        {/* <section className="mb-16 animate-slide-up animate-delay-700">
          <h2 className="text-2xl font-bold text-white mb-8">Languages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {languages.map((lang, index) => (
              <div
                key={index}
                className="bg-white/5 p-6 rounded-md text-center animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <h3 className="text-white font-medium text-lg mb-2">{lang.name}</h3>
                <p className="text-purple-400">{lang.level}</p>
              </div>
            ))}
          </div>
        </section> */}

        {/* References */}
        {/* <section className="mb-16 animate-slide-up animate-delay-800">
          <h2 className="text-2xl font-bold text-white mb-8">References</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {references.map((ref, index) => (
              <div
                key={index}
                className="bg-white/5 p-6 rounded-md animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <h3 className="text-white font-medium mb-1">{ref.name}</h3>
                <p className="text-purple-400 text-sm mb-3">{ref.title}</p>
                <div className="text-white/70 text-sm space-y-1">
                  <p>Phone: {ref.contact.phone}</p>
                  <p>Email: {ref.contact.email}</p>
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="bg-white/5 rounded-lg p-8 text-center animate-slide-up animate-delay-900">
          <h2 className="text-2xl font-bold text-white mb-4">Interested in working together?</h2>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
          </p>
          <Link
            href="/contact"
            className="px-6 py-3 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition-colors button-hover"
          >
            Contact Me
          </Link>
        </section>
      </div>
    </div>
  )
}
