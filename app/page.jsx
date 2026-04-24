"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Calendar, CheckCircle2, 
  ArrowRight, Play, Quote, Users, Map, 
  Award, Globe, Menu, Heart, Star, ChevronLeft, ChevronRight, X 
} from 'lucide-react';

export default function EthiopiaTravelFinal() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlayingAbout, setIsPlayingAbout] = useState(false);
  const [showAboutVideo, setShowAboutVideo] = useState(false);
  
  // 1. STATE FOR ROTATING TEXT
  const [textIndex, setTextIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const phrases = ["Next Adventure", "Cultural Journey", "Historic Discovery", "Safari Experience"];

  
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out
      
      setTimeout(() => {
        setTextIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setFade(true); // Start fade in
      }, 500); // Wait for fade out animation to finish

    }, 1500); // Change text every 3.5 seconds

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };



  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased overflow-x-hidden">
      
      {/* 1. NAVIGATION BAR */}
      <nav className="fixed top-0 w-full z-[100] bg-white border-b border-gray-100 h-16 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-1 cursor-pointer"
          >
            <span className="text-orange-500 underline decoration-2 underline-offset-4">Tour me </span>.
          </div>
          
          <div className="hidden lg:flex items-center gap-8 font-medium text-[13px] uppercase tracking-wider text-gray-600">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-orange-500">Home</button>
            <button onClick={() => scrollToSection('destinations')} className="hover:text-orange-500 transition">Destinations</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-orange-500 transition">About</button>
            <button onClick={() => scrollToSection('reviews')} className="hover:text-orange-500 transition">Reviews</button>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md transition-all font-bold text-[12px] uppercase tracking-wide">
              Book Now
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-gray-900">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-4 lg:hidden shadow-xl">
            <button onClick={() => scrollToSection('destinations')} className="text-left font-bold uppercase text-[12px]">Destinations</button>
            <button onClick={() => scrollToSection('about')} className="text-left font-bold uppercase text-[12px]">About</button>
            <button onClick={() => scrollToSection('reviews')} className="text-left font-bold uppercase text-[12px]">Reviews</button>
          </div>
        )}
      </nav>

     
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/1xuzWBxlwCk?autoplay=1&mute=1&controls=0&loop=1&playlist=1xuzWBxlwCk&showinfo=0&rel=0&disablekb=1"
          className="absolute inset-0 w-full h-full object-cover scale-[1.5] md:scale-[1.25] z-0 pointer-events-none"
          allow="autoplay; encrypted-media"
          frameBorder="0"
        />
        

        <div className="absolute inset-0 bg-black/20 z-10" />

        <div className="relative z-20 text-center px-4 max-w-4xl">
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-8 tracking-tight leading-tight text-white drop-shadow-lg">
            Ready For Your <br />
           <span className={`inline-block transition-all duration-500 transform ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} text-orange-500`}>
              {phrases[textIndex]}
            </span>
          </h2>
          
         <Link href="app/auth/login" className="inline-block">
  <button className="relative group overflow-hidden bg-orange-500 hover:bg-orange-600 text-white px-7 py-2.5 rounded-full text-[11px] font-bold transition-all shadow-xl hover:scale-105 uppercase tracking-widest border border-orange-400/30">
    {/* The Shining Streak */}
    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
    
    <span className="relative z-10">Get Started</span>
  </button>
</Link>
        </div>
      </section>

      {/* 3. CATEGORY ICONS */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center gap-6 overflow-x-auto no-scrollbar">
          {[
            { name: "Hiking", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=100&h=100&fit=crop" },
            { name: "Religion", img: "https://images.unsplash.com/photo-1597807132214-cd7d59a77714?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXRoaW9waWFuJTIwc2l0ZXN8ZW58MHx8MHx8fDA%3D" },
            { name: "Wildlife", img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=100&h=100&fit=crop" },
            { name: "Culture", img: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=100&h=100&fit=crop" },
            { name: "History", img: "https://media.istockphoto.com/id/697529054/photo/the-church-of-saint-george-in-lalibela.webp?a=1&b=1&s=612x612&w=0&k=20&c=dBg19KDZyM0fpSri4GHZt7EQfOajmOlX1xkptf5eRZQ=" },
            { name: "Nature", img: "https://images.unsplash.com/photo-1764145162259-04eaf2b3d86a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZXRoaW9waWFuJTIwY3VsdHVyZXxlbnwwfHwwfHx8MA%3D%3D" }
          ].map((cat, i) => (
            <div key={i} className="flex-shrink-0 text-center group cursor-pointer">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-2 p-1 border border-transparent group-hover:border-orange-500 transition-all shadow-sm">
                <img src={cat.img} className="w-full h-full object-cover rounded-full" alt="" />
              </div>
              <p className="font-semibold text-[12px] text-gray-600 group-hover:text-orange-500">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

     <section id="about" className="max-w-7xl mx-auto px-6 py-10 scroll-mt-20">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
    
    {/* Left Content Side */}
    <div className="p-10 lg:p-16 flex flex-col justify-center">
      <span className="text-orange-500 font-bold uppercase tracking-widest text-[10px] mb-3">About Tourme</span>
      <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight uppercase">Explore with our expert guides</h2>
      <p className="text-gray-500 mb-8 leading-relaxed text-[14px]">
        We provide authentic Ethiopian experiences. From the mountains of Simien to the Danakil Depression, we guide you safely.
      </p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="flex items-center gap-2 text-[13px] font-semibold">
          <CheckCircle2 className="text-orange-500" size={16} />
          <span>Expert Guides</span>
        </div>
        <div className="flex items-center gap-2 text-[13px] font-semibold">
          <CheckCircle2 className="text-orange-500" size={16} />
          <span>Luxury Tours</span>
        </div>
      </div>
      <button className="bg-orange-500 text-white px-6 py-2.5 rounded text-[11px] font-bold w-fit uppercase tracking-wider">
        Learn More
      </button>
    </div>

    {/* Right Video Side */}
    <div className="relative h-72 lg:h-auto min-h-[350px] bg-black">
      {!isPlayingAbout ? (
        // SHOW THIS BEFORE CLICKING PLAY
        <div className="relative w-full h-full group">
          <img 
            src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80" 
            className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-80" 
            alt="About Video Thumbnail" 
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <button 
              onClick={() => setIsPlayingAbout(true)}
              className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 hover:bg-orange-500 transition-all group/btn"
            >
              <Play className="text-orange-500 group-hover/btn:text-white fill-current ml-1" size={24} />
            </button>
          </div>
        </div>
      ) : (
       
        <div className="w-full h-full">
          <iframe
            src="https://www.youtube.com/shorts/MLllLKSUMQY?feature=share"
            title="Ethiopia Travel Video"
            className="w-full h-full absolute inset-0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
          {/* Optional: Close Button to stop video */}
          <button 
            onClick={() => setIsPlayingAbout(false)}
            className="absolute top-4 right-4 z-30 bg-black/50 text-white p-1 rounded-full hover:bg-orange-500 transition"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>

  </div>
</section>

      {/* 5. DESTINATION GRID - ID: destinations */}
      <section id="destinations" className="max-w-[1600px] mx-auto px-4 md:px-12 py-16 scroll-mt-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-orange-500 font-bold uppercase tracking-widest text-[10px]">Top Picks</span>
            <h2 className="text-2xl font-bold mt-1 text-gray-900 uppercase">Select Destination</h2>
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-gray-200 rounded hover:bg-orange-500 hover:text-white transition"><ChevronLeft size={16} /></button>
            <button className="p-2 border border-gray-200 rounded hover:bg-orange-500 hover:text-white transition"><ChevronRight size={16} /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Rock-Hewn Churches", loc: "Lalibela", price: "$450", img: "https://media.istockphoto.com/id/2228817333/photo/ethiopian-nun-reading-holy-book-in-a-rock-hewn-church-in-lalibela.webp?a=1&b=1&s=612x612&w=0&k=20&c=jQV27gbwBXLpAyl0W2M7csLric7_Q6cSBCMLVZoYSdA=" },
            { name: "Simien Mountains", loc: "Gondar", price: "$320", img: "https://media.istockphoto.com/id/1466420560/photo/view-of-the-blue-nile-falls-the-waterfall-of-the-blue-nile-river-is-situated-about-30.webp?a=1&b=1&s=612x612&w=0&k=20&c=kPoREEURgUPAbvI3CMXIt41bESk0jO4eeIud5TrNcdc=" },
            { name: "Blue Nile Falls", loc: "Bahir Dar", price: "$180", img: "https://media.istockphoto.com/id/689359604/photo/simien-national-park.webp?a=1&b=1&s=612x612&w=0&k=20&c=GzJC4SoTmdVcyaB5rbMxlpcnYrRD8K75-3WcsVQMxWo=" },
            { name: "Fasil Ghebbi", loc: "Gondar", price: "$250", img: "https://media.istockphoto.com/id/1316729047/photo/ethiopian-architecture-in-gondar.webp?a=1&b=1&s=612x612&w=0&k=20&c=V6v3Q5X5X5X5X5X5X5X5X5X5X5X5X5X5X5X5X5X5=" },
            { name: "Erta Ale Volcano", loc: "Afar", price: "$600", img: "https://media.istockphoto.com/id/697529054/photo/the-church-of-saint-george-in-lalibela.webp?a=1&b=1&s=612x612&w=0&k=20&c=dBg19KDZyM0fpSri4GHZt7EQfOajmOlX1xkptf5eRZQ=" },
            { name: "Omo Valley", loc: "Jinka", price: "$550", img: "https://images.unsplash.com/photo-1764145162259-04eaf2b3d86a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZXRoaW9waWFuJTIwY3VsdHVyZXxlbnwwfHwwfHx8MA%3D%3D" }
          ].map((dest, i) => (
            <div key={i} className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="h-56 overflow-hidden relative">
                <img src={dest.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="" />
                <div className="absolute top-4 right-4 bg-white/80 p-1.5 rounded-full cursor-pointer hover:bg-orange-500 hover:text-white transition">
                  <Heart size={16} />
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-gray-900 text-[16px]">{dest.name}</h3>
                  <span className="text-orange-500 font-bold text-[14px]">{dest.price}</span>
                </div>
                <div className="flex items-center text-gray-400 text-[12px] font-medium mb-5">
                  <MapPin size={12} className="mr-1" /> {dest.loc}
                </div>
                <button className="w-full border border-gray-900 text-gray-900 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white py-2.5 rounded font-bold text-[11px] transition-all tracking-wider uppercase">
                  Explore Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. STATS BAR */}
      <section className="bg-gray-50 py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "HAPPY CLIENTS", value: "12K+" },
            { label: "DESTINATIONS", value: "350+" },
            { label: "TOUR GUIDES", value: "80+" },
            { label: "AWARDS WON", value: "25+" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-[10px] font-bold text-orange-500 tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIALS - ID: reviews */}
      <section id="reviews" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-orange-500 font-bold uppercase text-[10px] tracking-widest">Reviews</span>
          <h2 className="text-2xl font-bold mt-1 mb-12 uppercase">What They Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-left">
                <Quote className="text-orange-100 mb-4" size={30} />
                <p className="text-gray-500 text-[13px] italic mb-6 leading-relaxed">
                  &aposThe spiritual energy of Ethiopia was captured perfectly by the guides. Flawless planning.&apos
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full" />
                  <div>
                    <h4 className="font-bold text-[13px]">Abel Tadesse</h4>
                    <p className="text-[11px] text-gray-400">Traveler</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-gray-950 text-gray-400 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="text-white font-bold text-2xl mb-6">Tourme  <span className="text-orange-500">.</span></h3>
              <p className="text-[13px] leading-relaxed mb-6">Leading Ethiopias boutique travel experiences with 15 years of expertise.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-[11px] uppercase tracking-widest">Links</h4>
              <ul className="space-y-3 text-[12px] font-medium">
                <li className="hover:text-orange-500 cursor-pointer transition">About Us</li>
                <li className="hover:text-orange-500 cursor-pointer transition">Destinations</li>
                <li className="hover:text-orange-500 cursor-pointer transition">Guides</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-[11px] uppercase tracking-widest">Support</h4>
              <ul className="space-y-3 text-[12px] font-medium">
                <li className="hover:text-orange-500 cursor-pointer transition">Help Center</li>
                <li className="hover:text-orange-500 cursor-pointer transition">Privacy</li>
                <li className="hover:text-orange-500 cursor-pointer transition">Terms</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-[11px] uppercase tracking-widest">Newsletter</h4>
              <div className="flex border-b border-gray-800 pb-2">
                <input type="email" placeholder="Email" className="bg-transparent text-[12px] outline-none w-full" />
                <button className="text-orange-500"><ArrowRight size={16} /></button>
              </div>
            </div>
          </div>
          <div className="text-center text-[10px] font-medium tracking-[0.2em] pt-8 border-t border-gray-900 opacity-50 uppercase">
            © 2026 Tourme TRAVEL AGENCY.
          </div>
        </div>
      </footer>
    </div>
  );
}