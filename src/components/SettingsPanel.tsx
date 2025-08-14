import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { defaultVoices } from "@/utils/elevenlabs";
import { useSettings } from "@/contexts/SettingsContext";
import {
  Settings as SettingsIcon,
  VolumeX,
  Eye,
  EyeOff,
} from "lucide-react";

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel = ({ onClose }: SettingsPanelProps) => {
  const {
    elevenLabsApiKey,
    setElevenLabsApiKey,
    selectedVoice,
    setSelectedVoice,
    narrationEnabled,
    setNarrationEnabled,
  } = useSettings();

  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <Card className="bg-[#132920] border-[#2E9E83]">
      <CardHeader className="pb-2">
        <CardTitle className="text-[#7CE0C6] text-lg flex items-center justify-between">
          <span>Settings</span>
          <SettingsIcon className="text-[#2E9E83]" size={18} />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* API Key */}
          <div className="space-y-2">
            <label htmlFor="api-key" className="text-sm text-gray-300">
              ElevenLabs API Key
            </label>
            <div className="relative">
              <Input
                id="api-key"
                type={showApiKey ? "text" : "password"}
                value={elevenLabsApiKey}
                onChange={(e) => setElevenLabsApiKey(e.target.value)}
                placeholder="Enter your ElevenLabs API key"
                className="bg-[#143024] border-[#2E9E83] text-white placeholder:text-gray-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowApiKey((prev) => !prev)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-white"
                aria-label={showApiKey ? "Hide API key" : "Show API key"}
              >
                {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-xs text-gray-400">
              Required for voice narration. Get your key at{" "}
              <a
                href="https://elevenlabs.io/app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7CE0C6] ml-1 underline"
              >
                elevenlabs.io
              </a>
            </p>
          </div>

          {/* Voice Selection */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Narration Voice</label>
            <Select
              value={selectedVoice.id}
              onValueChange={(value) => {
                const selected = defaultVoices.find((v) => v.id === value);
                if (selected) setSelectedVoice(selected);
              }}
              disabled={!elevenLabsApiKey}
            >
              <SelectTrigger className="bg-[#143024] border-[#2E9E83] text-white">
                <SelectValue
                  placeholder={
                    elevenLabsApiKey
                      ? "Select a voice"
                      : "Enter API key to unlock voices"
                  }
                />
              </SelectTrigger>
              <SelectContent className="bg-[#143024] border-[#2E9E83] text-white">
                {defaultVoices.map((voice) => (
                  <SelectItem key={voice.id} value={voice.id}>
                    {voice.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Narration Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {narrationEnabled ? (
                <SettingsIcon className="text-[#7CE0C6]" size={16} />
              ) : (
                <VolumeX className="text-gray-400" size={16} />
              )}
              <span className="text-sm text-gray-300">
                Enable Voice Narration
              </span>
            </div>
            <Switch
              checked={narrationEnabled}
              onCheckedChange={setNarrationEnabled}
              disabled={!elevenLabsApiKey}
              className="data-[state=checked]:bg-[#2E9E83]"
            />
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            className="w-full mt-4 bg-[#2E9E83] hover:bg-[#39BF9D] text-white"
          >
            Save & Close
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsPanel;
