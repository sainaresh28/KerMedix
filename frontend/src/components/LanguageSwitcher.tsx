import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", name: "English", native: "English", symbol: "E" },
  { code: "ml", name: "Malayalam", native: "മലയാളം", symbol: "മ" },
  { code: "hi", name: "Hindi", native: "हिन्दी", symbol: "ह" },
  { code: "te", name: "Telugu", native: "తెలుగు", symbol: "తె" },
  { code: "or", name: "Odia", native: "ଓଡ଼ିଆ", symbol: "ଓ" },
  { code: "bn", name: "Bengali", native: "বাংলা", symbol: "বা" },
];

const LanguageDropdown = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem("lang", langCode);
  };

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border border-primary/30 bg-background/80 backdrop-blur-md shadow-md hover:shadow-primary/30 transition-all duration-300 gap-2"
        >
          <Globe className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">{currentLanguage.native}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="p-4 w-[260px] sm:w-[280px] rounded-2xl border border-primary/20 bg-background/95 backdrop-blur-lg shadow-2xl"
      >
        <p className="text-center text-xs font-semibold text-muted-foreground mb-3">
          Select a Language
        </p>

        <div className="grid grid-cols-3 gap-3">
          {languages.map((lang) => {
            const isActive = i18n.language === lang.code;
            return (
              <motion.button
                key={lang.code}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex flex-col items-center justify-center gap-1 w-20 h-20 rounded-full border-2 transition-all ${
                  isActive
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-gray-300 hover:border-primary/50"
                }`}
              >
                <span className="text-xl font-bold">{lang.symbol}</span>
                <div className="flex flex-col items-center leading-tight">
                  <span className="text-xs font-medium">{lang.native}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {lang.name}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageDropdown;
