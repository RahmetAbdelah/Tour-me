"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faCalendarAlt, faMapMarkerAlt, faUsers, faChartLine, faCog, faDollarSign, faMapMarkerAlt as faMap } from '@fortawesome/free-solid-svg-icons'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Optional: Install react-hot-toast if not already installed
// import toast from 'react-hot-toast';

const recentBookings = [
  {
    id: 1,
    user: "John Doe",
    destination: "Paris, France",
    dates: "May 15-22, 2024",
    status: "Confirmed",
    amount: "$1,200",
    bookingDate: "2024-04-10"
  },
  {
    id: 2,
    user: "Sarah Wilson",
    destination: "Tokyo, Japan",
    dates: "June 10-17, 2024",
    status: "Pending",
    amount: "$1,500",
    bookingDate: "2024-04-09"
  },
  {
    id: 3,
    user: "Mike Johnson",
    destination: "Bali, Indonesia",
    dates: "July 5-12, 2024",
    status: "Confirmed",
    amount: "$900",
    bookingDate: "2024-04-08"
  }
]

const navigation = [
  { name: 'Dashboard', href: '#dashboard', icon: faTachometerAlt },
  { name: 'Bookings', href: '#bookings', icon: faCalendarAlt },
  { name: 'Destinations', href: '#destinations', icon: faMapMarkerAlt },
  { name: 'Users', href: '#users', icon: faUsers },
  { name: 'Analytics', href: '#analytics', icon: faChartLine },
  { name: 'Settings', href: '#settings', icon: faCog },
]

export default function AdminDashboardPage() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTour, setNewTour] = useState({ title: "", description: "", price: "", imageUrl: "" })

  const [tours, setTours] = useState([]) 
  const [isLoading, setIsLoading] = useState(true)

  const fetchTours = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/admin/tours")
      const data = await res.json()
      if (data.success) {
        setTours(data.tours)
      }
    } catch (error) {
      console.error("Failed to fetch tours:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTours()
  }, [])

  const handleAddTour = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTour),
      });
      
      if (res.ok) {
        // toast.success("Tour added!");   // Uncomment after installing react-hot-toast
        alert("Tour added successfully!"); // Temporary alert
        setShowAddForm(false);
        setNewTour({ title: "", description: "", price: "", imageUrl: "" });
        fetchTours();
      }
    } catch (error) {
      console.error("Failed to add tour:", error);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Admin Dashboard</h2>
              <p className="text-slate-600">Overview of TourMe platform performance.</p>
            </div>

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="text-2xl">
                      <FontAwesomeIcon icon={faDollarSign} className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                      <p className="text-2xl font-bold">$152,000</p>
                      <p className="text-xs text-green-600">+12% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Other 3 metric cards remain the same - I kept them unchanged */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="text-2xl">
                      <FontAwesomeIcon icon={faCalendarAlt} className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-600">Total Bookings</p>
                      <p className="text-2xl font-bold">124</p>
                      <p className="text-xs text-green-600">+8% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="text-2xl">
                      <FontAwesomeIcon icon={faUsers} className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-600">Active Users</p>
                      <p className="text-2xl font-bold">1,247</p>
                      <p className="text-xs text-green-600">+15% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="text-2xl">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-600">Destinations</p>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-xs text-blue-600">2 new this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bookings */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Recent Bookings</h3>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                            {booking.user.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-medium">{booking.user}</h4>
                            <p className="text-sm text-slate-600">{booking.destination} • {booking.dates}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{booking.amount}</p>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Top Destinations */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Top Destinations</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {tours.length > 0 ? (
                  tours.slice(0, 4).map((tour) => (
                    <Card key={tour.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded bg-slate-100 overflow-hidden">
                              <img 
                                src={tour.imageUrl || "/placeholder-tour.jpg"} 
                                className="object-cover h-full w-full" 
                                alt={tour.title}
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{tour.title}</h4>
                              <p className="text-sm text-slate-600">Active Listing</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${tour.price}</p>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Live
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-2 p-8 border-2 border-dashed rounded-lg text-center text-slate-400">
                    No destinations to show. Add some in the Destinations tab!
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'bookings':
        return (
          <div className="space-y-6">
            {/* Your bookings content */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Bookings Management</h2>
                <p className="text-slate-600">Manage all travel reservations and bookings.</p>
              </div>
              <Button>Add New Booking</Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>View and manage customer bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                          {booking.user.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-medium">{booking.user}</h4>
                          <p className="text-sm text-slate-600">{booking.destination}</p>
                          <p className="text-xs text-slate-500">Booked on {booking.bookingDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{booking.amount}</p>
                        <p className="text-sm text-slate-600">{booking.dates}</p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Cancel</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'destinations':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Destinations Management</h2>
              <Button onClick={() => setShowAddForm(!showAddForm)}>
                {showAddForm ? "Close Form" : "Add New Destination"}
              </Button>
            </div>

            {showAddForm && (
              <Card className="bg-blue-50/50">
                <CardContent className="p-6">
                  <form onSubmit={handleAddTour} className="grid gap-4 md:grid-cols-2">
                    <input placeholder="Title" className="p-2 border rounded" 
    onChange={e => setNewTour({...newTour, title: e.target.value})} />
    
  <input placeholder="Location (e.g. Paris, France)" className="p-2 border rounded" 
    onChange={e => setNewTour({...newTour, location: e.target.value})} />

  <input placeholder="Price" type="number" className="p-2 border rounded" 
    onChange={e => setNewTour({...newTour, price: e.target.value})} />

  <input placeholder="Duration (e.g. 3 Days)" className="p-2 border rounded" 
    onChange={e => setNewTour({...newTour, duration: e.target.value})} />

  <input placeholder="Image URL" className="p-2 border rounded md:col-span-2" 
    onChange={e => setNewTour({...newTour, imageUrl: e.target.value})} />

  <textarea placeholder="Description" className="p-2 border rounded md:col-span-2" 
    onChange={e => setNewTour({...newTour, description: e.target.value})} />

  <Button type="submit" className="md:col-span-2">Save to Database</Button>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                <div className="col-span-full text-center py-10">Loading destinations...</div>
              ) : tours.length === 0 ? (
                <div className="col-span-full text-center py-10 text-slate-500">
                  No destinations found. Add your first one above!
                </div>
              ) : (
                tours.map((tour) => (
                  <Link href={`/destinations/${tour.id}`} key={tour.id} className="block">
    
                  <Card key={tour.id} className="overflow-hidden flex flex-col">
                    <div className="relative h-48 w-full bg-slate-100">
                      <img 
                        src={tour.imageUrl || "/placeholder-tour.jpg"} 
                        alt={tour.title}
                        className="object-cover w-full h-full"
                        onError={(e) => { e.target.src = "/placeholder-tour.jpg" }}
                      />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{tour.title}</CardTitle>
                        <span className="font-bold text-blue-600">${tour.price}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-1">
                      <p className="text-sm text-slate-600 line-clamp-3">
                        {tour.description}
                      </p>
                    </CardContent>
                    <div className="p-4 pt-0 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50">Delete</Button>
                    </div>
                  </Card>
                 
  </Link>
                ))
              )}
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-6">
            {/* Your users code remains unchanged */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">User Management</h2>
                <p className="text-slate-600">Manage user accounts and permissions.</p>
              </div>
              <Button>Add New User</Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Registered Users</CardTitle>
                <CardDescription>View and manage user accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "John Doe", email: "john@example.com", status: "Active", bookings: 3 },
                    { name: "Sarah Wilson", email: "sarah@example.com", status: "Active", bookings: 5 },
                    { name: "Mike Johnson", email: "mike@example.com", status: "Inactive", bookings: 1 }
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-slate-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{user.bookings} bookings</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status}
                        </span>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Analytics & Reports</h2>
              <p className="text-slate-600">View platform analytics and generate reports.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Revenue and Booking Trends cards */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Monthly revenue over the past year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                    <p className="text-slate-500">Revenue chart would go here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Trends</CardTitle>
                  <CardDescription>Monthly bookings over the past year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                    <p className="text-slate-500">Booking chart would go here</p>
                  </div>
                </CardContent>
              </Card>

              {/* Popular Destinations - Fixed: using tours instead of destinations */}
              <Card>
                <CardHeader>
                  <CardTitle>Popular Destinations</CardTitle>
                  <CardDescription>Most booked destinations this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tours.slice(0, 3).map((tour, index) => (
                      <div key={tour.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-slate-400">#{index + 1}</span>
                          <span className="font-medium">{tour.title}</span>
                        </div>
                        <span className="text-sm text-slate-600">Active</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Export Reports</CardTitle>
                  <CardDescription>Generate and download reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <FontAwesomeIcon icon={faChartLine} className="mr-2 h-4 w-4" />
                      Revenue Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 h-4 w-4" />
                      Booking Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FontAwesomeIcon icon={faUsers} className="mr-2 h-4 w-4" />
                      User Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            {/* Your settings content */}
            <div>
              <h2 className="text-2xl font-semibold mb-2">Admin Settings</h2>
              <p className="text-slate-600">Configure platform settings and preferences.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>General platform configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Maintenance Mode</p>
                      <p className="text-sm text-slate-600">Temporarily disable user access</p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-slate-600">Send system notifications</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Security and access settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Admin Password</label>
                    <input type="password" placeholder="Current password" className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">New Password</label>
                    <input type="password" placeholder="New password" className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
                  </div>
                  <Button>Update Password</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return <div className="p-12 text-center text-slate-500">Select a section from the sidebar</div>;
    }
  };

  // ==================== MAIN RETURN ====================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200">
        <div className="p-6">
          <div className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-1 cursor-pointer">
            <span className="text-orange-500 underline decoration-2 underline-offset-4">Voyage</span>. Admin
          </div>
        </div>
        <nav className="px-4 pb-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setActiveSection(item.name.toLowerCase())}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === item.name.toLowerCase()
                      ? 'bg-orange-50 text-orange-500 border-r-2 border-orange-500'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="mr-3"><FontAwesomeIcon icon={item.icon} className="h-5 w-5" /></span>
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-4 mt-8">
          <Link href="/">
            <Button variant="outline" className="w-full">
              Back to Voyage
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white border-b border-slate-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold capitalize">{activeSection}</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">Admin Panel</span>
              <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-medium">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}