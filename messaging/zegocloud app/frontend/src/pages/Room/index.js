import React from 'react'
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


// video call
const RoomPage = () => {
    const { roomId } = useParams();

    const myMeeting = async (element) => {
        const appID = 321060985;
        const serverSecret = "2b48c258c4a3124e58818a19dabc63cf";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),  //i have to write user id here
            "vishal soni"); //i have to write user name here

        const zc = ZegoUIKitPrebuilt.create(kitToken);

        zc.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: "copy link",
                    url: `http://localhost:3000/room/${roomId}`
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall
            },
            showScreenSharingButton: true,
            //like this there are many properties ,i can use based on requirements
        })
    }


    return (
        <div>
            <div ref={myMeeting} />
        </div>
    )
}

export default RoomPage