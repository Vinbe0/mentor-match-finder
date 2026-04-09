import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Star, Users, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-[0.03]" />
        <div className="container py-20 md:py-32 relative">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Find Your Perfect{" "}
              <span className="text-gradient">Mentor</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto">
              Connect with experienced tutors across Kazakhstan. Personalized learning, flexible schedule, proven results.
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
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-card">
        <div className="container py-16 md:py-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Why Choose Talimger?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: "Verified Mentors",
                desc: "Every mentor is vetted for expertise, teaching skills, and student satisfaction.",
              },
              {
                icon: Users,
                title: "1-on-1 Sessions",
                desc: "Personalized attention tailored to your learning pace and goals.",
              },
              {
                icon: Shield,
                title: "Guaranteed Quality",
                desc: "Not satisfied? We'll help you find the right match or refund your first session.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="flex flex-col items-center text-center p-6 rounded-xl border bg-background card-shadow"
              >
                <div className="h-12 w-12 rounded-lg hero-gradient flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="container py-16 md:py-24 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Join thousands of students who found their ideal mentor on Talimger.
          </p>
          <Button size="lg" variant="hero" asChild>
            <Link to="/mentors">Get Started</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
