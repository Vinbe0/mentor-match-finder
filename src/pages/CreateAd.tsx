import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { subjects, type Mentor } from "@/data/mentors";
import { useToast } from "@/hooks/use-toast";

const CreateAd = () => {
  const { user, addCustomMentor } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState("");
  const [longBio, setLongBio] = useState("");
  const [education, setEducation] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [price, setPrice] = useState([5000]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [languages, setLanguages] = useState("");

  const toggleSubject = (s: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !bio || selectedSubjects.length === 0) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }

    await addCustomMentor({
      name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=d94080&color=fff&size=200`,
      subject: selectedSubjects[0],
      subjects: selectedSubjects,
      price: price[0],
      experience: parseInt(experience) || 0,
      bio,
      longBio: longBio || bio,
      education,
      languages: languages.split(",").map((l) => l.trim()).filter(Boolean),
      location,
      available: true,
    });
    toast({ title: "Ad created!", description: "Your mentor listing is now visible." });
    navigate("/mentors");
  };

  if (!user || user.role !== "mentor") {
    return (
      <div className="container py-16 text-center">
        <p className="text-lg font-medium mb-2">Access denied</p>
        <p className="text-muted-foreground">You must be logged in as a mentor to create an ad.</p>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Create Your Mentor Ad</h1>
      <p className="text-muted-foreground mb-8">Fill in your details to appear in the mentors listing.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">City</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Almaty" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="education">Education</Label>
            <Input id="education" value={education} onChange={(e) => setEducation(e.target.value)} placeholder="e.g. MSc Mathematics, NU" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input id="experience" type="number" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="5" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Subjects *</Label>
          <div className="flex flex-wrap gap-2">
            {subjects.map((s) => (
              <Badge
                key={s}
                variant={selectedSubjects.includes(s) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleSubject(s)}
              >
                {s}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Short Bio *</Label>
          <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Brief description of your teaching style..." rows={3} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="longBio">Detailed Description</Label>
          <Textarea id="longBio" value={longBio} onChange={(e) => setLongBio(e.target.value)} placeholder="Tell more about your experience, methodology..." rows={5} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="languages">Languages (comma separated)</Label>
          <Input id="languages" value={languages} onChange={(e) => setLanguages(e.target.value)} placeholder="Kazakh, Russian, English" />
        </div>

        <div className="space-y-2">
          <Label>Price per hour</Label>
          <div className="flex items-center gap-4">
            <Slider value={price} onValueChange={setPrice} min={1000} max={15000} step={500} className="flex-1" />
            <Badge variant="outline" className="shrink-0">{price[0].toLocaleString()} ₸/hr</Badge>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full">Publish Ad</Button>
      </form>
    </div>
  );
};

export default CreateAd;
