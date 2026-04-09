import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import MentorCard from "@/components/MentorCard";
import { mentors, subjects } from "@/data/mentors";

const Mentors = () => {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [maxPrice, setMaxPrice] = useState([10000]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = mentors.filter((m) => {
      const matchSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.bio.toLowerCase().includes(search.toLowerCase());
      const matchSubject = subject === "all" || m.subjects.includes(subject);
      const matchPrice = m.price <= maxPrice[0];
      return matchSearch && matchSubject && matchPrice;
    });

    result.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "experience") return b.experience - a.experience;
      return 0;
    });

    return result;
  }, [search, subject, sortBy, maxPrice]);

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find a Mentor</h1>
        <p className="text-muted-foreground">Browse our community of expert mentors</p>
      </div>

      {/* Search and filters */}
      <div className="space-y-4 mb-8">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 px-4 border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${showFilters ? "block" : "hidden md:grid"}`}>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="experience">Most Experienced</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Max price:</span>
            <Slider
              value={maxPrice}
              onValueChange={setMaxPrice}
              max={10000}
              min={1000}
              step={500}
              className="flex-1"
            />
            <Badge variant="outline" className="shrink-0">{maxPrice[0].toLocaleString()} ₸</Badge>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 text-sm text-muted-foreground">
        {filtered.length} mentor{filtered.length !== 1 ? "s" : ""} found
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((m) => (
            <MentorCard key={m.id} mentor={m} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg font-medium mb-2">No mentors found</p>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Mentors;
