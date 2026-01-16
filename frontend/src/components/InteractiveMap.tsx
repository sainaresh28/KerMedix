import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users, Building } from 'lucide-react';
import KeralaDistrictMap from '@/assets/Kerala-district-Map.png'; 
const InteractiveMap = () => {
  const visibleElements = useScrollAnimation();
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const districts = [
    { name: 'Thiruvananthapuram', workers: 2340, clinics: 45 },
    { name: 'Kollam', workers: 1980, clinics: 39 },
    { name: 'Pathanamthitta', workers: 1750, clinics: 30 },
    { name: 'Alappuzha', workers: 2100, clinics: 41 },
    { name: 'Kottayam', workers: 1890, clinics: 34 },
    { name: 'Idukki', workers: 1420, clinics: 22 },
    { name: 'Ernakulam', workers: 4521, clinics: 78 },
    { name: 'Thrissur', workers: 3250, clinics: 56 },
    { name: 'Palakkad', workers: 2980, clinics: 47 },
    { name: 'Malappuram', workers: 3100, clinics: 52 },
    { name: 'Kozhikode', workers: 3210, clinics: 56 },
    { name: 'Wayanad', workers: 1200, clinics: 18 },
    { name: 'Kannur', workers: 2550, clinics: 43 },
    { name: 'Kasaragod', workers: 1780, clinics: 29 },
  ];

  return (
    <section className="relative py-20 overflow-hidden" style={{ backgroundColor: "#F9EFE3" }} >

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 fade-in-up ${
            visibleElements.has('map-header') ? 'visible' : ''
          }`}
          data-animate="map-header"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Statewide Coverage
          </h2>
          <p className="text-lg text-muted-foreground">
            Our network spans across Kerala, serving workers and healthcare providers
          </p>
        </div>

        {/* Map and Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Kerala Map */}
          <div
            className={`slide-in-left ${
              visibleElements.has('map-visual') ? 'visible' : ''
            }`}
            data-animate="map-visual"
          >
            <div className="relative bg-secondary rounded-lg overflow-hidden shadow-md flex justify-center items-center h-[450px] w-[400px]">
              <img
                src={KeralaDistrictMap}
                alt="Kerala District Map"
                className="w-full h-full object-contain md:object-scale-down"
              />
            </div>
          </div>

          {/* Right: District Stats */}
          <div
            className={`slide-in-right ${
              visibleElements.has('map-stats') ? 'visible' : ''
            }`}
            data-animate="map-stats"
          >
            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
              {districts.map((district) => (
                <Card
                  key={district.name}
                  className={`cursor-pointer transition-all duration-300 hover-lift ${
                    selectedDistrict === district.name ? 'border-foreground' : ''
                  }`}
                  onClick={() =>
                    setSelectedDistrict(
                      selectedDistrict === district.name ? null : district.name
                    )
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="text-foreground" size={20} />
                        <span className="font-semibold text-foreground">
                          {district.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users size={16} />
                          <span>{district.workers}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Building size={16} />
                          <span>{district.clinics}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
