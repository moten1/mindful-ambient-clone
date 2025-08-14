import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Brain, Sparkles, Settings, Play } from "lucide-react";
import { toast } from "@/hooks/use-toast";

import FaceAnalysisPanel from "@/components/FaceAnalysisPanel";
import VoiceAnalysisPanel from "@/components/VoiceAnalysisPanel";
import WearableDevicePanel from "@/components/WearableDevicePanel";
import AIInsightsPanel from "@/components/AIInsightsPanel";
import MeditationPlayer from "@/components/MeditationPlayer";

import { useEnhancedFaceAnalysis } from "@/hooks/useEnhancedFaceAnalysis";
import { useEnhancedVoiceAnalysis } from "@/hooks/useEnhancedVoiceAnalysis";
import { useWearableDevice } from "@/hooks/useWearableDevice";
import { useRealBiometrics } from "@/hooks/useRealBiometrics";

import { MeditationScript } from "@/types/meditation";
import { meditationScripts } from "@/data/meditationScripts";

// More explicit type for AI Insights result
interface AIInsightsResult {
  insights: string[];
  adaptationScore: number;
  recommendation: string;
  environmentSettings: {
    sound: number;
    temperature: number;
    brightness: number;
    vibration?: number;
    light?: number;
  };
}

const PremiumDashboard: React.FC = () => {
  const [isAnalysisActive, setIsAnalysisActive] = useState(false);
  const [selectedMeditation, setSelectedMeditation] = useState<MeditationScript | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [adaptationScore, setAdaptationScore] = useState<number>(75);
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [sessionRecommendation, setSessionRecommendation] = useState<string>("");
  const [environmentSettings, setEnvironmentSettings] = useState<AIInsightsResult["environmentSettings"]>({
    sound: 50,
    temperature: 50,
    brightness: 50,
    vibration: 50,
    light: 50,
  });

  const faceAnalysis = useEnhancedFaceAnalysis(isAnalysisActive);
  const voiceAnalysis = useEnhancedVoiceAnalysis(isAnalysisActive);
  const wearableDevice = useWearableDevice();
  const { generateAIInsights, isProcessing } = useRealBiometrics();

  // Derived recommended meditation
  const recommendedMeditation = useMemo(() => {
    if (faceAnalysis.metrics.emotion === "stressed" || voiceAnalysis.metrics.tone === "stressed") {
      return meditationScripts.find((m) => m.energyType === "calming");
    }
    if (faceAnalysis.metrics.attentionLevel < 60) {
      return meditationScripts.find((m) => m.energyType === "focusing");
    }
    if (wearableDevice.metrics.energyLevel === "low") {
      return meditationScripts.find((m) => m.energyType === "energizing");
    }
    return meditationScripts.find((m) => m.energyType === "balancing");
  }, [faceAnalysis.metrics, voiceAnalysis.metrics, wearableDevice.metrics]);

  // Permission request flow
  const requestPermissions = useCallback(async () => {
    let cameraGranted = faceAnalysis.isPermissionGranted;
    let micGranted = voiceAnalysis.isPermissionGranted;

    if (!cameraGranted) {
      try {
        cameraGranted = await faceAnalysis.requestPermission();
        if (!cameraGranted) {
          toast({
            title: "Camera Permission Required",
            description: "Enable camera access for AI-powered face analysis",
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error("Camera permission error:", err);
      }
    }

    if (!micGranted) {
      try {
        micGranted = await voiceAnalysis.requestPermission();
        if (!micGranted) {
          toast({
            title: "Microphone Permission Required",
            description: "Enable microphone access for AI-powered voice analysis",
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error("Microphone permission error:", err);
      }
    }

    return cameraGranted && micGranted;
  }, [faceAnalysis, voiceAnalysis]);

  const handleStartAnalysis = useCallback(async () => {
    console.log("Starting AI Analysis...");
    const permissionsOk = await requestPermissions();
    if (!permissionsOk) return;

    setIsAnalysisActive(true);

    if (!faceAnalysis.isAnalyzing) faceAnalysis.startAnalyzing();
    if (!voiceAnalysis.isListening) voiceAnalysis.startListening();

    toast({
      title: "AI Analysis Started",
      description: "Enhanced biometric monitoring active",
    });
  }, [requestPermissions, faceAnalysis, voiceAnalysis]);

  const handleStopAnalysis = useCallback(() => {
    console.log("Stopping AI Analysis...");
    setIsAnalysisActive(false);

    if (faceAnalysis.isAnalyzing) faceAnalysis.stopAnalyzing();
    if (voiceAnalysis.isListening) voiceAnalysis.stopListening();

    toast({
      title: "AI Analysis Stopped",
      description: "Biometric monitoring paused",
    });
  }, [faceAnalysis, voiceAnalysis]);

  const handleApplyRecommendation = useCallback(() => {
    console.log("Applying AI recommendation:", environmentSettings);
    toast({
      title: "Environment Adapted",
      description: "Settings optimized using real-time AI insights",
    });
  }, [environmentSettings]);

  const handleStartMeditation = useCallback((meditation: MeditationScript) => {
    console.log("Starting meditation:", meditation.title);
    setSelectedMeditation(meditation);
    setShowPlayer(true);
  }, []);

  const handleMeditationComplete = useCallback(() => {
    setShowPlayer(false);
    setSelectedMeditation(null);
    toast({
      title: "Session Complete",
      description: "Your meditation session is finished.",
    });
  }, []);

  // AI Insights polling
  useEffect(() => {
    if (!isAnalysisActive) return;

    const fetchInsights = async () => {
      try {
        const biometricData = {
          face: faceAnalysis.metrics,
          voice: voiceAnalysis.metrics,
          wearable: wearableDevice.metrics,
        };

        const result: AIInsightsResult | null = await generateAIInsights(biometricData);
        if (result) {
          setAiInsights(result.insights || []);
          setAdaptationScore(result.adaptationScore ?? 75);
          setSessionRecommendation(result.recommendation ?? "");
          setEnvironmentSettings(result.environmentSettings ?? environmentSettings);
        }
      } catch (err) {
        console.error("Error generating AI insights:", err);
      }
    };

    fetchInsights();
    const interval = setInterval(fetchInsights, 10000);
    return () => clearInterval(interval);
  }, [
    isAnalysisActive,
    faceAnalysis.metrics,
    voiceAnalysis.metrics,
    wearableDevice.metrics,
    generateAIInsights,
    environmentSettings,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1A14] to-[#132920] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-[#7CE0C6] text-xl mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6" />
            Inner Current Premium - AI Enhanced
          </h1>
          <h2 className="text-4xl md:text-5xl font-light mb-4">Real-Time AI Biometric Analysis</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Advanced biometric monitoring with AI processing, open-source LLMs, and adaptive environment controls.
          </p>
        </div>

        {/* Control Panel */}
        <div className="mb-8 flex justify-center gap-4">
          <Button
            onClick={isAnalysisActive ? handleStopAnalysis : handleStartAnalysis}
            disabled={isProcessing}
            className={`${
              isAnalysisActive ? "bg-red-600 hover:bg-red-700" : "bg-[#2E9E83] hover:bg-[#39BF9D]"
            } flex items-center gap-2`}
          >
            <Brain className="w-4 h-4" />
            {isProcessing ? "Processing..." : isAnalysisActive ? "Stop AI Analysis" : "Start AI Analysis"}
          </Button>
          <Button variant="outline" className="border-[#2E9E83] text-[#7CE0C6] hover:bg-[#143024]">
            <Settings className="w-4 h-4 mr-2" />
            AI Settings
          </Button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <FaceAnalysisPanel {...faceAnalysis} />
          <VoiceAnalysisPanel {...voiceAnalysis} />
          <WearableDevicePanel {...wearableDevice} />
          <div className="xl:col-span-3">
            <AIInsightsPanel
              insights={aiInsights}
              adaptationScore={adaptationScore}
              sessionRecommendation={sessionRecommendation}
              onApplyRecommendation={handleApplyRecommendation}
              isActive={isAnalysisActive}
              recommendedMeditation={recommendedMeditation}
              onStartMeditation={handleStartMeditation}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-[#132920] border-[#2E9E83]">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#7CE0C6] text-sm">Real-Time Environment</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(environmentSettings).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-gray-300 capitalize">{key}</span>
                  <span className="text-white">{value}%</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-[#132920] border-[#2E9E83]">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#7CE0C6] text-sm">AI Session Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">AI Insights</span>
                  <span className="text-white">{aiInsights.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Adaptation Score</span>
                  <span className="text-white">{adaptationScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Processing</span>
                  <span className="text-white">{isProcessing ? "Active" : "Ready"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#132920] border-[#2E9E83]">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#7CE0C6] text-sm">AI Quick Start</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => recommendedMeditation && handleStartMeditation(recommendedMeditation)}
                className="w-full bg-[#2E9E83] hover:bg-[#39BF9D] flex items-center gap-2"
                disabled={isProcessing}
              >
                <Play className="w-4 h-4" />
                Start AI Session
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Meditation Player */}
        <Dialog open={showPlayer} onOpenChange={setShowPlayer}>
          <DialogContent className="bg-[#0A1A14] border-[#2E9E83] text-white p-0 max-w-4xl">
            <DialogTitle className="sr-only">
              {selectedMeditation ? `Playing ${selectedMeditation.title}` : "AI-Enhanced Meditation Player"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              AI-powered meditation session with biometric monitoring
            </DialogDescription>
            {selectedMeditation && (
              <MeditationPlayer
                meditation={selectedMeditation}
                onComplete={handleMeditationComplete}
                onClose={() => setShowPlayer(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PremiumDashboard;
