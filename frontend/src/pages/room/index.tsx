import {
  MdVideocam,
  MdVideocamOff,
  MdMic,
  MdMicOff,
  MdClose,
} from "react-icons/md";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import Video, { LocalParticipant } from "twilio-video";

import {
  Container,
  IconButton,
  ToolBar,
  VideoContainer,
  RoomName,
} from "./styled";
import Participant from "../../components/participant";
import { useRoom } from "../../hooks/useRoom";
import { calculateVideoCardSize } from "../../services/screen";
import { useVideo } from "../../hooks/useVideo";
import { useAudio } from "../../hooks/useAudio";

const Room = () => {
  const history = useHistory();
  const routeData = useLocation<{ username: string; roomName: string }>().state;
  const [participants, setParticipants] = useState<Video.RemoteParticipant[]>(
    []
  );
  const [localParticipant, setLocalParticipant] = useState<LocalParticipant>();
  const { connect, disconnect } = useRoom({
    roomName: routeData?.roomName,
    identity: routeData?.username,
  });
  const { isCameraOn, toggleVideo } = useVideo();
  const { isMicOn, toggleAudio } = useAudio();

  const videoCard = calculateVideoCardSize(participants);

  const renderRemoteParticipants = useCallback(
    () =>
      participants.map((participant: Video.RemoteParticipant) => (
        <Participant
          width={videoCard.width}
          height={videoCard.height}
          key={participant.sid}
          participant={participant}
        />
      )),
    [participants]
  );

  const participantConnected = (participant: Video.RemoteParticipant) => {
    setParticipants((prevParticipants) => [...prevParticipants, participant]);
  };

  const participantDisconnected = (participant: Video.RemoteParticipant) => {
    setParticipants((prevParticipants: Video.RemoteParticipant[]) =>
      prevParticipants.filter((p: Video.RemoteParticipant) => p !== participant)
    );
  };

  const disableTrackOnInit = (
    room: Video.Room,
    type: "videoTracks" | "audioTracks"
  ) => {
    const { track } = [...room.localParticipant[type].values()][0];
    track.stop();
    track.disable();
  };

  const handleOnCloseClick = () => {
    disconnect();
    history.push("/");
  };

  useEffect(() => {
    connect().then((roomResponse) => {
      roomResponse.on("participantDisconnected", participantDisconnected);
      roomResponse.on("participantConnected", participantConnected);
      roomResponse.participants.forEach(participantConnected);
      setLocalParticipant(roomResponse.localParticipant);
      disableTrackOnInit(roomResponse, "videoTracks");
      disableTrackOnInit(roomResponse, "audioTracks");
    });

    return () => {
      disconnect();
    };
  }, []);

  return (
    <Container>
      <VideoContainer>
        {localParticipant && (
          <Participant
            width={videoCard.width}
            height={participants.length > 0 ? videoCard.height : "auto"}
            isLocal
            participant={localParticipant}
          />
        )}
        {renderRemoteParticipants()}
      </VideoContainer>
      <ToolBar>
        <IconButton
          isActive={isMicOn}
          onClick={() => toggleAudio({ localParticipant })}
        >
          {isMicOn ? <MdMic /> : <MdMicOff />}
        </IconButton>
        <IconButton isActive onClick={handleOnCloseClick}>
          <MdClose />
        </IconButton>
        <IconButton
          isActive={isCameraOn}
          onClick={() => toggleVideo({ localParticipant })}
        >
          {isCameraOn ? <MdVideocam /> : <MdVideocamOff />}
        </IconButton>
        <RoomName>Room name: {routeData.roomName}</RoomName>
      </ToolBar>
    </Container>
  );
};

export default Room;
