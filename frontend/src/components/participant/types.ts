import {
  LocalVideoTrack,
  RemoteVideoTrack,
  LocalAudioTrack,
  RemoteAudioTrack,
  RemoteParticipant,
  LocalParticipant,
} from "twilio-video";

export interface VideoCardProps {
  width?: string;
  height?: string;
}

export interface ToolbarProps {
  opacity?: string;
  top?: boolean;
  justifyCenter?: boolean;
}

export interface IconButtonProps {
  isActive: boolean;
}

export type VideoTracks = RemoteVideoTrack | LocalVideoTrack;
export type AudioTracks = RemoteAudioTrack | LocalAudioTrack;
export type Tracks = VideoTracks | AudioTracks;

export interface IProps extends VideoCardProps {
  participant: LocalParticipant | RemoteParticipant;
  isLocal?: boolean;
}
