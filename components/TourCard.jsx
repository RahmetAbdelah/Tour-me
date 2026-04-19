"use client"
import Link from "next/link";
import Image from "next/image";
import { MapPin, Heart } from "lucide-react";

export default function TourCard({ tour }) {
  return (
    <Link href={`/destinations/${tour.id}`} className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all block">
      <div className="h-56 overflow-hidden relative bg-gray-100">
        <Image
          src={tour.imageUrl || "https://images.unsplash.com/photo-1543888512-32b57563870e?w=500"}
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />
        <div 
          className="absolute top-4 right-4 bg-white/80 p-1.5 rounded-full cursor-pointer hover:bg-orange-500 hover:text-white transition z-10"
          onClick={(e) => {
            e.preventDefault(); // Prevent navigating to destination
            // Add favorite logic here if needed
          }}
        >
          <Heart size={16} />
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-bold text-gray-900 text-[16px] truncate pr-2">{tour.title}</h3>
          <span className="text-orange-500 font-bold text-[14px] whitespace-nowrap">${tour.price}</span>
        </div>
        <div className="flex items-center text-gray-400 text-[12px] font-medium mb-5">
          <MapPin size={12} className="mr-1 flex-shrink-0" /> 
          <span className="truncate">{tour.location || 'Ethiopia'}</span>
        </div>
        <div className="w-full border border-gray-900 text-gray-900 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white py-2.5 rounded font-bold text-[11px] transition-all tracking-wider uppercase text-center">
          Explore Now
        </div>
      </div>
    </Link>
  );
}