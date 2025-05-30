// src/components/FeatureCardsWithScrollEffects.jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FeatureCard } from '@/components/FeatureCard';

import { Calendar, Users, CheckCircle, Clock, Mail, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const featureCardsData = [
  {
    title: "Automated Scheduling",
    description: "Schedule recurring 1:1s and check-ins that adapt to your team's availability.",
    icon: Calendar,
    accent: '#4371e5',
    facts: [
      "AI-powered meeting time suggestions",
      "Integrates with Google Calendar & Outlook",
      "Adjusts for time zones"
    ]
  },
  {
    title: "Team Management",
    description: "Easily organize your team members, their goals, and progress in one place.",
    icon: Users,
    accent: '#ff7d5c',
    facts: [
      "Customizable team structures",
      "Role-based access control",
      "Visual dashboards"
    ]
  },
  {
    title: "Goal Tracking",
    description: "Set clear, measurable goals and track progress throughout the month.",
    icon: CheckCircle,
    accent: '#3df5a7',
    facts: [
      "OKRs, SMART goals support",
      "Milestone notifications",
      "Performance analytics"
    ]
  },
  {
    title: "Time Optimization",
    description: "Optimize meeting durations based on needs—longer 1:1s and shorter check-ins.",
    icon: Clock,
    accent: '#b18cfe',
    facts: [
      "Smart duration recommendations",
      "Automated agendas",
      "Meeting effectiveness scoring"
    ]
  },
  {
    title: "Automated Follow-ups",
    description: "Send meeting summaries and action items directly to employees after each session.",
    icon: Mail,
    accent: '#4cd964',
    facts: [
      "AI-generated summaries",
      "Customizable templates",
      "Task tracking"
    ]
  },
  {
    title: "Documentation Trail",
    description: "Maintain comprehensive records for performance reviews and HR documentation.",
    icon: Shield,
    accent: '#282c34',
    facts: [
      "Searchable meeting history",
      "Automated review prep",
      "Compliant record keeping"
    ]
  }
];

export function FeatureCardsWithScrollEffects() {
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featureCardsData.map((feature, index) => (
        <div
          key={index}
          ref={(el) => (cardRefs.current[index] = el)}
        >
          <FeatureCard {...feature} />
        </div>
      ))}
    </div>
  );
}