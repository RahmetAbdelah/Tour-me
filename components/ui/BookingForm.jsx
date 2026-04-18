"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";

export default function BookingForm({ tourId, userId, pricePerPerson }) {
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = pricePerPerson * guests;

  const handleBooking = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token"); // Get the JWT token

  const res = await fetch("/api/bookings/create", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // Critical for your JWT logic
    },
    body: JSON.stringify({ 
      tourId, 
      travelDate: date, 
      guests: parseInt(guests) 
    }),
  });
      if (res.ok) {
        Toaster.success("Booking requested! View it in your dashboard.");
      } else {
        const errorData = await res.json();
       Toaster.error(errorData.error || "Booking failed.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleBooking} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-slate-700">Travel Date</label>
          <input 
            type="date" 
            required 
            className="w-full mt-1 p-3 border rounded-lg"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">Number of Guests</label>
          <input 
            type="number" 
            min="1" 
            max="10"
            value={guests}
            className="w-full mt-1 p-3 border rounded-lg"
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 bg-blue-50 rounded-lg flex justify-between items-center">
        <span className="text-slate-600 font-medium">Total Price:</span>
        <span className="text-xl font-bold text-blue-700">${total}</span>
      </div>
      
      <Button type="submit" disabled={isSubmitting} className="w-full h-12">
        {isSubmitting ? "Booking..." : "Confirm Booking"}
      </Button>
    </form>
  );
}