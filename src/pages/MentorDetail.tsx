import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Clock, Globe, BookOpen, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mentors } from "@/data/mentors";

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
  const mentor = mentors.find((m) => m.id === id);

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
                    <span className="text-muted-foreground text-sm">({mentor.reviewCount} reviews)</span>
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
            <Button size="lg" variant="hero" className="flex-1 md:flex-none" disabled={!mentor.available}>
              <BookOpen className="h-4 w-4" />
              {mentor.available ? "Book a Session" : "Currently Unavailable"}
            </Button>
            <Button size="lg" variant="outline">
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

        {/* Reviews */}
        <div className="rounded-2xl border bg-card p-6 md:p-8 card-shadow">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="h-1 w-6 rounded-full hero-gradient inline-block" />
            Reviews
            <span className="text-muted-foreground font-normal">({mentor.reviews.length})</span>
          </h2>
          <div className="space-y-5">
            {mentor.reviews.map((review, i) => (
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
