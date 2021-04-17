import { useState } from "react";
import { LocalParticipant } from "twilio-video";

interface ToggleVideoParams {
  localParticipant: LocalParticipant | undefined;
}

const useVideo = (): {
  isCameraOn: boolean;
  toggleVideo: (data: ToggleVideoParams) => void;
} => {
  const [isCameraOn, setIsCameraOn] = useState(false);

  const toggleVideo = ({ localParticipant }: ToggleVideoParams) => {
    if (!localParticipant) return;
    const track = [...localParticipant?.videoTracks.values()][0].track;
    if (isCameraOn && localParticipant) {
      track.stop();
      track.disable();
    } else {
      track.restart();
      track.enable();
    }

    setIsCameraOn(!isCameraOn);
  };

  return { isCameraOn, toggleVideo };
};

export { useVideo };
