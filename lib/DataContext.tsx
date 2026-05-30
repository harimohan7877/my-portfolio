"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { PortfolioData } from "./types";
import { defaultData } from "./data";

interface DataContextType {
  data: PortfolioData;
  updateData: (newData: PortfolioData) => void;
  updateSection: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => void;
  resetToDefault: () => void;
  exportData: () => string;
  importData: (json: string) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY = "portfolio_data";

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as PortfolioData;
        setData({ ...defaultData, ...parsed });
      }
    } catch {
      // If localStorage fails, use defaults
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        // Storage full or unavailable
      }
    }
  }, [data, isLoaded]);

  const updateData = useCallback((newData: PortfolioData) => {
    setData(newData);
  }, []);

  const updateSection = useCallback(<K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => {
    setData(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetToDefault = useCallback(() => {
    setData(defaultData);
    localStorage.removeItem(STORAGE_KEY);
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
    <DataContext.Provider value={{ data, updateData, updateSection, resetToDefault, exportData, importData }}>
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
