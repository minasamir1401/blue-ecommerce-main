import React, { createContext, useContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem("language");
    return savedLang || "ar";
  });

  const [isRTL, setIsRTL] = useState(language === "ar");

  useEffect(() => {
    localStorage.setItem("language", language);
    setIsRTL(language === "ar");
    
    // Update HTML attributes
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

