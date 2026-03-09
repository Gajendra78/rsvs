'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, CheckCircle, BookOpen, Video, Users, Award, Menu, X, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Star } from 'lucide-react';
import { motion } from 'motion/react';
import DemoVideo from '@/components/DemoVideo';
import Testimonials from '@/components/Testimonials';

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-white font-bold text-xl shadow-sm">
              R
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">RSVS</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/courses" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Courses</Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">About</Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Pricing</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 shadow-lg">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-base font-medium text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/courses" className="text-base font-medium text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Courses</Link>
              <Link href="/about" className="text-base font-medium text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link href="/pricing" className="text-base font-medium text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
              <Link href="/login" className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-3 text-center text-base font-bold text-white" onClick={() => setIsMobileMenuOpen(false)}>
                Login
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-50 pt-16 pb-24 lg:pt-32">
          {/* Animated Background */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
              className="absolute -top-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-blue-100/50 blur-3xl" 
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
              className="absolute top-[40%] -left-[10%] h-[500px] w-[500px] rounded-full bg-amber-100/50 blur-3xl" 
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-6"
              >
                <div className="inline-flex w-fit items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                  <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                  New Batches Starting Soon
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl leading-tight">
                  Crack Your Exam, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">From Anywhere</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                  India&apos;s most trusted learning platform for UKSSSC, UKPSC, SSC, and JE exams. 
                  Join live classes, access premium notes, and test your skills.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <Link href="/courses" className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200">
                    <Play className="mr-2 h-5 w-5 fill-current" /> Watch Free Demo
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="relative h-10 w-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                        <Image 
                          src={`https://picsum.photos/seed/${i}/100/100`} 
                          alt="Student" 
                          fill
                          className="object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                    </div>
                    <span className="font-medium text-gray-700">5,000+ Trusted Students</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative mx-auto w-full max-w-lg lg:max-w-none"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gray-900 shadow-2xl border-4 border-white">
                  <Image 
                    src="https://picsum.photos/seed/study/800/600" 
                    alt="Student Learning" 
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <div className="text-white">
                      <p className="font-bold text-lg">Live Doubt Clearing</p>
                      <p className="text-sm text-gray-200">Interact with top faculty in real-time</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating Cards */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3"
                >
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Selection Rate</p>
                    <p className="text-lg font-bold text-gray-900">92%</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Demo Video Section */}
        <DemoVideo />

        {/* Featured Exams Carousel */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Target Your Exam</h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Choose from our wide range of structured courses designed by experts to help you succeed.</p>
            </div>
            
            {/* Carousel Container */}
            <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              {[
                { title: 'UKSSSC', color: 'bg-blue-50 text-blue-600', desc: 'Group C, VDO, VPDO' },
                { title: 'UKPSC', color: 'bg-emerald-50 text-emerald-600', desc: 'Upper/Lower PCS, RO/ARO' },
                { title: 'SSC CGL', color: 'bg-purple-50 text-purple-600', desc: 'Inspector, Assistant, Auditor' },
                { title: 'JE Civil', color: 'bg-orange-50 text-orange-600', desc: 'State & Central JE Exams' },
                { title: 'MAINS', color: 'bg-rose-50 text-rose-600', desc: 'Answer Writing & Strategy' },
              ].map((exam, idx) => (
                <div key={idx} className="snap-center shrink-0 w-[85vw] sm:w-[350px] group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className={`mb-6 h-14 w-14 rounded-xl ${exam.color} flex items-center justify-center`}>
                    <BookOpen className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{exam.title}</h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {exam.desc}. Complete syllabus coverage with live classes.
                  </p>
                  <Link href="/courses" className="mt-8 inline-flex items-center text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
                    View Course <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Why Choose RSVS Academy?</h2>
              <p className="mt-4 text-gray-600">We provide the best ecosystem for your preparation</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Users, title: 'Expert Faculty', desc: 'Learn from the best minds in the industry with years of experience.' },
                { icon: Video, title: 'Live Classes', desc: 'Interactive daily live sessions with real-time doubt clearing.' },
                { icon: CheckCircle, title: 'Mock Tests', desc: 'Practice with exam-level questions and detailed performance analysis.' },
                { icon: Award, title: 'Doubt Support', desc: 'Dedicated doubt solving sessions to ensure conceptual clarity.' },
              ].map((feature, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* Pricing Preview */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
              <p className="mt-4 text-gray-600">Invest in your future with our affordable plans</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              {[
                { name: 'Basic', price: '₹2,999', features: ['Recorded Videos', 'Basic Mock Tests', 'PDF Notes', 'Email Support'] },
                { name: 'Standard', price: '₹5,999', features: ['Live + Recorded Classes', 'Full Test Series', '24/7 Doubt Support', 'Mentorship Sessions'], highlight: true },
                { name: 'Premium', price: '₹9,999', features: ['All Access Pass', 'Priority Support', 'Offline Downloads', 'Personal Mentor', 'Hardcopy Notes'] },
              ].map((plan) => (
                <div key={plan.name} className={`relative flex flex-col rounded-3xl border ${plan.highlight ? 'border-blue-600 shadow-2xl scale-105 z-10' : 'border-gray-200 shadow-sm'} p-8 bg-white`}>
                  {plan.highlight && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-sm font-bold text-white uppercase tracking-wide shadow-lg">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="mt-6 flex items-baseline">
                    <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                    <span className="ml-2 text-gray-500 font-medium">/year</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Billed annually</p>
                  
                  <ul className="mt-8 space-y-4 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start text-sm text-gray-700">
                        <CheckCircle className="mr-3 h-5 w-5 text-green-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/login" className={`mt-8 block w-full rounded-xl px-4 py-4 text-center text-sm font-bold transition-all ${plan.highlight ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-200' : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200'}`}>
                    Choose {plan.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 pt-16 pb-8 text-gray-400">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <div>
              <div className="flex items-center gap-2 text-white mb-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-xl">R</div>
                <span className="text-2xl font-bold">RSVS</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Empowering students to achieve their government job dreams through accessible, high-quality education and mentorship.
              </p>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
                <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
                <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/courses" className="hover:text-white transition-colors">All Courses</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Student Login</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Exams</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/courses" className="hover:text-white transition-colors">UKSSSC VDO/VPDO</Link></li>
                <li><Link href="/courses" className="hover:text-white transition-colors">UKPSC RO/ARO</Link></li>
                <li><Link href="/courses" className="hover:text-white transition-colors">SSC CGL & CHSL</Link></li>
                <li><Link href="/courses" className="hover:text-white transition-colors">Junior Engineer (Civil)</Link></li>
                <li><Link href="/courses" className="hover:text-white transition-colors">Banking Exams</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Support</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                  <span>help@rsvsacademy.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-500 shrink-0" />
                  <span>2nd Floor, Karanpur, Dehradun,<br />Uttarakhand - 248001</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <p>© 2026 RSVS Coaching Platform. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white">Privacy Policy</Link>
              <Link href="#" className="hover:text-white">Terms of Service</Link>
              <Link href="#" className="hover:text-white">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
