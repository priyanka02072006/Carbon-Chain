import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamMembers = [
  {
    name: "Roshini Muthukumar Deepa",
    role: "Team Management/Leader",
    avatar: "RMD",
    bio: "Roshini leads the team, ensuring that project goals are met and the team works together effectively.",
  },
  {
    name: "Priyanka M",
    role: "Backend Developer",
    avatar: "PM",
    bio: "Priyanka is a backend developer, focused on building robust and scalable server-side logic.",
  },
  {
    name: "Sanjay Kumar PJ",
    role: "Backend Developer",
    avatar: "SP",
    bio: "Sanjay is a skilled backend developer, responsible for the core architecture and functionality of CarbonChain.",
  },
  {
    name: "Rohan Kumar RK",
    role: "Frontend Developer",
    avatar: "RK",
    bio: "Rohan builds the user-facing components of the platform, ensuring a smooth and responsive experience.",
  },
  {
    name: "Rishika A",
    role: "UI/UX Designer",
    avatar: "RA",
    bio: "Rishika designs the user-friendly and intuitive interface that makes CarbonChain a pleasure to use.",
  },
  {
    name: "Praveer R",
    role: "Developer",
    avatar: "PR",
    bio: "Praveer is a versatile developer contributing to various aspects of the CarbonChain platform.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">About CarbonChain</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground text-lg">
          <p>
            CarbonChain was founded on a simple but powerful idea: to harness the transparency of blockchain technology to accelerate the restoration of vital blue carbon ecosystems. We believe that a healthy planet requires healthy oceans, and we are dedicated to creating a transparent, verifiable, and efficient market for blue carbon credits.
          </p>
          <p>
            Our platform connects local communities, NGOs, and panchayats engaged in marine conservation with businesses and individuals looking to offset their carbon footprint. By tokenizing carbon credits, we ensure that every contribution is tracked, every project is verified, and every stakeholder is accountable.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Our Team</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center gap-4">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-2xl">{member.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-primary">{member.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
