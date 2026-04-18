"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faDollarSign,
  faHeadset,
  faStar,
  faArrowRight,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

const featuredDestinations = [
  {
    id: 1,
    name: "Lalibela",
    description: "Step into a world of rock-hewn churches, sacred history, and unforgettable mountain views in northern Ethiopia.",
    price: "From $950",
    image: "https://images.unsplash.com/photo-1601633519842-120610f443b7?q=80&w=800&auto=format&fit=crop", // Lalibela vibe
  },
  {
    id: 2,
    name: "Simien Mountains",
    description: "Hike dramatic cliffs, spot gelada baboons, and watch sunrise over Ethiopia's most iconic highland landscape.",
    price: "From $1,100",
    image: "https://images.unsplash.com/photo-1533106418984-83a1c48abd5d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Addis Ababa",
    description: "Discover vibrant markets, modern culture, and rich coffee traditions in Ethiopia's bustling capital city.",
    price: "From $780",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Danakil Depression",
    description: "Explore surreal salt flats, neon mineral pools, and one of the hottest places on Earth for an adventure like no other.",
    price: "From $1,300",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
  },
];

const features = [
  {
    title: "Local Ethiopian Guides",
    description: "Travel with experts who know the culture, food, and hidden gems of every region.",
    icon: faPlane,
    color: "var(--color-eth-green)",
  },
  {
    title: "Flexible Packages",
    description: "Customize your itinerary with comfortable stays, cultural tours, and authentic experiences.",
    icon: faDollarSign,
    color: "var(--color-eth-yellow)",
  },
  {
    title: "24/7 Travel Support",
    description: "Our team is available throughout your journey to make every moment smooth and stress-free.",
    icon: faHeadset,
    color: "var(--color-eth-red)",
  },
  {
    title: "Trusted Experiences",
    description: "Every tour is curated with real traveler reviews and local insight for authentic trips.",
    icon: faStar,
    color: "var(--color-eth-coffee)",
  },
];

const experienceCategories = [
  "Cultural Experiences",
  "City Escapes",
  "Mountain Trekking",
  "Wildlife Adventures",
];

const experienceHighlights = [
  {
    category: "Cultural Experiences",
    title: "Lalibela Church Tour",
    summary: "Explore ancient rock-hewn churches, witness timeless traditions, and discover Ethiopia's spiritual heritage.",
    image: "https://images.unsplash.com/photo-1522322534648-6c85bed45aa4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    category: "City Escapes",
    title: "Addis Ababa City Life",
    summary: "Stroll vibrant markets, sip freshly roasted coffee, and soak in modern culture in the capital.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    category: "Mountain Trekking",
    title: "Simien Mountains Trek",
    summary: "Hike dramatic cliffs, meet endemic wildlife, and see sunrise over breathtaking highland valleys.",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
  },
  {
    category: "Wildlife Adventures",
    title: "Danakil Salt Flat Safari",
    summary: "Experience surreal landscapes, salt caravans, and one of Africa's most unique natural wonders.",
    image: "https://images.unsplash.com/photo-1516815246206-0fae248caffd?q=80&w=1200&auto=format&fit=crop",
  },
];

// Variants for Framer Motion animations
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function LandingPage() {
  const [selectedExperience, setSelectedExperience] = useState(
    experienceCategories[0]
  );

  const activeHighlight = experienceHighlights.find(
    (h) => h.category === selectedExperience
  );

  return (
    <div className="min-h-screen bg-[var(--color-eth-light)] text-slate-900 selection:bg-[var(--color-eth-yellow)] selection:text-slate-900">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <div className="flex items-center gap-3 text-2xl font-bold text-white tracking-tight">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-eth-green)] via-[var(--color-eth-yellow)] to-[var(--color-eth-red)] shadow-lg">
              <span className="text-white text-lg">🌍</span>
            </div>
            TourMe <span className="text-[var(--color-eth-yellow)]">Ethiopia</span>
          </div>
          <nav className="hidden items-center gap-10 md:flex text-sm font-semibold text-white/90">
            <Link href="#destinations" className="hover:text-white transition-colors">
              Destinations
            </Link>
            <Link href="#experiences" className="hover:text-white transition-colors">
              Experiences
            </Link>
            <Link href="#why" className="hover:text-white transition-colors">
              Why TourMe
            </Link>
          </nav>
          <Link
            href="/auth/login?role=user"
            className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-slate-900 transition-all"
          >
            Sign In
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-[95vh] min-h-[700px] overflow-hidden bg-slate-950 flex items-center">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1623038455007-891466ff6016?q=80&w=2000&auto=format&fit=crop"
              alt="Ethiopian landscape"
              fill
              className="object-cover opacity-80"
              priority
            />
            {/* Gradient overlay for readability, fading out near bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/50 to-slate-950/90" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-eth-red)]/20 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-eth-yellow)] ring-1 ring-[var(--color-eth-red)]/50 backdrop-blur-md"
              >
                <FontAwesomeIcon icon={faLocationDot} /> Discover The Land of Origins
              </motion.span>

              <motion.h1
                variants={fadeUp}
                className="mt-8 text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-[5.5rem] leading-[1.1]"
              >
                Experience Ethiopia like a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-eth-green)] via-[var(--color-eth-yellow)] to-[var(--color-eth-red)]">
                  local.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-xl leading-8 text-slate-300 max-w-2xl font-light"
              >
                From ancient rock-hewn churches to dramatic mountain peaks, unlock
                authentic journeys tailored just for you.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
                <Link href="/auth/login?role=user">
                  <Button
                    size="lg"
                    className="h-14 rounded-full bg-[var(--color-eth-green)] px-8 text-lg font-semibold text-white hover:bg-[#007A34] shadow-xl shadow-[var(--color-eth-green)]/30 border-none"
                  >
                    Start Your Journey <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </Button>
                </Link>
                <Link
                  href="#destinations"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-md px-8 text-lg font-semibold text-white hover:bg-white hover:text-slate-900 transition-all"
                >
                  Explore Destinations
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Why TourMe Section */}
        <section id="why" className="py-24 sm:py-32 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-[var(--color-eth-yellow)]/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-[var(--color-eth-green)]/10 blur-3xl" />

          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-eth-red)]">
                Why TourMe Ethiopia
              </h2>
              <p className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Travel made effortless and unforgettable.
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  className="group relative rounded-[2rem] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 transition-all hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2"
                >
                  <div
                    className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg transition-transform group-hover:scale-110"
                    style={{ backgroundColor: feature.color, boxShadow: `0 10px 25px -5px ${feature.color}60` }}
                  >
                    <FontAwesomeIcon icon={feature.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-4 text-slate-600 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Interactive Experiences Section */}
        <section id="experiences" className="bg-slate-950 py-24 sm:py-32 text-white relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-eth-yellow)]">
                  Curated Experiences
                </h2>
                <p className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                  Find your perfect Ethiopian adventure.
                </p>
                <p className="mt-6 text-lg leading-8 text-slate-400 font-light">
                  Whether you're looking for deep cultural immersion, thrilling mountain treks, or city vibes, we have it all.
                </p>

                <div className="mt-10 flex flex-col gap-3">
                  {experienceCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedExperience(category)}
                      className={`text-left px-6 py-5 rounded-2xl transition-all font-semibold text-lg border ${
                        selectedExperience === category
                          ? "bg-white text-slate-900 border-white shadow-xl scale-105"
                          : "bg-transparent text-slate-400 border-slate-800 hover:border-slate-600 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Preview Area */}
              <div className="relative h-[600px] w-full rounded-[2.5rem] overflow-hidden ring-1 ring-white/10 shadow-2xl">
                <AnimatePresence mode="wait">
                  {activeHighlight && (
                    <motion.div
                      key={activeHighlight.title}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activeHighlight.image}
                        alt={activeHighlight.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 p-10">
                        <motion.span 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="inline-block px-3 py-1 bg-[var(--color-eth-green)] text-white text-sm font-bold rounded-full mb-4"
                        >
                          {activeHighlight.category}
                        </motion.span>
                        <motion.h3 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-3xl font-bold text-white"
                        >
                          {activeHighlight.title}
                        </motion.h3>
                        <motion.p 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="mt-3 text-slate-300 text-lg leading-relaxed max-w-md"
                        >
                          {activeHighlight.summary}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Destinations */}
        <section id="destinations" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-eth-green)]">
                  Top Destinations
                </h2>
                <p className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                  Places you can't miss.
                </p>
              </div>
              <Link href="/destinations" className="text-[var(--color-eth-green)] font-semibold hover:text-[#007A34] flex items-center gap-2">
                View all destinations <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {featuredDestinations.map((destination) => (
                <motion.div
                  key={destination.id}
                  whileHover={{ y: -10 }}
                  className="group flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-slate-100"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {destination.name}
                      </h3>
                      <p className="text-[var(--color-eth-yellow)] font-semibold">
                        {destination.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <p className="text-slate-600 font-medium leading-relaxed line-clamp-3">
                      {destination.description}
                    </p>
                    <Link href="/auth/login?role=user" className="mt-6">
                      <Button className="w-full rounded-xl bg-slate-900 text-white hover:bg-[var(--color-eth-red)] transition-colors py-6 text-md font-semibold">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 py-16 text-slate-300 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 text-xl font-bold text-white">
            <span className="text-2xl">🌍</span> TourMe
          </div>
          <p className="text-sm text-slate-500 font-medium">
            © {new Date().getFullYear()} TourMe Ethiopia. Travel responsibly.
          </p>
          <div className="flex gap-6 text-sm font-semibold">
            <Link href="/auth/login?role=admin" className="hover:text-white transition-colors">
              Admin Access
            </Link>
            <Link href="/auth/login?role=user" className="hover:text-white transition-colors">
              User Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
