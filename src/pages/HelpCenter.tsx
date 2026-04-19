import { useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Search,
  HelpCircle,
  UserPlus,
  Calendar,
  CreditCard,
  MessageSquare,
  Shield,
  GraduationCap,
  Mail,
  LifeBuoy,
} from "lucide-react";

type FaqItem = { q: string; a: string };
type FaqCategory = {
  id: string;
  title: string;
  description: string;
  Icon: typeof HelpCircle;
  iconColor: string;
  items: FaqItem[];
};

const categories: FaqCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Create your account and explore Talimger.",
    Icon: UserPlus,
    iconColor: "text-info",
    items: [
      {
        q: "How do I create an account on Talimger?",
        a: "Click 'Sign up' in the top-right corner, choose whether you're a student or a mentor, and fill in your name, email, and password. You'll be ready to explore in under a minute.",
      },
      {
        q: "What's the difference between a student and a mentor account?",
        a: "Students can browse mentors, book sessions, leave reviews, and chat. Mentors can additionally create ads, set their own rates, and manage incoming bookings.",
      },
      {
        q: "Is Talimger free to use?",
        a: "Creating an account and browsing mentors is completely free. You only pay for the sessions you book at the rate set by each mentor.",
      },
    ],
  },
  {
    id: "bookings",
    title: "Bookings & Sessions",
    description: "Everything about booking and attending sessions.",
    Icon: Calendar,
    iconColor: "text-primary",
    items: [
      {
        q: "How do I book a session with a mentor?",
        a: "Open a mentor's profile, choose a date and time that works for you, and confirm the booking. You'll see it instantly in your 'Bookings' page.",
      },
      {
        q: "Can I reschedule or cancel a booking?",
        a: "Yes. Go to the 'Bookings' page, open the session, and choose reschedule or cancel. We recommend doing this at least 24 hours before the session.",
      },
      {
        q: "How do I join my session?",
        a: "Sessions happen via video call. A join link will appear on your booking card a few minutes before the start time.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments & Pricing",
    description: "Pricing, payouts, and refunds.",
    Icon: CreditCard,
    iconColor: "text-warm",
    items: [
      {
        q: "How are session prices determined?",
        a: "Each mentor sets their own hourly rate. You'll always see the price clearly on the mentor's profile before booking.",
      },
      {
        q: "Which payment methods do you accept?",
        a: "We accept major debit and credit cards. More local payment options are being added regularly.",
      },
      {
        q: "When do mentors get paid?",
        a: "Mentor earnings are released after each completed session and paid out on a regular schedule to the payout method set in their account.",
      },
      {
        q: "What is your refund policy?",
        a: "If a session is cancelled by the mentor or doesn't take place, you'll receive a full refund automatically.",
      },
    ],
  },
  {
    id: "messaging",
    title: "Messaging",
    description: "Chatting with mentors and students.",
    Icon: MessageSquare,
    iconColor: "text-accent",
    items: [
      {
        q: "Can I talk to a mentor before booking?",
        a: "Yes. Open their profile and start a chat from the 'Messages' button to ask questions before booking your first session.",
      },
      {
        q: "Where can I see all my conversations?",
        a: "All your chats live in the 'Messages' page, accessible from the top navigation when you're logged in.",
      },
    ],
  },
  {
    id: "mentors",
    title: "For Mentors",
    description: "Create ads, manage profile, grow your audience.",
    Icon: GraduationCap,
    iconColor: "text-primary",
    items: [
      {
        q: "How do I become a mentor?",
        a: "Sign up and choose 'Mentor' as your role. Then go to 'Create Ad' to publish your first listing with subjects, price, and bio.",
      },
      {
        q: "How can I attract more students?",
        a: "Add a clear photo, write a detailed bio, list specific subjects, and keep your availability up to date. Strong reviews from past students help a lot.",
      },
      {
        q: "Can I edit or pause my ad?",
        a: "Yes. You can update or temporarily disable your ad at any time from your mentor dashboard.",
      },
    ],
  },
  {
    id: "trust-safety",
    title: "Trust & Safety",
    description: "Your privacy, safety, and account security.",
    Icon: Shield,
    iconColor: "text-info",
    items: [
      {
        q: "Are mentors verified?",
        a: "We review mentor profiles and credentials before they go live. Look for the verified badge on a mentor's profile.",
      },
      {
        q: "How do you protect my personal data?",
        a: "Your data is encrypted in transit and stored securely. We never share your personal information with third parties without consent.",
      },
      {
        q: "How do I report a problem with a user?",
        a: "Open the user's profile or chat and use the report option, or contact our support team directly via the form below.",
      },
    ],
  },
];

const HelpCenter = () => {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = q
    ? categories
        .map((c) => ({
          ...c,
          items: c.items.filter(
            (it) => it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q)
          ),
        }))
        .filter((c) => c.items.length > 0)
    : categories;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-mesh border-b">
        <div className="container py-16 md:py-24 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            <LifeBuoy className="h-3.5 w-3.5" />
            HELP CENTER
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How can we <span className="text-gradient">help you?</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Find quick answers to the most common questions about using Talimger.
          </p>

          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for answers..."
              className="pl-11 h-12 surface-glass border-border/50"
              aria-label="Search help articles"
            />
          </div>
        </div>
      </section>

      {/* Quick category nav */}
      {!q && (
        <section className="container py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((c) => (
              <a key={c.id} href={`#${c.id}`}>
                <Card className="p-5 hover:border-primary/40 transition-colors h-full">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <c.Icon className={`h-5 w-5 ${c.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{c.title}</h3>
                      <p className="text-sm text-muted-foreground">{c.description}</p>
                    </div>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* FAQ sections */}
      <section className="container pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try a different search term or browse the categories above.
            </p>
          </div>
        ) : (
          <div className="space-y-12 max-w-3xl mx-auto">
            {filtered.map((c) => (
              <div key={c.id} id={c.id} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <c.Icon className={`h-5 w-5 ${c.iconColor}`} />
                  </div>
                  <h2 className="text-2xl font-bold">{c.title}</h2>
                </div>
                <Accordion type="single" collapsible className="surface-glass rounded-xl px-4 border">
                  {c.items.map((it, idx) => (
                    <AccordionItem key={idx} value={`${c.id}-${idx}`} className="border-b last:border-b-0">
                      <AccordionTrigger className="text-left">{it.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{it.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Contact CTA */}
      <section className="container pb-20">
        <Card className="p-8 md:p-12 text-center gradient-mesh border-primary/20 max-w-3xl mx-auto">
          <div className="h-12 w-12 rounded-full hero-gradient flex items-center justify-center mx-auto mb-4">
            <Mail className="h-6 w-6 text-primary-foreground" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Still need help?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Can't find what you're looking for? Our support team is here for you 24/7.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="hero" asChild>
              <a href="mailto:support@talimger.com">Contact Support</a>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/mentors">Browse Mentors</Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default HelpCenter;
