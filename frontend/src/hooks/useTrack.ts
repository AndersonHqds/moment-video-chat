import { useEffect, useState } from "react";
import {
  AudioTrack,
  AudioTrackPublication,
  LocalParticipant,
  RemoteParticipant,
  Track,
  VideoTrack,
  VideoTrackPublication,
} from "twilio-video";
import {
  AudioTracks,
  Tracks,
  VideoTracks,
} from "../components/participant/types";

const useTrack = (participant: LocalParticipant | RemoteParticipant) => {
  const [videoTracks, setVideoTracks] = useState<Tracks[]>([]);
  const [audioTracks, setAudioTracks] = useState<Tracks[]>([]);
  const [isRemoteCameraOn, setIsRemoteCameraOn] = useState(false);
  const [isRemoteMicOn, setIsRemoteMicOn] = useState(false);

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

  const trackPublicationToTrack = (
    trackMap: Map<Track.SID, VideoTrackPublication | AudioTrackPublication>
  ) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(
      trackPublicationToTrack(participant.videoTracks) as VideoTracks[]
    );

    setAudioTracks(
      trackPublicationToTrack(participant.audioTracks) as AudioTracks[]
    );

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);
    participant.on("trackEnabled", (e) => {
      if (e.kind === "video") {
        setIsRemoteCameraOn(true);
        trackSubscribed(e);
      } else {
        setIsRemoteMicOn(true);
      }
    });
    participant.on("trackDisabled", (e) => {
      if (e.kind === "video") {
        setIsRemoteCameraOn(false);
        trackSubscribed(e);
      } else {
        setIsRemoteMicOn(false);
      }
    });

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  return { videoTracks, audioTracks, isRemoteCameraOn, isRemoteMicOn };
};

export { useTrack };
