import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Star, Users, Shield, ArrowRight, Sparkles, Code, Palette, TrendingUp, BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-primary/10 rounded-full blur-3xl" />
        <div className="container py-20 md:py-36 relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Professional Mentoring Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Find Your Perfect{" "}
              <span className="text-gradient">Mentor</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto">
              Connect with experienced professionals who'll accelerate your career. Programming, design, marketing & more.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" variant="hero" asChild>
                <Link to="/mentors">
                  <Search className="h-4 w-4" />
                  Browse Mentors
                </Link>
              </Button>
              <Button size="lg" variant="hero-outline" asChild>
                <Link to="/signup">Become a Mentor</Link>
              </Button>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[
              { value: "500+", label: "Mentors" },
              { value: "10k+", label: "Sessions" },
              { value: "4.9", label: "Avg Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Features */}
      <section className="border-t bg-secondary/50">
        <div className="container py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Why Choose <span className="text-gradient">Talimger</span>?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">Everything you need to find the perfect mentor and accelerate your career growth</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Star,
                title: "Verified Mentors",
                desc: "Every mentor is vetted for expertise, teaching skills, and student satisfaction.",
                color: "bg-warm/10 text-warm",
                iconBg: "bg-warm",
              },
              {
                icon: Users,
                title: "1-on-1 Sessions",
                desc: "Personalized attention tailored to your learning pace and goals.",
                color: "bg-info/10 text-info",
                iconBg: "bg-info",
              },
              {
                icon: Shield,
                title: "Guaranteed Quality",
                desc: "Not satisfied? We'll help you find the right match or refund your first session.",
                color: "bg-success/10 text-success",
                iconBg: "bg-success",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group relative flex flex-col items-center text-center p-8 rounded-2xl border bg-card card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`h-14 w-14 rounded-xl ${f.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <f.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-t">
        <div className="container py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Explore Categories</h2>
            <p className="text-muted-foreground">Find mentors across all professional disciplines</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Programming", Icon: Code, bg: "bg-info/10 hover:bg-info/20 border-info/20", iconColor: "text-info" },
              { name: "UI/UX Design", Icon: Palette, bg: "bg-primary/10 hover:bg-primary/20 border-primary/20", iconColor: "text-primary" },
              { name: "Marketing", Icon: TrendingUp, bg: "bg-warm/10 hover:bg-warm/20 border-warm/20", iconColor: "text-warm" },
              { name: "Data Science", Icon: BarChart3, bg: "bg-accent/10 hover:bg-accent/20 border-accent/20", iconColor: "text-accent" },
            ].map((cat) => (
              <Link
                key={cat.name}
                to="/mentors"
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border ${cat.bg} transition-all duration-200 hover:-translate-y-0.5`}
              >
                <cat.Icon className={`h-8 w-8 ${cat.iconColor}`} />
                <span className="font-medium text-sm">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50" />
        <div className="container py-16 md:py-24 text-center relative">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-foreground">
            Ready to Start Learning?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
            Join thousands of students who found their ideal mentor on Talimger.
          </p>
          <Button size="lg" variant="secondary" asChild className="group">
            <Link to="/mentors">
              Get Started
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
