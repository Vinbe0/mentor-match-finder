import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Mentor } from "@/data/mentors";

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

const MentorCard = ({ mentor }: { mentor: Mentor }) => {
  return (
    <Link
      to={`/mentors/${mentor.id}`}
      className="group block rounded-2xl border bg-card p-5 card-shadow transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1"
    >
      <div className="flex gap-4">
        <div className="relative">
          <img
            src={mentor.avatar}
            alt={mentor.name}
            className="h-16 w-16 rounded-xl object-cover ring-2 ring-border group-hover:ring-primary/30 transition-all"
          />
          {mentor.available && (
            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-success border-2 border-card" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors truncate">
                {mentor.name}
              </h3>
              <p className="text-sm text-muted-foreground">{mentor.location}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                mentor.available
                  ? "bg-success/10 text-success"
                  : "bg-muted text-muted-foreground"
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${mentor.available ? "bg-success" : "bg-muted-foreground"}`} />
                {mentor.available ? "Online" : "Offline"}
              </span>
            <div className="flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-lg bg-warm/10">
              <Star className="h-3.5 w-3.5 fill-warm text-warm" />
              <span className="text-sm font-semibold text-warm">{mentor.rating}</span>
            </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{mentor.bio}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {mentor.subjects.map((s) => (
          <span
            key={s}
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${categoryColor[s] || "bg-muted text-muted-foreground border-border"}`}
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm border-t pt-3">
        <span className="text-muted-foreground">{mentor.experience} yrs exp</span>
        <span className="font-bold text-foreground">{mentor.price.toLocaleString()} ₸<span className="font-normal text-muted-foreground">/hr</span></span>
      </div>
    </Link>
  );
};

export default MentorCard;
