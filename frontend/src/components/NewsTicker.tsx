import React from "react";

const newsItems = [
  { title: "87.7% of Migrant Workers Unaware of State Health Policies, Study Finds", link: "https://www.hindustantimes.com/india-news/study-flags-how-kerala-s-migrant-workers-remain-excluded-from-govt-health-schemes-101758543832317.html" },
  { title: "Kerala CM Inaugurates 'Norka Care' Health Insurance Scheme for Non-Resident Malayalis", link: "https://timesofindia.indiatimes.com/business/india-business/kerala-cm-inaugurates-norka-care-a-comprehensive-health-and-accident-insurance-scheme-for-non-resident-malayalis/articleshow/124148777.cms" },
  { title: "Migrant Labourers Form Majority of Workforce in Kerala Marine Fisheries Sector", link: "https://timesofindia.indiatimes.com/city/kochi/migrant-labourers-form-majority-of-workforce-in-kerala-marine-fisheries-sector-study-finds/articleshow/123551411.cms" },
  { title: "Mandatory Health Screening for Migrant Workers in Udupi District", link: "https://timesofindia.indiatimes.com/city/mangaluru/mandatory-health-screening-for-migrant-workers-health-dept/articleshow/121322695.cms" },
  { title: "Kerala Clinic For Migrant Workers Featured In WHO List", link: "https://www.themigrationstory.com/post/kerala-clinic-for-migrant-workers-featured-in-who-list" },
  { title: "Kerala Launches AI-Powered Health Dashboard to Track Migrant Worker Health", link: "https://www.digitalhealthnews.com/kerala-health-department-implements-ai-tools-for-patient-care-early-diagnosis" },
  { title: "Only 9.8% of migrant workers in Kerala have health coverage", link: "https://www.newindianexpress.com/states/kerala/2025/Sep/26/only-98-of-migrant-workers-in-kerala-have-health-coverage-finds-mahatma-gandhi-university-study" },
  { title: "migrant Workers in Kerala prefer Modern Medicine", link: "https://timesofindia.indiatimes.com/city/kochi/migrant-workers-in-kerala-prefer-modern-medicine/articleshow/121719130.cms" },
];

const NewsTicker: React.FC = () => {
  return (
    <div className="relative bg-gray-900 text-white py-2">
      {/* Gradient fade left */}
      <div className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
      {/* Gradient fade right */}
      <div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

      <div className="max-w-7xl mx-auto flex items-center px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Latest News Badge */}
        <span className="bg-red-600 text-white font-semibold px-3 py-1 rounded-md mr-4 text-sm flex-shrink-0">
          Latest News
        </span>

        {/* Scrolling News */}
        <div className="overflow-hidden whitespace-nowrap flex-1">
          <div className="animate-marquee-news inline-flex space-x-8">
            {[...newsItems, ...newsItems].map((news, index) => (
              <a
                key={index}
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-gray-100 text-sm sm:text-base"
              >
                {news.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
