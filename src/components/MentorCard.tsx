import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Mentor } from "@/data/mentors";

const MentorCard = ({ mentor }: { mentor: Mentor }) => {
  return (
    <Link
      to={`/mentors/${mentor.id}`}
      className="group block rounded-xl border bg-card p-5 card-shadow transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1"
    >
      <div className="flex gap-4">
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className="h-16 w-16 rounded-full object-cover ring-2 ring-border"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors truncate">
                {mentor.name}
              </h3>
              <p className="text-sm text-muted-foreground">{mentor.location}</p>
            </div>
            {mentor.available ? (
              <Badge variant="secondary" className="bg-primary/10 text-primary shrink-0 text-xs">
                Available
              </Badge>
            ) : (
              <Badge variant="secondary" className="shrink-0 text-xs">Busy</Badge>
            )}
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{mentor.bio}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {mentor.subjects.map((s) => (
          <Badge key={s} variant="outline" className="text-xs font-normal">
            {s}
          </Badge>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="font-medium">{mentor.rating}</span>
          <span className="text-muted-foreground">({mentor.reviewCount})</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <span>{mentor.experience} yrs exp</span>
          <span className="font-semibold text-foreground">{mentor.price.toLocaleString()} ₸/hr</span>
        </div>
      </div>
    </Link>
  );
};

export default MentorCard;
