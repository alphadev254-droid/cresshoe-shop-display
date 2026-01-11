import { useState } from "react";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `*Contact Form Message*\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodedMessage}`, "_blank");
    
    toast.success("Redirecting to WhatsApp...");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Header with Background Image */}
        <section 
          className="relative py-20 md:py-28 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80)` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="container relative z-10">
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-3 text-white">
              Contact Us
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-xl">
              We'd love to hear from you
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-2xl font-semibold mb-4">
                    Get in Touch
                  </h2>
                  <p className="text-muted-foreground">
                    Have questions about our products or your order? We're here to help!
                  </p>
                </div>

                <div className="space-y-4">
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 border border-primary/20 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="h-12 w-12 rounded-full bg-[#25D366] flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">{siteConfig.contact.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="flex items-center gap-4 p-4 border border-primary/20 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{siteConfig.contact.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-center gap-4 p-4 border border-primary/20 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{siteConfig.contact.email}</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card border border-primary/20 rounded-lg p-6">
                <h2 className="font-heading text-xl font-semibold mb-6">
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send via WhatsApp
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
