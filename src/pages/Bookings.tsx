import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, X, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

const statusStyles: Record<string, string> = {
  upcoming: "bg-info/10 text-info border-info/20",
  completed: "bg-success/10 text-success border-success/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const Bookings = () => {
  const { user, bookings, cancelBooking } = useAuth();
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");

  if (!user) {
    return (
      <div className="container py-16 text-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg font-medium mb-4">Please log in to view your bookings</p>
        <Button variant="hero" asChild>
          <Link to="/login">Log in</Link>
        </Button>
      </div>
    );
  }

  const userBookings = bookings
    .filter((b) => b.studentId === user.id || b.mentorId === user.id)
    .filter((b) => filter === "all" || b.status === filter)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden border-b">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="container py-10 md:py-14 relative">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Your schedule</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Manage your upcoming and past sessions</p>
        </div>
      </div>

      <div className="container py-8 max-w-3xl">
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "upcoming", "completed", "cancelled"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {userBookings.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border bg-card">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">No bookings yet</p>
            <p className="text-muted-foreground mb-4">Find a mentor and book your first session</p>
            <Button variant="hero" asChild>
              <Link to="/mentors">Browse Mentors</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {userBookings.map((booking) => (
              <div key={booking.id} className="rounded-2xl border bg-card p-5 card-shadow flex flex-col sm:flex-row gap-4">
                <img
                  src={booking.mentorAvatar}
                  alt={booking.mentorName}
                  className="h-14 w-14 rounded-xl object-cover ring-2 ring-border shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-card-foreground">{booking.mentorName}</h3>
                      <p className="text-sm text-muted-foreground">{booking.subject}</p>
                    </div>
                    <Badge className={`shrink-0 border ${statusStyles[booking.status]}`}>
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {booking.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {booking.time}
                    </span>
                    <span className="font-medium text-foreground">{booking.price.toLocaleString()} ₸</span>
                  </div>
                  {booking.status === "upcoming" && (
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="text-destructive hover:text-destructive" onClick={() => cancelBooking(booking.id)}>
                        <X className="h-3 w-3" /> Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
