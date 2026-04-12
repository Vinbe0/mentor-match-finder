import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import MentorCard from "@/components/MentorCard";
import { mentors, subjects } from "@/data/mentors";
import { useAuth } from "@/contexts/AuthContext";

const Mentors = () => {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");
  const [maxPrice, setMaxPrice] = useState([15000]);
  
  const [showFilters, setShowFilters] = useState(false);
  const { customMentors } = useAuth();

  const allMentors = useMemo(() => [...mentors, ...customMentors], [customMentors]);

  const filtered = useMemo(() => {
    let result = allMentors.filter((m) => {
      const matchSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.bio.toLowerCase().includes(search.toLowerCase());
      const matchSubject = subject === "all" || m.subjects.includes(subject);
      const matchPrice = m.price <= maxPrice[0];
      return matchSearch && matchSubject && matchPrice;
    });

    result.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "experience") return b.experience - a.experience;
      return 0;
    });

    return result;
  }, [search, subject, sortBy, maxPrice, allMentors]);

  return (
    <div className="min-h-screen">
      {/* Marquee banner */}
      <div className="bg-primary text-primary-foreground overflow-hidden whitespace-nowrap py-2">
        <div className="animate-marquee inline-block">
          <span className="text-sm font-semibold tracking-wide">
            ONLY UNTIL THE END OF THE WEEK ★ HURRY UP AND FIND YOUR MENTOR! ★ 🚀 20% OFF YOUR FIRST MONTH OF LEARNING &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            ONLY UNTIL THE END OF THE WEEK ★ HURRY UP AND FIND YOUR MENTOR! ★ 🚀 20% OFF YOUR FIRST MONTH OF LEARNING &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            ONLY UNTIL THE END OF THE WEEK ★ HURRY UP AND FIND YOUR MENTOR! ★ 🚀 20% OFF YOUR FIRST MONTH OF LEARNING &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>

      {/* Header banner */}
      <div className="relative overflow-hidden border-b">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="container py-10 md:py-14 relative">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Discover talent</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Find a Mentor</h1>
          <p className="text-muted-foreground max-w-lg">Browse our community of expert mentors across programming, design, marketing, and more</p>
        </div>
      </div>

      <div className="container py-8">
        {/* Mobile filter toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted transition-colors w-full justify-center"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Left sidebar filters */}
          <aside className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-64 shrink-0`}>
            <div className="md:sticky md:top-20 space-y-6 p-5 rounded-2xl border bg-card card-shadow">
              <div>
                <h3 className="text-sm font-semibold mb-3 text-foreground">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Name or keyword..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3 text-foreground">Subject</h3>
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
              </div>




              <div>
                <h3 className="text-sm font-semibold mb-3 text-foreground">Sort by</h3>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">Max price</h3>
                  <Badge variant="outline" className="shrink-0">{maxPrice[0].toLocaleString()} ₸</Badge>
                </div>
                <Slider
                  value={maxPrice}
                  onValueChange={setMaxPrice}
                  max={15000}
                  min={1000}
                  step={500}
                />
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="mb-4 text-sm text-muted-foreground">
              {filtered.length} mentor{filtered.length !== 1 ? "s" : ""} found
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {filtered.map((m) => (
                  <MentorCard key={m.id} mentor={m} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 rounded-2xl border bg-card">
                <p className="text-lg font-medium mb-2">No mentors found</p>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentors;
