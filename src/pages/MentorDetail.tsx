import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Clock, Globe, BookOpen, MessageCircle, Send, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { mentors } from "@/data/mentors";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const categoryColor: Record<string, string> = {
  "Programming": "bg-info/10 text-info border-info/20",
  "Web Development": "bg-info/10 text-info border-info/20",
  "UI/UX Design": "bg-primary/10 text-primary border-primary/20",
  "Digital Marketing": "bg-warm/10 text-warm border-warm/20",
  "Content Marketing": "bg-warm/10 text-warm border-warm/20",
  "Data Science": "bg-accent/10 text-accent border-accent/20",
  "Machine Learning": "bg-accent/10 text-accent border-accent/20",
  "Product Management": "bg-success/10 text-success border-success/20",
};

const MentorDetail = () => {
  const { id } = useParams();
  const { user, userReviews, addReview, addBooking, getOrCreateChat } = useAuth();
  // (customMentors fetched below)
  const navigate = useNavigate();
  const { customMentors } = useAuth();
  const mentor = [...mentors, ...customMentors].find((m) => m.id === id);

  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingSubject, setBookingSubject] = useState("");
  const [bookingOpen, setBookingOpen] = useState(false);

  if (!mentor) {
    return (
      <div className="container py-16 text-center">
        <p className="text-lg font-medium mb-4">Mentor not found</p>
        <Button variant="outline" asChild>
          <Link to="/mentors"><ArrowLeft className="h-4 w-4" /> Back to Mentors</Link>
        </Button>
      </div>
    );
  }

  const mentorUserReviews = userReviews.filter((r) => r.mentorId === mentor.id);
  const allReviews = [
    ...mentor.reviews.map((r) => ({ ...r, mentorId: mentor.id })),
    ...mentorUserReviews,
  ];

  const handleSubmitReview = () => {
    if (!reviewText.trim()) {
      toast.error("Please write a review before submitting.");
      return;
    }
    addReview({
      mentorId: mentor!.id,
      author: user!.name,
      text: reviewText.trim(),
      rating: reviewRating,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
    });
    setReviewText("");
    setReviewRating(5);
    toast.success("Review submitted!");
  };

  return (
    <div className="min-h-screen">
      {/* Profile banner */}
      <div className="relative overflow-hidden border-b">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="container py-8 md:py-12 max-w-4xl relative">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link to="/mentors">
              <ArrowLeft className="h-4 w-4" /> Back to Mentors
            </Link>
          </Button>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="h-28 w-28 md:h-36 md:w-36 rounded-2xl object-cover ring-4 ring-card shadow-lg"
              />
              {mentor.available && (
                <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-success border-3 border-card" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{mentor.name}</h1>
                  <p className="text-muted-foreground mt-1">{mentor.education}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {mentor.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {mentor.experience} years exp</span>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-2xl font-bold text-gradient">{mentor.price.toLocaleString()} ₸<span className="text-sm font-normal text-muted-foreground">/hr</span></div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-warm text-warm" />
                    <span className="font-medium">{mentor.rating}</span>
                    <span className="text-muted-foreground text-sm">({allReviews.length} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {mentor.subjects.map((s) => (
                  <span
                    key={s}
                    className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border ${categoryColor[s] || "bg-muted text-muted-foreground border-border"}`}
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span>{mentor.languages.join(", ")}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            {user ? (
              <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" variant="hero" className="flex-1 md:flex-none" disabled={!mentor.available}>
                    <BookOpen className="h-4 w-4" />
                    {mentor.available ? "Book a Session" : "Currently Unavailable"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Book a session with {mentor.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Date</label>
                      <Input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Time</label>
                      <Select value={bookingTime} onValueChange={setBookingTime}>
                        <SelectTrigger><SelectValue placeholder="Select time" /></SelectTrigger>
                        <SelectContent>
                          {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Subject</label>
                      <Select value={bookingSubject} onValueChange={setBookingSubject}>
                        <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                        <SelectContent>
                          {mentor.subjects.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-muted">
                      <span className="text-muted-foreground">Session price</span>
                      <span className="font-bold text-foreground">{mentor.price.toLocaleString()} ₸/hr</span>
                    </div>
                    <Button
                      variant="hero"
                      className="w-full"
                      disabled={!bookingDate || !bookingTime || !bookingSubject}
                      onClick={async () => {
                        await addBooking({
                          mentorId: mentor.id,
                          mentorName: mentor.name,
                          mentorAvatar: mentor.avatar,
                          studentId: user.id,
                          studentName: user.name,
                          date: bookingDate,
                          time: bookingTime,
                          subject: bookingSubject,
                          status: "upcoming",
                          price: mentor.price,
                        });
                        setBookingOpen(false);
                        setBookingDate("");
                        setBookingTime("");
                        setBookingSubject("");
                        toast.success("Session booked successfully!");
                      }}
                    >
                      <Calendar className="h-4 w-4" /> Confirm Booking
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <Button size="lg" variant="hero" className="flex-1 md:flex-none" asChild>
                <Link to="/login">Log in to Book</Link>
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              onClick={async () => {
                if (!user) { navigate("/login"); return; }
                const chatId = await getOrCreateChat(mentor.id, mentor.name, mentor.avatar);
                if (chatId) navigate(`/chats/${chatId}`);
              }}
            >
              <MessageCircle className="h-4 w-4" />
              Message
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl py-8 space-y-6">
        {/* About */}
        <div className="rounded-2xl border bg-card p-6 md:p-8 card-shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="h-1 w-6 rounded-full hero-gradient inline-block" />
            About
          </h2>
          <p className="text-muted-foreground leading-relaxed">{mentor.longBio}</p>
        </div>

        {/* Write a review */}
        {user && (
          <div className="rounded-2xl border bg-card p-6 md:p-8 card-shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="h-1 w-6 rounded-full hero-gradient inline-block" />
              Write a Review
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Your rating</p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setReviewRating(i + 1)}
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-0.5 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-6 w-6 transition-colors ${
                          i < (hoverRating || reviewRating)
                            ? "fill-warm text-warm"
                            : "text-border"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">{hoverRating || reviewRating}/5</span>
                </div>
              </div>
              <Textarea
                placeholder="Share your experience with this mentor..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                maxLength={1000}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{reviewText.length}/1000</span>
                <Button onClick={handleSubmitReview} variant="hero" size="sm">
                  <Send className="h-4 w-4" />
                  Submit Review
                </Button>
              </div>
            </div>
          </div>
        )}

        {!user && (
          <div className="rounded-2xl border bg-card p-6 text-center card-shadow">
            <p className="text-muted-foreground mb-3">Log in to leave a review</p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Log in</Link>
            </Button>
          </div>
        )}

        {/* Reviews */}
        <div className="rounded-2xl border bg-card p-6 md:p-8 card-shadow">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="h-1 w-6 rounded-full hero-gradient inline-block" />
            Reviews
            <span className="text-muted-foreground font-normal">({allReviews.length})</span>
          </h2>
          <div className="space-y-5">
            {allReviews.map((review, i) => (
              <div key={i}>
                {i > 0 && <Separator className="mb-5" />}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{review.author}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`h-3.5 w-3.5 ${j < review.rating ? "fill-warm text-warm" : "text-border"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDetail;
