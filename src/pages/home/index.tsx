import {
  Container,
  Grid,
  Logo,
  PhoneImage,
  DescriptionContainer,
  MainText,
  SecondaryText,
  InputContainer,
  ButtonContainer
} from './styled'
import { ReactComponent as LogoImage } from '../../assets/logo.svg'
import phoneImage from '../../assets/video-call.png'
import Input from '../../components/input';
import { ChangeEvent, useState } from 'react';
import Button from '../../components/button';

const Home = () => {

  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  }

  return (
    <Container>
      <Grid>
        <Logo>
          <LogoImage height="64" width="64" fill="#FFF" />
          <span>moment</span>
        </Logo>
        <PhoneImage src={phoneImage} alt="phone image" />
      </Grid>
      <Grid justify='center'>
        <DescriptionContainer>
          <MainText>
            Create meetings or just have fun talking with your old friends
          </MainText>
          <SecondaryText>Remember and create new moments</SecondaryText>
        </DescriptionContainer>
        <InputContainer>
          <Input onChange={handleChange} value={username} placeholder='username' />
          <Input onChange={handleChange} value={username} placeholder='room name' />
        </InputContainer>
        <ButtonContainer>
          <Button>Create room</Button>
        </ButtonContainer>
      </Grid>
    </Container>
  )
}

export default Home
