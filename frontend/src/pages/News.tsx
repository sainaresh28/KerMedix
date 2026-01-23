import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ExternalLink, Mail, Newspaper } from "lucide-react";

import healthScreenImg from "@/assets/health-screen.jpg";

const News = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubscribe = async () => {
  if (!email || !email.includes("@")) {
    alert("Please enter a valid email");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch("/api/subscribe-newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) throw new Error();

    alert("Subscribed successfully!");
    setEmail("");
  } catch {
    alert("Subscription failed. Try again later.");
  } finally {
    setLoading(false);
  }
};


  const newsArticles = [
    {
      id: 1,
      title: "87.7% of Migrant Workers Unaware of State Health Policies, Study Finds",
      link: "https://www.hindustantimes.com/india-news/study-flags-how-kerala-s-migrant-workers-remain-excluded-from-govt-health-schemes-101758543832317.html",
      featured: true,
      image: healthScreenImg,
    },
    {
      id: 2,
      title: "Kerala CM Inaugurates 'Norka Care' Health Insurance Scheme for Non-Resident Malayalis",
      link: "https://timesofindia.indiatimes.com/business/india-business/kerala-cm-inaugurates-norka-care-a-comprehensive-health-and-accident-insurance-scheme-for-non-resident-malayalis/articleshow/124148777.cms",
    },
    {
      id: 3,
      title: "Migrant Labourers Form Majority of Workforce in Kerala Marine Fisheries Sector",
      link: "https://timesofindia.indiatimes.com/city/kochi/migrant-labourers-form-majority-of-workforce-in-kerala-marine-fisheries-sector-study-finds/articleshow/123551411.cms",
    },
    {
      id: 4,
      title: "Mandatory Health Screening for Migrant Workers in Udupi District",
      link: "https://timesofindia.indiatimes.com/city/mangaluru/mandatory-health-screening-for-migrant-workers-health-dept/articleshow/121322695.cms",
    },
    {
      id: 5,
      title: "Kerala Clinic For Migrant Workers Featured In WHO List",
      link: "https://www.themigrationstory.com/post/kerala-clinic-for-migrant-workers-featured-in-who-list",
    },
    {
      id: 6,
      title: "Kerala Launches AI-Powered Health Dashboard to Track Migrant Worker Health",
      link: "https://www.digitalhealthnews.com/kerala-health-department-implements-ai-tools-for-patient-care-early-diagnosis",
    },
  ];

  const featured = newsArticles.find(n => n.featured);
  const rest = newsArticles.filter(n => !n.featured);

  return (
    <div className="bg-[#F9EFE3] pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-5xl font-extrabold text-black mb-6">
            News & Public Updates
          </h1>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Curated reports and verified media coverage on migrant worker health
          </p>
        </div>

        {/* Featured */}
        {featured && (
          <a href={featured.link} target="_blank" rel="noopener noreferrer">
            <Card className="mb-28 border-2 border-black rounded-[28px] bg-white
              transition-transform hover:-translate-y-1">
              <div className="grid md:grid-cols-2">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-72 md:h-full w-full object-cover rounded-l-[26px]"
                />
                <CardHeader className="p-12">
                  {/* INSIDE DECOR */}
                  <div className="inline-flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 bg-[#402EE6] rounded-sm" />
                    <span className="text-xs tracking-widest uppercase text-black/60">
                      Featured Coverage
                    </span>
                  </div>

                  <CardTitle className="text-3xl font-bold text-black mb-6">
                    {featured.title}
                  </CardTitle>

                  <CardDescription className="text-[#402EE6] flex items-center gap-2">
                    Read full article <ExternalLink className="h-4 w-4" />
                  </CardDescription>
                </CardHeader>
              </div>
            </Card>
          </a>
        )}

        {/* Grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map(article => (
            <a key={article.id} href={article.link} target="_blank" rel="noopener noreferrer">
              <Card
                className="h-full border-2 border-black rounded-[24px] bg-white
                transition-transform hover:-translate-y-1"
              >
                <CardHeader className="p-8">
                  {/* INSIDE DECOR */}
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1
                      text-xs font-medium text-[#402EE6]
                      bg-[#402EE6]/10 rounded-full">
                      <Newspaper className="h-3 w-3" />
                      Public Report
                    </span>
                  </div>

                  <CardTitle className="text-lg font-semibold text-black leading-snug mb-5">
                    {article.title}
                  </CardTitle>

                  <CardDescription className="text-sm text-[#402EE6] flex items-center gap-1">
                    Read article <ExternalLink className="h-3 w-3" />
                  </CardDescription>
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>

        {/* Stay Updated - newsletter */}
        <div className="mt-24 sm:mt-32 lg:mt-36 px-4 sm:px-0">
          <div className="border-2 border-black rounded-[28px] sm:rounded-[36px] bg-[#2717ff] p-8 sm:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">

              {/* Left Content */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 max-w-xl text-center sm:text-left">
                <div className="p-4 border-2 border-white rounded-xl shrink-0">
                  <Newspaper className="h-6 w-6 text-[#eeff01]" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    Stay Updated
                  </h2>
                  <p className="text-sm sm:text-base text-white leading-relaxed">
                    Receive important migrant health policy updates, research insights,
                    and verified news—delivered responsibly.
                  </p>
                </div>
              </div>

              {/* Right Form */}
              <div className="w-full max-w-md">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-11 pr-4 py-3 border-2 border-black rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-[#000003]"
                    />
                  </div>

                  <button
                    onClick={handleSubscribe}
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3 bg-[#ffd900] text-black font-semibold rounded-xl disabled:opacity-60"
                  >
                    {loading ? "…" : "Subscribe"}
                  </button>
                </div>

                <p className="text-xs text-white/90 mt-4 text-center sm:text-left">
                  No spam. Unsubscribe anytime.
                </p>
              </div>

            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default News;
