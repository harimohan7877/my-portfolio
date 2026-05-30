"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { PortfolioData } from "./types";
import { defaultData } from "./data";

interface DataContextType {
  data: PortfolioData;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
  updateData: (newData: PortfolioData) => void;
  updateSection: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => void;
  resetToDefault: () => void;
  exportData: () => string;
  importData: (json: string) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<"light" | "dark">("light");
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize theme and data on mount
  useEffect(() => {
    try {
      // 1. Initial theme resolution
      const savedTheme = localStorage.getItem("portfolio_theme") as "light" | "dark";
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      const activeTheme = (savedTheme === "light" || savedTheme === "dark") ? savedTheme : systemTheme;
      setThemeState(activeTheme);
      document.body.classList.toggle("dark", activeTheme === "dark");

      // 2. Initial data resolution (migrate from portfolio_data_en if portfolio_data is missing)
      const key = "portfolio_data";
      const fallbackKey = "portfolio_data_en";
      const stored = localStorage.getItem(key) || localStorage.getItem(fallbackKey);

      if (stored) {
        setData({ ...defaultData, ...JSON.parse(stored) });
      } else {
        setData(defaultData);
      }
    } catch {
      setData(defaultData);
    }
    setIsLoaded(true);
  }, []);

  // Save changes to active portfolio data key
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("portfolio_data", JSON.stringify(data));
      } catch {
        // Storage issues
      }
    }
  }, [data, isLoaded]);

  const setTheme = useCallback((newTheme: "light" | "dark") => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("portfolio_theme", newTheme);
      document.body.classList.toggle("dark", newTheme === "dark");
    } catch {
      // Fallback
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  const updateData = useCallback((newData: PortfolioData) => {
    setData(newData);
  }, []);

  const updateSection = useCallback(<K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => {
    setData(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetToDefault = useCallback(() => {
    setData(defaultData);
    try {
      localStorage.removeItem("portfolio_data");
    } catch {
      // Ignore
    }
  }, []);

  const exportData = useCallback(() => {
    return JSON.stringify(data, null, 2);
  }, [data]);

  const importData = useCallback((json: string): boolean => {
    try {
      const parsed = JSON.parse(json) as PortfolioData;
      setData({ ...defaultData, ...parsed });
      return true;
    } catch {
      return false;
    }
  }, []);

  return (
    <DataContext.Provider value={{ data, theme, setTheme, toggleTheme, updateData, updateSection, resetToDefault, exportData, importData }}>
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
