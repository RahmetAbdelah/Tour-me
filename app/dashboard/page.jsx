"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faTachometerAlt, 
  faCalendarAlt, 
  faHeart, 
  faUser, 
  faCog,
  faMap, 
  faDollarSign 
} from '@fortawesome/free-solid-svg-icons'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TourCard from "@/components/TourCard"

export default function DashboardPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('dashboard')
  
  // --- State for Real Data ---
  const [user, setUser] = useState(null)
  const [allTours, setAllTours] = useState([])
  const [realBookings, setRealBookings] = useState([])
  const [realFavoriteTours, setFavoriteTours] = useState([])
  const [favoritesIds, setFavoritesIds] = useState(new Set())
  const [isLoading, setIsLoading] = useState(true)

  // Navigation config
  const navigation = [
    { name: 'Dashboard', icon: faTachometerAlt },
    { name: 'Explore', icon: faMap },
    { name: 'Bookings', icon: faCalendarAlt },
    { name: 'Favorites', icon: faHeart },
    { name: 'Profile', icon: faUser },
    { name: 'Settings', icon: faCog },
  ]

  // --- Load Data on Mount ---
  useEffect(() => {
    const loadDashboardData = async () => {
      const token = localStorage.getItem("token")
      const storedUser = localStorage.getItem("user")
      
      if (!token) {
        router.push("/auth/login")
        return
      }

      if (storedUser) setUser(JSON.parse(storedUser))

      try {
        const toursRes = await fetch("/api/admin/tours")
      const tData = await toursRes.json()
      if (tData.success) setAllTours(tData.tours)
        
        const bookingsRes = await fetch("/api/bookings/my-tours", {
          headers: { "Authorization": `Bearer ${token}` }
        })
        const bData = await bookingsRes.json()
        if (bData.success) setRealBookings(bData.bookings)

    
        const favsRes = await fetch("/api/favorites", {
          headers: { "Authorization": `Bearer ${token}` }
        })
        const fData = await favsRes.json()
        if (fData.success) {
          setFavoriteTours(fData.tours)
          setFavoritesIds(new Set(fData.tours.map(t => t.id)))
        }
      } catch (err) {
        console.error("Dashboard sync error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [router])


  const handleSignOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Signed out successfully")
    router.push("/auth/login")
  }

  const renderContent = () => {
    if (isLoading) return <div className="p-8 text-center text-slate-500">Loading your data...</div>

    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Welcome back, {user?.firstName}!</h2>
              <p className="text-slate-600">Here's what's happening with your travel plans.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faCalendarAlt} className="h-6 w-6 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-600">Upcoming Trips</p>
                      <p className="text-2xl font-bold">{realBookings.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faHeart} className="h-6 w-6 text-red-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-600">Favorites</p>
                      <p className="text-2xl font-bold">{favoritesIds.size}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faDollarSign} className="h-6 w-6 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-600">Total Spent</p>
                      <p className="text-2xl font-bold">$0</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bookings */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Recent Bookings</h3>
              <div className="space-y-4">
                {realBookings.length > 0 ? (
                  realBookings.slice(0, 2).map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="relative h-16 w-16 rounded overflow-hidden bg-slate-100">
                          {booking.tour?.imageUrl && (
                            <Image src={booking.tour.imageUrl} alt={booking.tour.title} fill className="object-cover" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{booking.tour?.title}</h4>
                          <p className="text-sm text-slate-600">{new Date(booking.travelDate).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <span className="bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-medium">Confirmed</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-slate-500 italic">No recent bookings found.</p>
                )}
              </div>
            </div>
          </div>
        )

      // Inside your switch (activeSection) { ... }
case 'explore':
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Explore Destinations</h2>
        <p className="text-slate-600">Find your next adventure from our global catalog.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allTours.length > 0 ? (
          allTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed">
            <p className="text-slate-500">No destinations available right now.</p>
          </div>
        )}
      </div>
    </div>
  )
      case 'favorites':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">My Favorites</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {realFavoriteTours.length > 0 ? (
                realFavoriteTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))
              ) : (
                <p className="text-slate-500">You haven't favorited any tours yet.</p>
              )}
            </div>
          </div>
        )

      case 'bookings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">My Bookings</h2>
            <div className="space-y-4">
              {realBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6 flex items-center gap-6">
                    <div className="relative h-20 w-20 rounded overflow-hidden">
                       <Image src={booking.tour?.imageUrl} alt={booking.tour?.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{booking.tour?.title}</h3>
                      <p className="text-slate-600">{new Date(booking.travelDate).toLocaleDateString()}</p>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Profile Settings</h2>
            <Card>
              <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-500">First Name</label>
                    <p className="text-lg font-medium">{user?.firstName}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-500">Last Name</label>
                    <p className="text-lg font-medium">{user?.lastName}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-500">Email Address</label>
                  <p className="text-lg font-medium">{user?.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-700">TourMe</h1>
        </div>
        <nav className="px-4 flex-1">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setActiveSection(item.name.toLowerCase())}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === item.name.toLowerCase()
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="mr-3 h-5 w-5" />
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        <header className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold capitalize">{activeSection}</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">Welcome, {user?.firstName}!</span>
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                {user?.firstName?.[0]}
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}