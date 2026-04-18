"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCalendarAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";

export default function DestinationDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Booking form state
  const [travelDate, setTravelDate] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`/api/admin/tours?id=${id}`);
        const data = await res.json();
        if (data.success && data.tour) {
          setTour(data.tour);
        } else {
          toast.error("Tour not found");
        }
      } catch (err) {
        toast.error("Failed to load tour");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTour();
  }, [id]);

  const handleBookNow = async () => {
    if (!travelDate) {
      toast.error("Please select a travel date");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to book");
      router.push("/auth/login");
      return;
    }

    setBookingLoading(true);

    try {
      const res = await fetch("/api/bookings/create", {   // ← Make sure this matches your route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          tourId: id,
          travelDate,
          guests: Number(guests),
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Booking created successfully! 🎉");
        // Optional: redirect to bookings page
        // router.push("/dashboard?section=bookings");
      } else {
        toast.error(data.error || "Failed to create booking");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading tour details...</div>;
  if (!tour) return <div className="text-center py-20 text-red-500">Tour not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-8 text-slate-600 hover:text-black"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Explore
      </button>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative h-[520px] rounded-3xl overflow-hidden shadow-xl">
          <Image
            src={tour.imageUrl || "/placeholder-tour.jpg"}
            alt={tour.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Details + Booking Form */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{tour.title}</h1>
            <p className="text-slate-600 text-lg">{tour.location}</p>
          </div>

          <div className="text-4xl font-bold text-blue-600">
            ${tour.price} <span className="text-lg font-normal text-slate-500">per person</span>
          </div>

          <p className="text-slate-600 leading-relaxed">{tour.description}</p>

          {/* Booking Form */}
          <div className="bg-white p-6 rounded-2xl border">
            <h3 className="font-semibold text-xl mb-5">Book This Tour</h3>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Travel Date</label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Number of Guests</label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(Math.max(1, e.target.value))}
                    min="1"
                    className="w-24 p-3 border rounded-lg text-center"
                  />
                  <span className="text-slate-500">guests</span>
                </div>
              </div>

              <Button 
                onClick={handleBookNow} 
                disabled={bookingLoading}
                size="lg" 
                className="w-full py-7 text-lg"
              >
                {bookingLoading ? "Processing Booking..." : `Confirm Booking - $${(tour.price * guests).toFixed(2)}`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}