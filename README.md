## Screenshots

### Login Screen

![Login Screen](/gitassets/screen1.png)

### Video Screen

![Chat Screen](/gitassets/screen2.png)

## How it works

This application use the twilio(www.twilio.com) API to create a video chat application api.
The frontend needs to request this video chat post route.

## Dependencies

- NodeJS
- Yarn

## Backend

### How to run it

- Firstly, you need to install all dependencies running `yarn` in the **backend** folder.
- Change the `backend/.env.example` to `backend/.env`
- After, you need to create an account on [twilio](https://www.twilio.com/) and get the `TWILIO_ACCOUNT_SID` on [console](https://www.twilio.com/console) and add it on **.env**
- Now, you need to get the `TWILIO_API_KEY` and `TWILIO_API_SECRET` creating these under the [Programable Video Tools in your console.](https://www.twilio.com/console/video/project/api-keys), get it and add on **.env**.
- After that, you just need to execute the following command `yarn start`.

## Frontend

### How to run it

- You need to navigate to the frontend folder, after that you need to install all dependencies running `yarn`.
- Whe it's done, you just need to run the following command `yarn start`

## Developed by

**@AndersonDev**

## References

[Twilio Blog](https://www.twilio.com/blog/video-chat-react-hooks)
