import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function StudentJoinRoom() {
  const { studentName, studentRollNumber, studentJoinRoomId } = useParams();

  const myMeeting = async (element) => {
    const appID = 1234867820;
    const serverSecret = "ab29129d36ce796e162861fd4ccc240b";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      studentJoinRoomId,
      studentRollNumber,
      studentName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
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
  };

  return (
    <div>
      <div ref={myMeeting} />
    </div>
  );
}
