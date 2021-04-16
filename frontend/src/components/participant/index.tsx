import { useEffect, useRef, useState, useCallback } from "react";
import {
  VideoTrackPublication,
  AudioTrackPublication,
  RemoteTrackPublication,
  Track,
  VideoTrack,
  AudioTrack,
} from "twilio-video";
import { MdVideocam, MdVideocamOff, MdMic, MdMicOff } from "react-icons/md";

import { ToolBar, Video, VideoCard, FirstNameChar, IconButton } from "./styled";
import { Tracks, VideoTracks, AudioTracks, IProps } from "./types";

const ParticipantCard = ({ participant, isLocal, width, height }: IProps) => {
  const [videoTracks, setVideoTracks] = useState<Tracks[]>([]);
  const [audioTracks, setAudioTracks] = useState<Tracks[]>([]);
  const [isRemoteCameraOn, setIsRemoteCameraOn] = useState(true);
  const [isRemoteMicOn, setIsRemoteMicOn] = useState(true);
  const [opacity, setOpacity] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const trackPublicationToTrack = (
    trackMap: Map<Track.SID, VideoTrackPublication | AudioTrackPublication>
  ) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  const trackSubscribed = (track: Tracks) => {
    if (track.kind === "video") {
      setVideoTracks((videoTracks) => [...videoTracks, track]);
    } else {
      setAudioTracks((audioTracks) => [...audioTracks, track]);
    }
  };

  const trackUnsubscribed = (track: VideoTrack | AudioTrack) => {
    if (track.kind === "video") {
      setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
    } else {
      setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
    }
  };

  useEffect(() => {
    setVideoTracks(
      trackPublicationToTrack(participant.videoTracks) as VideoTracks[]
    );

    setAudioTracks(
      trackPublicationToTrack(participant.audioTracks) as AudioTracks[]
    );

    if (!isLocal) {
      participant.on("trackSubscribed", trackSubscribed);
      participant.on("trackUnsubscribed", trackUnsubscribed);
    }

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  const showBar = () => {
    setOpacity(true);
  };

  const hideBar = () => {
    setOpacity(false);
  };

  const opacityControl = () => (+opacity - 0.3).toString();

  const toggleCamera = () => {
    if (!remoteHasDisableTrack("videoTracks")) {
      videoTracks[0].mediaStreamTrack.enabled = !isRemoteCameraOn;
      setIsRemoteCameraOn(!isRemoteCameraOn);
    }
  };

  const toggleMic = () => {
    if (!remoteHasDisableTrack("audioTracks")) {
      setIsRemoteMicOn(!isRemoteMicOn);
    }
  };

  const remoteHasDisableTrack = useCallback(
    (trackType: "videoTracks" | "audioTracks") => {
      const isEnabled = Array.from(
        participant[trackType] as Map<string, RemoteTrackPublication>
      )?.[0]?.[1].isTrackEnabled;

      return !isEnabled;
    },
    [participant, videoTracks]
  );

  const isMicOn = () => isRemoteMicOn && !remoteHasDisableTrack("audioTracks");
  const isCameraOn = () =>
    isRemoteCameraOn && !remoteHasDisableTrack("videoTracks");

  useEffect(() => {
    const videoTrack = videoTracks[0];
    const audioTrack = audioTracks[0];
    if (videoTrack && videoRef.current) {
      videoTrack.attach(videoRef.current);
    }

    if (audioTrack && audioRef.current) {
      audioTrack.attach(audioRef.current);
    }

    return () => {
      videoTrack?.detach();
      audioTrack?.detach();
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
        <ToolBar top opacity={opacityControl()}>
          <FirstNameChar>
            {participant.identity.charAt(0).toUpperCase()}
          </FirstNameChar>
          <span>{participant.identity.toUpperCase()}</span>
        </ToolBar>
      )}
      {videoTracks.length > 0 ? (
        <Video ref={videoRef} autoPlay />
      ) : (
        "Loading..."
      )}
      <audio ref={audioRef} autoPlay muted={!isRemoteMicOn} />
      {!isLocal && (
        <ToolBar opacity={opacityControl()} justifyCenter>
          <IconButton onClick={toggleMic} isActive={isMicOn()}>
            {isMicOn() ? <MdMic /> : <MdMicOff />}
          </IconButton>
          <IconButton onClick={toggleCamera} isActive={isCameraOn()}>
            {isCameraOn() ? <MdVideocam /> : <MdVideocamOff />}
          </IconButton>
        </ToolBar>
      )}
    </VideoCard>
  );
};

export default ParticipantCard;
