"use client"

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner"; // Assuming you use sonner for toasts
import { useState } from "react";

export default function TourCard({ tour, isInitiallyFavorite = false }) {
  const [isFavorite, setIsFavorite] = useState(isInitiallyFavorite);

  // 1. ADD THE TOGGLE LOGIC HERE
  const handleToggleFavorite = async (e) => {
    e.preventDefault(); // Stops the <Link> from navigating
    e.stopPropagation(); // Stops the click from bubbling up

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to save favorites");
      return;
    }

    try {
      const res = await fetch("/api/favorites/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ tourId: tour.id }),
      });

      const data = await res.json();
      if (data.success) {
        setIsFavorite(data.isFavorite);
        toast.success(data.message);
      }
    } catch (err) {
      toast.error("Failed to update favorites");
    }
  };

  return (
    <Link href={`/destinations/${tour.id}`} className="block">
      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 h-full cursor-pointer">
        <div className="relative h-52 w-full">
          <Image
            src={tour.imageUrl || tour.image || "/placeholder-tour.jpg"}
            alt={tour.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
          
          {/* 2. ADD THE ACTUAL BUTTON COMPONENT HERE */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-colors ${
              isFavorite 
                ? "bg-red-500 text-white" 
                : "bg-white/80 text-slate-400 hover:text-red-500"
            }`}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-lg line-clamp-1">{tour.title}</h3>
            <div className="flex items-center text-yellow-500 text-sm">
              <FontAwesomeIcon icon={faStar} className="mr-1" />
              <span>4.8</span>
            </div>
          </div>
          <p className="text-slate-600 text-sm line-clamp-2 mb-4">
            {tour.description}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">${tour.price}</span>
          <Button size="sm">View Details</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}