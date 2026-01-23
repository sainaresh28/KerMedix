import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";



const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setStatus("idle");

  emailjs
    .send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      setStatus("error");
    })
    .finally(() => {
      setLoading(false);
    });
};


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      className="min-h-[85vh] py-20"
      style={{ backgroundColor: "#F9EFE3" }}
    >
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mt-6 mb-14">

          <h1 className="text-4xl font-extrabold text-black mb-3">
            Contact & Support
          </h1>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Official healthcare and technical support assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

         {/* Contact Form */}
        <div className="bg-white rounded-3xl border-2 border-black shadow-[0_24px_60px_rgba(0,0,0,0.18)] overflow-hidden min-h-[550px]">

          {/* Top Dark Strip (from image) */}
          <div className="bg-[#0F1220] px-8 py-6">
            <h2 className="text-lg font-semibold text-white">
              Send a Message
            </h2>
            <div className="mt-2 h-[3px] w-14 rounded-full bg-[#F4C430]" />
          </div>

          {/* Form Body */}
          <div className="p-10">
            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <Label className="text-black font-medium">
                  Full Name *
                </Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="
                    mt-1 h-11 rounded-xl
                    border-black/20
                    focus:border-[#402EE6]
                    focus:ring-[#402EE6]
                  "
                />
              </div>

              <div>
                <Label className="text-black font-medium">
                  Email Address *
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                  className="
                    mt-1 h-11 rounded-xl
                    border-black/20
                    focus:border-[#402EE6]
                    focus:ring-[#402EE6]
                  "
                />
              </div>

              <div>
                <Label className="text-black font-medium">
                  Message *
                </Label>
                <Textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your inquiry or issue"
                  required
                  className="
                    mt-1 rounded-xl
                    border-black/20
                    focus:border-[#402EE6]
                    focus:ring-[#402EE6]
                  "
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="
                  w-full h-12 text-base font-semibold
                  bg-[#3A32FF]
                  hover:bg-[#2c25d4]
                  text-white
                  shadow-md
                  rounded-xl
                  disabled:opacity-60
                "
              >
                {loading ? "Sending..." : "Submit Message"}
              </Button>

              {status === "success" && (
                <p className="text-green-600 font-medium text-sm mt-3">
                  Message sent successfully. We’ll contact you soon.
                </p>
              )}

              {status === "error" && (
                <p className="text-red-600 font-medium text-sm mt-3">
                  Failed to send message. Please try again later.
                </p>
              )}

            </form>
          </div>
        </div>


          {/* Info Panels */}
          <div className="space-y-6">
          <div className="bg-white rounded-2xl border-2 border-black p-6 shadow-md">
            <h3 className="font-semibold text-black mb-4">
              Healthcare Support
            </h3>

            <div className="space-y-4 text-sm">

              {/* Email */}
              <div className="flex items-center gap-3 text-black/70">
                <Mail className="w-4 h-4 text-[#402EE6]" />
                <a
                  href="mailto:dhskerala.hlth@kerala.gov.in?subject=Healthcare%20Support"
                  className="hover:text-[#402EE6] transition-colors font-medium"
                >
                  dhskerala.hlth@kerala.gov.in
                </a>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 text-black/70">
                <MapPin className="w-4 h-4 text-[#fb0505] mt-1" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Directorate+of+Health+Services+Kerala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#402EE6] transition-colors font-medium"
                >
                  Directorate of Health Services, Kerala
                </a>
              </div>

              {/* Hours */}
              <p className="text-black/60">
                <strong className="text-black">Hours:</strong> Mon – Fri, 9:00 AM – 6:00 PM
              </p>

            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-black
 p-6 shadow-md">
            <h3 className="font-semibold text-black mb-4">
              Technical Support
            </h3>

            <div className="space-y-4 text-sm">

              {/* Description */}
              <p className="text-black/70">
                Portal access, login issues, and system-related queries.
              </p>

              {/* Email */}
              <div className="flex items-center gap-3 text-black/70">
                <Mail className="w-4 h-4 text-[#402EE6]" />
                <a
                  href="mailto:kermedix.Dhrms@gmail.com?subject=Technical%20Support"
                  className="hover:text-[#402EE6] transition-colors font-medium"
                >
                  kermedix.Dhrms@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 text-black/70">
                <Phone className="w-4 h-4 text-[#027b2a]" />
                <div className="flex items-center gap-4">
                  <a
                    href="tel:+917848091884"
                    className="hover:text-[#402EE6] transition-colors font-medium"
                  >
                    +91 78480 91884
                  </a>
                  <span className="text-black/40">|</span>
                  <a
                    href="tel:+917847810210"
                    className="hover:text-[#402EE6] transition-colors font-medium"
                  >
                    +91 78478 10210
                  </a>
                </div>
              </div>


              {/* Response */}
              <p className="text-black/60">
                <strong className="text-black">Response:</strong> Within 24 hours
              </p>

            </div>
          </div>

            {/* Emergency Highlight */}
          <div
            className="rounded-2xl p-6 shadow-md"
            style={{ backgroundColor: "#FFCC33" }}
          >
            <h3 className="font-semibold text-black mb-2">
              Medical Emergency
            </h3>

            {/* Working emergency numbers */}
            <p className="font-bold text-black">
              <a href="tel:108" className="text-red-600 hover:underline">
                Ambulance: 108
              </a>
              &nbsp;|&nbsp;
              <a href="tel:100" className="text-red-600 hover:underline">
                Police: 100
              </a>
              &nbsp;|&nbsp;
              <a href="tel:101" className="text-red-600 hover:underline">
                Fire: 101
              </a>
            </p>
          </div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
