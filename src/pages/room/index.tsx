import { Container, IconButton, ToolBar, VideoContainer } from "./styled";
import { MdVideocam, MdVideocamOff, MdMic, MdMicOff, MdClose } from 'react-icons/md';
import { useState } from "react";
import { useHistory } from "react-router";

const Room = () => {
  const history = useHistory();

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);

  const handleOnCloseClick = () => {
    history.push('/');
  }

  return (
    <Container>
      <VideoContainer>

      </VideoContainer>
      <ToolBar>
        <IconButton onClick={() => setIsMicOn((previousValue) => !previousValue)}>
          {isMicOn ? <MdMic /> : <MdMicOff />}
        </IconButton>
        <IconButton onClick={handleOnCloseClick}>
          <MdClose />
        </IconButton>
        <IconButton onClick={() => setIsCameraOn((previousValue) => !previousValue)}>
          {isCameraOn ? <MdVideocam /> : <MdVideocamOff />}
        </IconButton>
      </ToolBar>
    </Container>
  );
}

export default Room;