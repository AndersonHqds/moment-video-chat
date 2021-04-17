import { useState } from "react";
import { LocalParticipant } from "twilio-video";

interface ToggleAudioParams {
  localParticipant: LocalParticipant | undefined;
}

const useAudio = (): {
  isMicOn: boolean;
  toggleAudio: (data: ToggleAudioParams) => void;
} => {
  const [isMicOn, setIsMicOn] = useState(false);

  const toggleAudio = ({ localParticipant }: ToggleAudioParams) => {
    if (!localParticipant) return;
    const track = [...localParticipant?.audioTracks.values()][0].track;
    if (isMicOn && localParticipant) {
      track.stop();
      track.disable();
    } else {
      track.restart();
      track.enable();
    }

    setIsMicOn(!isMicOn);
  };

  return { isMicOn, toggleAudio };
};

export { useAudio };
