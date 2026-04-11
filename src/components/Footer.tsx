import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-3">
              <div className="h-7 w-7 rounded-lg hero-gradient flex items-center justify-center">
                <GraduationCap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-gradient">Talimger</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Find the perfect mentor to guide your professional journey. Quality education, personalized for you.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/mentors" className="hover:text-primary transition-colors">Find Mentors</Link></li>
              <li><Link to="/signup" className="hover:text-primary transition-colors">Become a Mentor</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Talimger. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
