import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function MrvSystemPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>MRV System: Coastal Ecosystem Map</CardTitle>
        <CardDescription>
          This map displays the key coastal and marine ecosystems across India relevant to blue carbon projects. Use it to explore potential restoration sites.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[60vh] rounded-lg overflow-hidden border">
          <iframe
            width="100%"
            height="100%"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16279435.43194092!2d71.4921443685459!3d20.08832168940854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xde56f3d3b0b08c36!2sIndia!5e0!3m2!1sen!2sus!4v1700000000000"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Coastal Ecosystems Map"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
}
