import { useCallback, useState } from "react";
import Video, { Room } from "twilio-video";
import { useHistory } from "react-router";

import api from "../services/api";

interface Params {
  identity: string;
  roomName: string;
}

export const useRoom = ({ identity, roomName }: Params) => {
  const history = useHistory();
  const [room, setRoom] = useState<Room | null>(null);

  if (!identity && !roomName) {
    history.push("/");
  }

  const connect = useCallback(async () => {
    const response = await api.post("video/token", {
      identity,
      room: roomName,
    });
    const roomResponse = await Video.connect(response.data.token, {
      name: roomName,
      video: true,
      audio: true,
    });

    setRoom(roomResponse);

    // disableMicAndCanOnInit(roomResponse);
    return roomResponse;
  }, []);

  const disconnect = () => {
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

  return { room, connect, disconnect };
};
