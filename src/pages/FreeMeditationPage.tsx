// src/pages/FreeMeditationPage.tsx
import React, { useCallback, useEffect, useMemo, useState, Suspense } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import FreeMeditationSelector, { MeditationOption } from "@/components/FreeMeditationSelector";

// Lazy-load the player to keep initial bundle light
const MeditationPlayer = React.lazy(() => import("@/components/MeditationPlayer"));

/**
 * NOTE:
 * - YouTube links are kept as-is (e.g. https://youtu.be/...).
 *   Your MeditationPlayer should detect YouTube vs. MP4 and render an <iframe> for YouTube
 *   and a <video> tag for MP4. (Common approach: `if (videoSrc.includes("youtu")) ...`)
 * - audioSrc is empty for samples; MeditationPlayer should handle that gracefully.
 */

const FreeMeditationPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Sample data (replace with API data when ready)
  const sampleMeditations: MeditationOption[] = useMemo(
    () => [
      {
        id: "1",
        title: "Morning Calm",
        description:
          "Start your day with a peaceful 10-minute meditation to set a positive tone.",
        duration: 600,
        audioSrc: "",
        videoSrc: "https://youtu.be/7EJKDj6ELiM",
      },
      {
        id: "2",
        title: "Stress Relief",
        description:
          "Release tension and find inner peace with this guided meditation.",
        duration: 600,
        audioSrc: "",
        videoSrc:
          "https://assets.mixkit.co/videos/preview/mixkit-white-sand-beach-and-palm-trees-1208-large.mp4",
      },
      {
        id: "3",
        title: "Deep Relaxation",
        description:
          "Unwind and let go of your day with this calming meditation practice.",
        duration: 600,
        audioSrc: "",
        videoSrc:
          "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",
      },
    ],
    []
  );

  const [selectedMeditation, setSelectedMeditation] =
    useState<MeditationOption | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);

  // Open from query param (?m=<id>) for deep links / shareable links
  useEffect(() => {
    const id = searchParams.get("m");
    if (id && !selectedMeditation) {
      const found = sampleMeditations.find((m) => m.id === id);
      if (found) {
        setSelectedMeditation(found);
        setShowPlayer(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, sampleMeditations]);

  const handleSelectMeditation = useCallback(
    (meditation: MeditationOption) => {
      setSelectedMeditation(meditation);
      setShowPlayer(true);
      // update the URL with the selected meditation id
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("m", meditation.id);
        return next;
      });
    },
    [setSearchParams]
  );

  const clearSelection = useCallback(() => {
    setShowPlayer(false);
    setSelectedMeditation(null);
    // remove the query param
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("m");
      return next;
    });
  }, [setSearchParams]);

  const handleMeditationComplete = useCallback(() => {
    clearSelection();
  }, [clearSelection]);

  const handleClosePlayer = useCallback(() => {
    clearSelection();
  }, [clearSelection]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1A14] to-[#132920] text-white flex flex-col items-center justify-center py-8 px-4">
      {/* Header / Intro */}
      <div className="text-center mb-12">
        <h1 className="text-[#7CE0C6] text-xl mb-2">Inner Current</h1>
        <h2 className="text-4xl md:text-5xl font-light mb-4">
          Begin your meditation journey
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto">
          Choose from our selection of free guided meditations to help you relax,
          focus, and find inner peace.
        </p>
      </div>

      {/* Grid of free meditations */}
      <FreeMeditationSelector
        meditations={sampleMeditations}
        onSelect={handleSelectMeditation}
      />

      {/* Player Dialog */}
      <Dialog
        open={showPlayer}
        onOpenChange={(open) => {
          // When dialog closes (Esc or backdrop), clear selection
          if (!open) clearSelection();
          else setShowPlayer(true);
        }}
      >
        <DialogContent className="bg-[#0A1A14] border-[#2E9E83] text-white p-0 max-w-3xl">
          {selectedMeditation && (
            <Suspense
              fallback={
                <div className="p-8 text-center text-gray-300">
                  Loading player…
                </div>
              }
            >
              <MeditationPlayer
                title={selectedMeditation.title}
                description={selectedMeditation.description}
                audioSrc={selectedMeditation.audioSrc}
                videoSrc={selectedMeditation.videoSrc}
                duration={selectedMeditation.duration}
                onComplete={handleMeditationComplete}
                onClose={handleClosePlayer}
              />
            </Suspense>
          )}
        </DialogContent>
      </Dialog>

      {/* Premium CTA */}
      <div className="mt-12 text-center">
        <p className="text-[#7CE0C6]">
          Upgrade to premium for personalized AI-generated meditations
        </p>
        <Button
          onClick={() => navigate("/premium")}
          className="mt-4 bg-[#2E9E83] hover:bg-[#39BF9D]"
        >
          Explore Premium Features
        </Button>
      </div>
    </div>
  );
};

export default FreeMeditationPage;
