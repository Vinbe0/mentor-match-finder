import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const FormFields = ({ isMentor }: { isMentor: boolean }) => {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!first || !email || !password) {
        toast({ title: "Please fill in required fields", variant: "destructive" });
        return;
      }
      const { error } = await signup(`${first} ${last}`.trim(), email, password, isMentor ? "mentor" : "student");
      if (error) {
        toast({ title: "Signup failed", description: error, variant: "destructive" });
        return;
      }
      toast({ title: "Account created!", description: isMentor ? "You can now create your mentor ad." : "Welcome to Talimger!" });
      navigate(isMentor ? "/create-ad" : "/mentors");
    };

    return (
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor={`first-${isMentor}`}>First name</Label>
            <Input id={`first-${isMentor}`} placeholder="Aigerim" value={first} onChange={(e) => setFirst(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`last-${isMentor}`}>Last name</Label>
            <Input id={`last-${isMentor}`} placeholder="Suleimenova" value={last} onChange={(e) => setLast(e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor={`email-${isMentor}`}>Email</Label>
          <Input id={`email-${isMentor}`} type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`password-${isMentor}`}>Password</Label>
          <div className="relative">
            <Input
              id={`password-${isMentor}`}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <Button className="w-full" size="lg">Create account</Button>
      </form>
    );
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-xl mb-4">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="text-gradient">Talimger</span>
          </Link>
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join Talimger today</p>
        </div>

        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="mentor">Mentor</TabsTrigger>
          </TabsList>
          <TabsContent value="student" className="mt-4">
            <FormFields isMentor={false} />
          </TabsContent>
          <TabsContent value="mentor" className="mt-4">
            <FormFields isMentor={true} />
          </TabsContent>
        </Tabs>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
