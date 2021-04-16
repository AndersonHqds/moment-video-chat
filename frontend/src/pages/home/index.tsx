import {
  Container,
  Grid,
  Logo,
  PhoneImage,
  DescriptionContainer,
  MainText,
  SecondaryText,
  InputContainer,
  ButtonContainer,
} from "./styled";
import { ReactComponent as LogoImage } from "../../assets/logo.svg";
import phoneImage from "../../assets/video-call.png";
import Input from "../../components/input";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../components/button";
import { useHistory } from "react-router";

const Home = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handleChangeRoomName = (e: ChangeEvent<HTMLInputElement>) =>
    setRoomName(e.target.value);

  const handleClick = () => {
    history.push("/room", { username, roomName });
  };

  useEffect(() => {
    setIsButtonEnabled(username.length > 0 && roomName.length > 0);
  }, [username, roomName]);

  return (
    <Container>
      <Grid>
        <Logo>
          <LogoImage height="64" width="64" fill="#FFF" />
          <span>moment</span>
        </Logo>
        <PhoneImage src={phoneImage} alt="phone image" />
      </Grid>
      <Grid justify="center">
        <DescriptionContainer>
          <MainText>
            Create meetings or just have fun talking with your old friends
          </MainText>
          <SecondaryText>Remember and create new moments</SecondaryText>
        </DescriptionContainer>
        <InputContainer>
          <Input
            onChange={handleChangeUsername}
            value={username}
            placeholder="username"
          />
          <Input
            onChange={handleChangeRoomName}
            value={roomName}
            placeholder="room name"
          />
        </InputContainer>
        <ButtonContainer onClick={handleClick}>
          <Button disabled={!isButtonEnabled}>Create room</Button>
        </ButtonContainer>
      </Grid>
    </Container>
  );
};

export default Home;
