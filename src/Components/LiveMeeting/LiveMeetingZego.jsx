import { useRef, useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import 'aos/dist/aos.css';
import Aos from "aos";
export default function LiveMeetingZego() {
  const meetingContainerRef = useRef(null); // Create a ref for the div container
  const { teacherName } = useParams();
  useEffect(() => {
    startMeeting();
    Aos.init({ duration: 1000 });
  }, []);

  const startMeeting = async () => {
    const roomID = Math.floor(Math.random() * 10000) + ""; // Set a fixed room ID or generate dynamically
    const appID = 1553287727; // ✅ Replace with your ZegoCloud App ID
    const serverSecret = "c7c2dd18fb0051f6903261860093a402"; // ✅ Replace with your secret key

    // Generate ZegoCloud authentication token
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(), // Unique user ID
      teacherName // Display name
    );

    // Create the Zego UI kit instance
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // Join the room and attach the UI to the div
    zp.joinRoom({
      container: meetingContainerRef.current, // ✅ Attach the meeting UI here
      sharedLinks: [
        {
          name: "Meeting Link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference, // ✅ Set to Video Conference Mode
      },
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
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
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Live Meeting</h2>
        <div className="border rounded-lg p-4">
          <div data-aos="fade-up" ref={meetingContainerRef} className="h-[500px]" />
        </div>
      </div>
    </div>
  );
}
