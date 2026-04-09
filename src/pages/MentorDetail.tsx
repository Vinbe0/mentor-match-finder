import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Clock, Globe, BookOpen, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mentors } from "@/data/mentors";

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
    <div className="container py-8 md:py-12 max-w-4xl">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link to="/mentors">
          <ArrowLeft className="h-4 w-4" /> Back to Mentors
        </Link>
      </Button>

      {/* Profile header */}
      <div className="rounded-xl border bg-card p-6 md:p-8 card-shadow">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={mentor.avatar}
            alt={mentor.name}
            className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover ring-4 ring-border"
          />
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
                <div className="text-2xl font-bold">{mentor.price.toLocaleString()} ₸<span className="text-sm font-normal text-muted-foreground">/hr</span></div>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-medium">{mentor.rating}</span>
                  <span className="text-muted-foreground text-sm">({mentor.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {mentor.subjects.map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
              {mentor.available ? (
                <Badge variant="secondary" className="bg-primary/10 text-primary">Available</Badge>
              ) : (
                <Badge variant="secondary">Busy</Badge>
              )}
            </div>

            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span>{mentor.languages.join(", ")}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button size="lg" className="flex-1 md:flex-none" disabled={!mentor.available}>
            <BookOpen className="h-4 w-4" />
            {mentor.available ? "Book a Session" : "Currently Unavailable"}
          </Button>
          <Button size="lg" variant="outline">
            <MessageCircle className="h-4 w-4" />
            Message
          </Button>
        </div>
      </div>

      {/* About */}
      <div className="mt-8 rounded-xl border bg-card p-6 md:p-8 card-shadow">
        <h2 className="text-xl font-semibold mb-4">About</h2>
        <p className="text-muted-foreground leading-relaxed">{mentor.longBio}</p>
      </div>

      {/* Reviews */}
      <div className="mt-8 rounded-xl border bg-card p-6 md:p-8 card-shadow">
        <h2 className="text-xl font-semibold mb-6">
          Reviews <span className="text-muted-foreground font-normal">({mentor.reviews.length})</span>
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
                        className={`h-3.5 w-3.5 ${j < review.rating ? "fill-accent text-accent" : "text-border"}`}
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
  );
};

export default MentorDetail;
