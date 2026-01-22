import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Building } from "lucide-react";
import KeralaDistrictMap from "@/assets/keralam3.png";

const InteractiveMap = () => {
  const visibleElements = useScrollAnimation();
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const districts = [
    { name: "Thiruvananthapuram", workers: 2340, clinics: 45 },
    { name: "Kollam", workers: 1980, clinics: 39 },
    { name: "Pathanamthitta", workers: 1750, clinics: 30 },
    { name: "Alappuzha", workers: 2100, clinics: 41 },
    { name: "Kottayam", workers: 1890, clinics: 34 },
    { name: "Idukki", workers: 1420, clinics: 22 },
    { name: "Ernakulam", workers: 4521, clinics: 78 },
    { name: "Thrissur", workers: 3250, clinics: 56 },
    { name: "Palakkad", workers: 2980, clinics: 47 },
    { name: "Malappuram", workers: 3100, clinics: 52 },
    { name: "Kozhikode", workers: 3210, clinics: 56 },
    { name: "Wayanad", workers: 1200, clinics: 18 },
    { name: "Kannur", workers: 2550, clinics: 43 },
    { name: "Kasaragod", workers: 1780, clinics: 29 },
  ];

  return (
    <section
      className="
        relative py-20
        overflow-visible
        md:overflow-hidden
      "
      style={{ backgroundColor: "#F9EFE3" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 fade-in-up ${
            visibleElements.has("map-header") ? "visible" : ""
          }`}
          data-animate="map-header"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Statewide Coverage
          </h2>
          <p className="text-lg text-muted-foreground">
            Our network spans across Kerala
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          
          {/* Map */}
          <div
            className={`slide-in-left flex justify-center ${
              visibleElements.has("map-visual") ? "visible" : ""
            }`}
            data-animate="map-visual"
          >
              <div
                className="
                  relative
                  rounded-lg
                  overflow-hidden
                  flex items-center justify-center
                  h-[450px]
                  w-[400px]
                  max-w-full
                "
              >

              <img
                src={KeralaDistrictMap}
                alt="Kerala District Map"
                className="
                  w-full
                  h-full
                  object-contain
                  transition-transform
                  duration-500
                  hover:scale-[1.02]
                "
              />
            </div>
          </div>


            {/* District List */}
            <div
              className={`slide-in-right ${
                visibleElements.has("map-stats") ? "visible" : ""
              }`}
              data-animate="map-stats"
            >
             
              <style>
                {`
                  .district-scroll::-webkit-scrollbar {
                    width: 8px;
                  }

                  .district-scroll::-webkit-scrollbar-track {
                    background: #ffcc33;
                    border-radius: 10px;
                  }

                  .district-scroll::-webkit-scrollbar-thumb {
                    background: #402ee6;
                    border-radius: 10px;
                    border: 2px solid #ffcc33;
                  }

                  .district-scroll::-webkit-scrollbar-thumb:hover {
                    background: #2f20c9;
                  }

                  /* Firefox */
                  .district-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: #402ee6 #ffcc33;
                  }
                `}
              </style>

              <div
                className="
                  district-scroll
                  space-y-4
                  max-h-[320px] md:max-h-[450px]
                  overflow-y-auto
                  pr-2
                  touch-pan-y
                  [-webkit-overflow-scrolling:touch]
                "
              >
                {districts.map((district) => {
                  const active = selectedDistrict === district.name;

                  return (
                    <Card
                      key={district.name}
                      onClick={() =>
                        setSelectedDistrict(active ? null : district.name)
                      }
                      className={`
                        cursor-pointer
                        transition-all
                        duration-300
                        bg-[#334cf4]
                        border border-[#402EE6]
                        text-[#F9EFE3]
                        hover:brightness-110
                        hover:scale-[1.01]
                        hover:shadow-[0_12px_30px_rgba(64,46,230,0.45)]
                        active:scale-[0.97]
                        ${
                          active
                            ? "ring-2 ring-[#FFCC33] shadow-[0_0_0_6px_rgba(255,204,51,0.25)]"
                            : ""
                        }
                      `}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">

                          {/* District name */}
                          <div className="flex items-center gap-3">
                            <MapPin size={18} className="text-[#FFCC33]" />
                            <span className="font-semibold">
                              {district.name}
                            </span>
                          </div>

                          {/* Stats */}
                          <div className="flex gap-4 text-sm text-[#F9EFE3]/85">
                            <div className="flex items-center gap-1">
                              <Users size={14} className="text-[#F9EFE3]" />
                              {district.workers}
                            </div>
                            <div className="flex items-center gap-1">
                              <Building size={14} className="text-[#F9EFE3]" />
                              {district.clinics}
                            </div>
                          </div>

                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
