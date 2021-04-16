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
import Video from "twilio-video";

import {
  Container,
  IconButton,
  ToolBar,
  VideoContainer,
  RoomName,
} from "./styled";
import Participant from "../../components/participant";
import api from "../../services/api";

const Room = () => {
  const history = useHistory();
  const routeData = useLocation<{ username: string; roomName: string }>().state;
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [participants, setParticipants] = useState<Video.RemoteParticipant[]>(
    []
  );
  const [room, setRoom] = useState<Video.Room | null>(null);

  if (
    !routeData ||
    routeData?.username.length <= 0 ||
    routeData?.roomName.length <= 0
  ) {
    history.push("/");
    return null;
  }

  const calculateVideoCardSize = () => {
    const cardWidth = window.screen.width / (participants.length + 1) - 20;

    return {
      width: `${cardWidth}px`,
      height: `${cardWidth - 130}px`,
    };
  };

  const renderRemoteParticipants = useCallback(
    () =>
      participants.map((participant: Video.RemoteParticipant) => (
        <Participant
          width={calculateVideoCardSize().width}
          height={calculateVideoCardSize().height}
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

  const disableMicAndCanOnInit = (room: Video.Room) => {
    Array.from(room.localParticipant.videoTracks)[0][1].track.disable();
    Array.from(room.localParticipant.audioTracks)[0][1].track.disable();
  };

  const prepareRoom = useCallback(async () => {
    const response = await api.post("video/token", {
      identity: routeData.username,
      room: routeData.roomName,
    });
    const roomResponse = await Video.connect(response.data.token, {
      name: routeData.roomName,
    });

    setRoom(roomResponse);

    disableMicAndCanOnInit(roomResponse);

    roomResponse.on("participantConnected", participantConnected);
    roomResponse.on("participantDisconnected", participantDisconnected);
    roomResponse.participants.forEach(participantConnected);
  }, []);

  const toggleMic = () => {
    if (!room) return;
    const tmpRoom = Object.assign({}, room);
    Array.from(tmpRoom.localParticipant.audioTracks)?.[0]?.[1].track[
      !isMicOn ? "enable" : "disable"
    ]();
    setRoom(tmpRoom);
    setIsMicOn((previousValue) => !previousValue);
  };

  const toggleVideo = () => {
    if (!room) return;
    const tmpRoom = Object.assign({}, room);
    Array.from(tmpRoom.localParticipant.videoTracks)?.[0]?.[1].track[
      !isCameraOn ? "enable" : "disable"
    ]();
    setRoom(tmpRoom);
    setIsCameraOn((previousValue) => !previousValue);
  };

  const disconnectFromRoom = () => {
    setRoom((currentRoom) => {
      if (currentRoom && currentRoom.localParticipant.state === "connected") {
        currentRoom.localParticipant.videoTracks.forEach((trackPublication) => {
          trackPublication.track.stop();
          trackPublication.unpublish();
        });
        currentRoom.localParticipant.audioTracks.forEach((trackPublication) => {
          trackPublication.track.stop();
          trackPublication.unpublish();
        });
        currentRoom?.disconnect();

        return null;
      }

      return null;
    });
  };

  const handleOnCloseClick = () => {
    disconnectFromRoom();
    history.push("/");
  };

  useEffect(() => {
    prepareRoom();

    return () => {
      disconnectFromRoom();
    };
  }, []);

  return (
    <Container>
      <VideoContainer>
        {room?.localParticipant && (
          <Participant
            width={calculateVideoCardSize().width}
            height={
              participants.length > 0 ? calculateVideoCardSize().height : "auto"
            }
            isLocal
            participant={room.localParticipant}
          />
        )}
        {renderRemoteParticipants()}
      </VideoContainer>
      <ToolBar>
        <IconButton isActive={isMicOn} onClick={toggleMic}>
          {isMicOn ? <MdMic /> : <MdMicOff />}
        </IconButton>
        <IconButton isActive onClick={handleOnCloseClick}>
          <MdClose />
        </IconButton>
        <IconButton isActive={isCameraOn} onClick={toggleVideo}>
          {isCameraOn ? <MdVideocam /> : <MdVideocamOff />}
        </IconButton>
        <RoomName>Room name: {routeData.roomName}</RoomName>
      </ToolBar>
    </Container>
  );
};

export default Room;
