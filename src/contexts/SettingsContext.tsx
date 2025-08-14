import React, { createContext, useContext } from "react";
import { defaultVoice, ElevenLabsVoice } from "@/utils/elevenlabs";

// ---- Persistent State Hook ----
function usePersistentState<T>(key: string, defaultValue: T) {
  const [value, setValue] = React.useState<T>(defaultValue);

  // Load from localStorage after mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        setValue(JSON.parse(stored));
      }
    } catch {
      console.warn(`Error reading ${key} from localStorage`);
    }
  }, [key]);

  // Save to localStorage when value changes
  React.useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.warn(`Error writing ${key} to localStorage`);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

// ---- Types ----
interface SettingsContextType {
  elevenLabsApiKey: string;
  setElevenLabsApiKey: (key: string) => void;
  selectedVoice: ElevenLabsVoice;
  setSelectedVoice: (voice: ElevenLabsVoice) => void;
  narrationEnabled: boolean;
  setNarrationEnabled: (enabled: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

// ---- Provider ----
export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [elevenLabsApiKey, setElevenLabsApiKey] = usePersistentState<string>(
    "elevenlabs-api-key",
    ""
  );
  const [selectedVoice, setSelectedVoice] = usePersistentState<ElevenLabsVoice>(
    "elevenlabs-voice",
    defaultVoice
  );
  const [narrationEnabled, setNarrationEnabled] = usePersistentState<boolean>(
    "narration-enabled",
    true
  );

  return (
    <SettingsContext.Provider
      value={{
        elevenLabsApiKey,
        setElevenLabsApiKey,
        selectedVoice,
        setSelectedVoice,
        narrationEnabled,
        setNarrationEnabled,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// ---- Hook ----
export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
