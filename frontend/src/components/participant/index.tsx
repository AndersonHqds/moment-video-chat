import { useEffect, useRef, useState } from "react";
import { MdVideocam, MdVideocamOff, MdMic, MdMicOff } from "react-icons/md";

import {
  ToolBar,
  Video,
  VideoTurnedOff,
  VideoCard,
  FirstNameChar,
  IconButton,
} from "./styled";
import { IProps } from "./types";
import { useTrack } from "../../hooks/useTrack";

const ParticipantCard = ({ participant, isLocal, width, height }: IProps) => {
  const [opacity, setOpacity] = useState("0");
  const {
    audioTracks,
    isRemoteCameraOn,
    isRemoteMicOn,
    videoTracks,
  } = useTrack(participant);

  const [
    isRemoteCameraDisabledFromLocal,
    setIsRemoteCameraDisabledFromLocal,
  ] = useState(false);
  const [
    isRemoteMicDisabledFromLocal,
    setIsRemoteMicDisabledFromLocal,
  ] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const showBar = () => {
    if (!isLocal) setOpacity("0.7");
  };

  const hideBar = () => {
    if (!isLocal) setOpacity("0");
  };

  const toggleLocalCamera = () => {
    if (isRemoteCameraOn) {
      videoTracks[0].mediaStreamTrack.enabled = isRemoteCameraDisabledFromLocal;
      setIsRemoteCameraDisabledFromLocal(!isRemoteCameraDisabledFromLocal);
    }
  };

  const toggleLocalMic = () => {
    if (isRemoteMicOn) {
      console.log(!isMicOn());
      setIsRemoteMicDisabledFromLocal(isMicOn());
    }
  };

  const isMicOn = () => isRemoteMicOn && !isRemoteMicDisabledFromLocal;
  const isCameraOn = () => isRemoteCameraOn && !isRemoteCameraDisabledFromLocal;

  useEffect(() => {
    const videoTrack = videoTracks[0];
    const audioTrack = audioTracks[0];
    if (videoTrack?.attach && videoRef.current) {
      videoTrack.attach(videoRef.current);
    }

    if (audioTrack?.attach && audioRef.current) {
      audioTrack.attach(audioRef.current);
    }

    return () => {
      if (videoTrack?.detach && audioTrack?.detach) {
        videoTrack?.detach();
        audioTrack?.detach();
      }
    };
  }, [videoTracks, audioTracks]);

  return (
    <VideoCard
      width={width}
      height={height}
      onMouseOut={hideBar}
      onMouseOver={showBar}
    >
      {!isLocal && (
        <ToolBar top opacity={opacity}>
          <FirstNameChar>
            {participant.identity.charAt(0).toUpperCase()}
          </FirstNameChar>
          <span>{participant.identity.toUpperCase()}</span>
        </ToolBar>
      )}
      {isRemoteCameraOn ? (
        <Video ref={videoRef} autoPlay />
      ) : (
        <VideoTurnedOff />
      )}
      <audio ref={audioRef} autoPlay muted={isRemoteMicDisabledFromLocal} />
      {!isLocal && (
        <ToolBar opacity={opacity} justifyCenter>
          <IconButton onClick={toggleLocalMic} isActive={isMicOn()}>
            {isMicOn() ? <MdMic /> : <MdMicOff />}
          </IconButton>
          <IconButton onClick={toggleLocalCamera} isActive={isCameraOn()}>
            {isCameraOn() ? <MdVideocam /> : <MdVideocamOff />}
          </IconButton>
        </ToolBar>
      )}
    </VideoCard>
  );
};
export default ParticipantCard;
