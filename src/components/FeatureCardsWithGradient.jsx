import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, Calendar, Users, Clock, Mail, Shield } from 'lucide-react';

// Feature cards data
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

// Feature Card Component with 3D tilt effect
function FeatureCard({ title, description, Icon, accent, facts }) {
  const [hovered, setHovered] = useState(false);
  const [tiltValues, setTiltValues] = useState({ tiltX: 0, tiltY: 0, bgPosX: 50, bgPosY: 50 });
  const cardRef = useRef(null);
  
  // Helper function to create lighter version of the accent color
  const getLighterColor = (hex, percent) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    
    r = Math.floor(r + (255 - r) * percent);
    g = Math.floor(g + (255 - g) * percent);
    b = Math.floor(b + (255 - b) * percent);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };
  
  // Handle mouse move to create tilt effect
  const handleMouseMove = (e) => {
    if (!cardRef.current || !hovered) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position within the card (0 to 1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Calculate tilt based on mouse position
    // We'll tilt more when mouse is at edges, less in the center
    const tiltX = -20 * (y - 0.5); // Tilt up when mouse is at bottom
    const tiltY = 20 * (x - 0.5);  // Tilt right when mouse is at right
    
    // Calculate gradient position for highlight effect
    const bgPosX = x * 100;
    const bgPosY = y * 100;
    
    setTiltValues({ tiltX, tiltY, bgPosX, bgPosY });
  };
  
  // Reset tilt when mouse leaves
  const handleMouseLeave = () => {
    setHovered(false);
    setTiltValues({ tiltX: 0, tiltY: 0, bgPosX: 50, bgPosY: 50 });
  };
  
  // Create gradient colors
  const colorLight = getLighterColor(accent, 0.8);
  
  // Apply 3D transformation
  const cardStyle = {
    transform: hovered 
      ? `perspective(1000px) rotateX(${tiltValues.tiltX}deg) rotateY(${tiltValues.tiltY}deg) translateY(-5px) scale(1.02)` 
      : 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)',
    boxShadow: hovered
      ? `
        0 ${15 - tiltValues.tiltX/2}px ${25 + Math.abs(tiltValues.tiltX)}px -15px rgba(0, 0, 0, 0.2),
        ${-tiltValues.tiltY/2}px ${-tiltValues.tiltX/2}px 15px -10px ${accent}40
      `
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: `2px solid ${hovered ? accent : '#e5e7eb'}`,
    background: hovered
      ? `linear-gradient(135deg, 
          ${getLighterColor(accent, 0.85)} 0%, 
          white 50%, 
          ${getLighterColor(accent, 0.9)} 100%)`
      : 'white',
    backgroundSize: '200% 200%',
    backgroundPosition: hovered ? `${tiltValues.bgPosX}% ${tiltValues.bgPosY}%` : '50% 50%',
    transition: 'transform 0.1s ease-out, box-shadow 0.3s ease-out, border 0.3s ease, background-position 0.3s ease'
  };

  // Shine overlay style
  const shineStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '0.75rem',
    pointerEvents: 'none',
    background: `radial-gradient(circle at ${tiltValues.bgPosX}% ${tiltValues.bgPosY}%, 
                   ${accent}15 0%, 
                   transparent 50%)`,
    opacity: hovered ? 1 : 0,
    transition: 'opacity 0.2s ease'
  };

  return (
    <div 
      ref={cardRef}
      className="feature-card h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        zIndex: hovered ? 10 : 1,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
      }}
    >
      <div
        style={{
          ...cardStyle,
          borderRadius: '0.75rem',
          height: '100%',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Shine overlay */}
        <div style={shineStyle}></div>
        
        {/* Card Content */}
        <div className="flex items-center mb-4" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            background: accent,
            borderRadius: '50%',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 14,
            boxShadow: hovered ? `0 0 15px ${accent}80` : undefined,
            transform: hovered ? `translateZ(20px)` : 'none',
            transition: 'all 0.3s ease-in-out'
          }}>
            <Icon color="white" size={26} />
          </div>
          <h3 style={{
            fontSize: '1.15rem',
            fontWeight: 700,
            color: accent,
            transform: hovered ? `translateZ(15px)` : 'none',
            transition: 'transform 0.3s ease-out'
          }}>{title}</h3>
        </div>
        
        <p style={{
          color: '#5a6072',
          fontSize: '1rem',
          marginBottom: hovered ? '1rem' : '0',
          transform: hovered ? `translateZ(10px)` : 'none',
          transition: 'all 0.3s ease-in-out',
          flexGrow: 1,
          position: 'relative',
          zIndex: 2
        }}>
          {description}
        </p>
        
        {/* Facts list with opacity transition and 3D effect */}
        <div 
          style={{
            maxHeight: hovered ? '300px' : '0',
            opacity: hovered ? 1 : 0,
            overflow: 'hidden',
            transition: 'all 0.3s ease-in-out',
            marginTop: hovered ? '0.5rem' : '0',
            transform: hovered ? `translateZ(5px)` : 'none',
            position: 'relative',
            zIndex: 2
          }}
        >
          <ul className="p-0 m-0 list-none text-gray-700 text-sm space-y-2">
            {facts.map((fact, i) => (
              <li key={i} className="flex items-center">
                <CheckCircle size={17} color={accent} className="mr-2 flex-shrink-0" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Main component
export function FeatureCardsWithGradient() {
  return (
    <div className="pt-10 pb-4 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Everything You Need For Effective Team Management</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Our platform provides all the tools you need to keep your team aligned, engaged, and productive.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featureCardsData.map((card, i) => (
            <div key={card.title}>
              <FeatureCard
                title={card.title}
                description={card.description}
                Icon={card.icon}
                accent={card.accent}
                facts={card.facts}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}