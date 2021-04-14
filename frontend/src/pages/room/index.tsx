import { Container, IconButton, ToolBar, VideoContainer } from "./styled";
import { MdVideocam, MdVideocamOff, MdMic, MdMicOff, MdClose } from 'react-icons/md';
import { useState } from "react";
import { useHistory } from "react-router";
import { useLocation, useParams } from "react-router-dom";

const Room = () => {
  const history = useHistory();
  const routeData = useLocation<{ username: string; roomName: string }>().state;
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);

  const handleOnCloseClick = () => {
    history.push('/');
  }

  if (!routeData || routeData?.username.length <= 0 || routeData?.roomName.length <= 0) {
    history.push('/')
    return null;
  }

  return (
    <Container>
      <VideoContainer>

      </VideoContainer>
      <ToolBar>
        <IconButton isActive={isMicOn} onClick={() => setIsMicOn((previousValue) => !previousValue)}>
          {isMicOn ? <MdMic /> : <MdMicOff />}
        </IconButton>
        <IconButton isActive onClick={handleOnCloseClick}>
          <MdClose />
        </IconButton>
        <IconButton isActive={isCameraOn} onClick={() => setIsCameraOn((previousValue) => !previousValue)}>
          {isCameraOn ? <MdVideocam /> : <MdVideocamOff />}
        </IconButton>
      </ToolBar>
    </Container>
  );
}

export default Room;