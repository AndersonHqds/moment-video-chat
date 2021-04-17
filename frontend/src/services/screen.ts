import { RemoteParticipant } from "twilio-video";

export const calculateVideoCardSize = (participants: RemoteParticipant[]) => {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const calculateByParticipant = (quantity: number) =>
    screenWidth / quantity - 20;
  const totalParticipants = participants.length + 1;
  const cardWidth =
    totalParticipants > 3
      ? calculateByParticipant(3)
      : calculateByParticipant(totalParticipants);

  return {
    width: screenWidth > 880 ? `${cardWidth}px` : `90%`,
    height: `${screenWidth > 880 ? cardWidth - 130 : screenHeight / 2}px`,
  };
};
