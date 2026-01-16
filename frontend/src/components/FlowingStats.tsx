import FlowingMenu from "./FlowingMenu";
import feature from "@/assets/features-background.jpg";
import Records from "@/assets/digital-records.jpg";

const statsItems = [
  { link: "#", text: "50,000+ Active Profiles", image: Records },
  { link: "#", text: "200,000+ Health Records", image: feature },
  { link: "#", text: "150+ Healthcare Facilities", image: "/images/hc3.png" },
  { link: "#", text: "24/7 Real-time Updates", image: "/images/facility2.png" },
];

export default function FlowingStats() {
  return (
    <section
      style={{
        backgroundColor: "#F9EFE3",
        paddingTop: "32px",
        paddingBottom: "32px",
      }}
    >
      <div
        style={{
          height: "520px",
          position: "relative",
        }}
      >
        <FlowingMenu
          items={statsItems}
          bgColor="#F9EFE3"
          textColor="#402EE6"
          marqueeBgColor="#402EE6"
          marqueeTextColor="#FFCC33"
          borderColor="#402EE6"
          speed={15}
        />
      </div>
    </section>
  );
}
