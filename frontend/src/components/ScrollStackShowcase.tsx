import React from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import './ScrollStack.css';
import {
  Stethoscope,
  ClipboardList,
  Users,
  Shield,
  Clock,
  Award,
  Heart,
  FileText,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

interface HealthTip {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: {
    label: string;
    value: string;
    accentClass: string;
  }[];
  badge?: {
    text: string;
    variant: 'featured' | 'new';
  };
}

const ScrollStackShowcase: React.FC = () => {
  const healthTips: HealthTip[] = [
    {
      icon: <Stethoscope size={32} />,
      title: 'Comprehensive Digital Consultations',
      description: 'Connect with qualified healthcare professionals through secure video consultations. Access expert medical advice from the comfort of your home with Kermedix\'s verified doctor network.',
      details: [
        { label: 'Response Time', value: '< 30 mins', accentClass: 'accent1' },
        { label: 'Availability', value: '24/7', accentClass: 'accent1' }
      ],
      badge: { text: 'FEATURED', variant: 'featured' }
    },
    {
      icon: <FileText size={32} />,
      title: 'Digital Health Records Management',
      description: 'Securely store and manage all your medical documents, lab reports, and health records in one place. Easy access for you and your healthcare providers anytime, anywhere.',
      details: [
        { label: 'Storage', value: 'Unlimited', accentClass: 'accent2' },
        { label: 'Access', value: 'Instant', accentClass: 'accent2' }
      ],
      badge: { text: 'ESSENTIAL', variant: 'featured' }
    },
    {
      icon: <AlertCircle size={32} />,
      title: 'Smart Health Alerts & Reminders',
      description: 'Receive timely notifications for medication schedules, appointment reminders, and health check-ups. Stay on top of your health with intelligent alerts tailored to your medical needs.',
      details: [
        { label: 'Customizable', value: 'Yes', accentClass: 'accent3' },
        { label: 'Real-time', value: 'Push Alerts', accentClass: 'accent3' }
      ]
    },
    {
      icon: <ClipboardList size={32} />,
      title: 'Prescription & Lab Management',
      description: 'Track prescriptions, view lab reports, and order medicines directly through Kermedix. Get home delivery of medicines with pharmacy partner integration and automatic refill options.',
      details: [
        { label: 'Lab Partners', value: '50+', accentClass: 'accent1' },
        { label: 'Home Delivery', value: 'Same Day', accentClass: 'accent1' }
      ],
      badge: { text: 'NEW', variant: 'new' }
    },
    {
      icon: <Heart size={32} />,
      title: 'Wellness & Prevention Programs',
      description: 'Participate in customized wellness programs including fitness tracking, nutrition guidance, and preventive health screenings. Monitor your health metrics and achieve your wellness goals.',
      details: [
        { label: 'Programs', value: '15+', accentClass: 'accent2' },
        { label: 'Tracking', value: 'Real-time Data', accentClass: 'accent2' }
      ]
    },
    {
      icon: <Shield size={32} />,
      title: 'Data Security & HIPAA Compliance',
      description: 'Your health data is protected with enterprise-grade encryption and HIPAA compliance. Kermedix ensures complete privacy and security of all your medical information.',
      details: [
        { label: 'Encryption', value: 'End-to-End', accentClass: 'accent3' },
        { label: 'Compliance', value: 'HIPAA Safe', accentClass: 'accent3' }
      ]
    }
  ];

  return (
    <section style={{ width: '100%', position: 'relative' }}>
      <ScrollStack
        itemDistance={120}
        itemScale={0.04}
        itemStackDistance={25}
        stackPosition="25%"
        scaleEndPosition="12%"
        baseScale={0.8}
        rotationAmount={0}
        blurAmount={0.5}
        useWindowScroll={true}
        className="scroll-stack-container"
      >
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '2rem' }}>
          <h1
            style={{
              fontSize: '3rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1rem',
              letterSpacing: '-1px'
            }}
          >
            Kermedix Healthcare Platform
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: '#4a5568',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.8'
            }}
          >
            Comprehensive digital healthcare solutions bringing quality medical services to your fingertips. Experience seamless, secure, and accessible healthcare with Kermedix.
          </p>
        </div>

        {/* Cards */}
        {healthTips.map((tip, index) => (
          <ScrollStackItem key={index}>
            <div className="scroll-stack-card-header">
              <div className={`scroll-stack-card-icon ${['health', 'feature', 'service'][index % 3]}`} style={{ fontSize: '2.5rem' }}>
                {tip.icon}
              </div>
              <div className="scroll-stack-card-content">
                <h2 className="scroll-stack-card-title">{tip.title}</h2>
                <p className="scroll-stack-card-description">{tip.description}</p>
              </div>
            </div>

            <div className="scroll-stack-card-details">
              {tip.details.map((detail, detailIndex) => (
                <div key={detailIndex} className={`scroll-stack-card-detail ${detail.accentClass}`}>
                  <div className="scroll-stack-card-detail-label">{detail.label}</div>
                  <div className="scroll-stack-card-detail-value">{detail.value}</div>
                </div>
              ))}
            </div>

            {tip.badge && (
              <span className={`scroll-stack-card-badge ${tip.badge.variant}`}>
                {tip.badge.text}
              </span>
            )}
          </ScrollStackItem>
        ))}

        {/* Footer Section */}
        
      </ScrollStack>
    </section>
  );
};

export default ScrollStackShowcase;
