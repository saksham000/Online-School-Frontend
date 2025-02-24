import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import "aos/dist/aos.css";
import Aos from "aos";
export default function StudentJoinRoom() {
  const { roomid, username } = useParams(); // ✅ Get roomid & usernamefrom URL params
  const meetingRef = useRef(null);
  const zegoInstanceRef = useRef(null); // ✅ Keep track of Zego instance

  useEffect(() => {
    Aos.init({ duration: 1000 });
    if (!roomid || !meetingRef.current || !username) return; // Ensure roomid, ref, and usernameexist
    const appID = 1553287727; // Your ZegoCloud App ID
    const serverSecret = "c7c2dd18fb0051f6903261860093a402"; // Your server secret

    // ✅ Generate a random unique Student ID
    const studentID = `Student-${Math.floor(Math.random() * 100000)}`;

    // ✅ Generate ZegoCloud authentication token
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomid,
      studentID, // Randomly generated student ID
      username // Passed from URL param
    );

    // ✅ Destroy previous instance if exists
    if (zegoInstanceRef.current) {
      zegoInstanceRef.current.destroy();
    }

    // ✅ Create a new Zego UI kit instance
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zegoInstanceRef.current = zp; // Store instance in ref

    // ✅ Join the meeting room
    zp.joinRoom({
      container: meetingRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      turnOnMicrophoneWhenJoining: false,
      turnOnCameraWhenJoining: false,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 50,
      layout: "Auto",
      showLayoutButton: true,
    });

    // ✅ Cleanup function to prevent duplicate instances
    return () => {
      if (zegoInstanceRef.current) {
        zegoInstanceRef.current.destroy();
        zegoInstanceRef.current = null;
      }
    };
  }, [roomid, username]); // ✅ Runs when roomid or usernamechanges

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <h2
          data-aos="fade-up"
          className="text-xl font-semibold mb-4 text-center"
        >
          Joining Meeting as {username}
        </h2>
        <div className="border rounded-lg p-4">
          <div
            data-aos="fade-up"
            ref={meetingRef}
            className="h-[500px] w-full bg-gray-200"
          />
        </div>
      </div>
    </div>
  );
}
