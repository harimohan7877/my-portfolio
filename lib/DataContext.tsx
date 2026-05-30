"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { PortfolioData } from "./types";
import { defaultData, defaultDataHI } from "./data";

interface DataContextType {
  data: PortfolioData;
  language: "en" | "hi";
  setLanguage: (lang: "en" | "hi") => void;
  updateData: (newData: PortfolioData) => void;
  updateSection: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => void;
  resetToDefault: () => void;
  exportData: () => string;
  importData: (json: string) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<"en" | "hi">("en");
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize language and data on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("portfolio_lang") as "en" | "hi";
      const activeLang = (savedLang === "hi" || savedLang === "en") ? savedLang : "en";
      setLanguageState(activeLang);

      const key = `portfolio_data_${activeLang}`;
      const defaults = activeLang === "en" ? defaultData : defaultDataHI;
      const stored = localStorage.getItem(key);

      if (stored) {
        setData({ ...defaults, ...JSON.parse(stored) });
      } else {
        setData(defaults);
      }
    } catch {
      setData(defaultData);
    }
    setIsLoaded(true);
  }, []);

  // Save changes to the active language storage key
  useEffect(() => {
    if (isLoaded) {
      const key = `portfolio_data_${language}`;
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch {
        // Storage issues
      }
    }
  }, [data, language, isLoaded]);

  const setLanguage = useCallback((lang: "en" | "hi") => {
    setLanguageState(lang);
    try {
      localStorage.setItem("portfolio_lang", lang);
      const key = `portfolio_data_${lang}`;
      const defaults = lang === "en" ? defaultData : defaultDataHI;
      const stored = localStorage.getItem(key);
      if (stored) {
        setData({ ...defaults, ...JSON.parse(stored) });
      } else {
        setData(defaults);
      }
    } catch {
      // Fallback
    }
  }, []);

  const updateData = useCallback((newData: PortfolioData) => {
    setData(newData);
  }, []);

  const updateSection = useCallback(<K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => {
    setData(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetToDefault = useCallback(() => {
    const defaults = language === "en" ? defaultData : defaultDataHI;
    setData(defaults);
    try {
      localStorage.removeItem(`portfolio_data_${language}`);
    } catch {
      // Ignore
    }
  }, [language]);

  const exportData = useCallback(() => {
    return JSON.stringify(data, null, 2);
  }, [data]);

  const importData = useCallback((json: string): boolean => {
    try {
      const parsed = JSON.parse(json) as PortfolioData;
      const defaults = language === "en" ? defaultData : defaultDataHI;
      setData({ ...defaults, ...parsed });
      return true;
    } catch {
      return false;
    }
  }, [language]);

  return (
    <DataContext.Provider value={{ data, language, setLanguage, updateData, updateSection, resetToDefault, exportData, importData }}>
      {children}
    </DataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("usePortfolioData must be used within a DataProvider");
  }
  return context;
}
