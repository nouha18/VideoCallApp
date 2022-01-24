import React, {useState,useEffect,useRef} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import RtcEngine ,{ChannelProfile,ClientRole,RtcLocalView, VideoRemoteState ,RtcRemoteView} from "react-native-agora";
import { Platform,ActivityIndicator ,Dimensions,Share   } from 'react-native';

const onShare = async () => {
  try {
    await Share.share({ message: props.route.params.channel });
  } catch (error) {
    console.log(error.message);
  }
};
const dimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

const styles = StyleSheet.create({
  // Rest of the Styles

  fullscreen: {
    width: dimensions.width,
    height: dimensions.height,
  },
});

export default function Live(props) {
  const AgoraEngine = useRef();
  const [broadcasterVideoState, setBroadcasterVideoState] = useState(VideoRemoteState.Decoding);
  const [joined, setJoined] = useState(false);
  const isBroadcaster = props.route.params.type === "create";

  const onSwitchCamera = () => AgoraEngine.current.switchCamera();
  const videoStateMessage = (state) => {
    switch (state) {
      case VideoRemoteState.Stopped:
        return "Video turned off by Host";
  
      case VideoRemoteState.Frozen:
        return "Connection Issue, Please Wait";
  
      case VideoRemoteState.Failed:
        return "Network Error";
    }
  };

  const init = async () => {
    AgoraEngine.current = await RtcEngine.create("You App ID Here");
    AgoraEngine.current.enableVideo();
    AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);
    
  AgoraEngine.current.addListener("JoinChannelSuccess", (channel, uid, elapsed) => {
    console.log("JoinChannelSuccess", channel, uid, elapsed);
    setJoined(true);
  });
    AgoraEngine.current.addListener("RemoteVideoStateChanged", (uid, state) => {
      if (uid === 1) setBroadcasterVideoState(state);
    });
    if (isBroadcaster) AgoraEngine.current.setClientRole(ClientRole.Broadcaster);
  
    AgoraEngine.current.addListener("JoinChannelSuccess", (channel, uid, elapsed) =>
      console.log("JoinChannelSuccess", channel, uid, elapsed)
    );
  };

  useEffect(() => {
    const uid = isBroadcaster ? 1 : 0;
    init().then(() => AgoraEngine.current.joinChannel(null, props.route.params.channel, null, uid));
    return () => {
      AgoraEngine.current.destroy();
    };
  }, []);



  return (
    <View style={styles.container}>
      {broadcasterVideoState === VideoRemoteState.Decoding ? (
  <RtcRemoteView.SurfaceView 
   uid={1} 
   style={styles.fullscreen} 
   channelId={props.route.params.channel} 
  />
) : (
  <View style={styles.broadcasterVideoStateMessage}>
    <Text style={styles.broadcasterVideoStateMessageText}>{videoStateMessage(broadcasterVideoState)}</Text>
  </View>
)
}
      {!joined ? (
        <>
          <ActivityIndicator
            size={60}
            color="#222"
            style={styles.activityIndicator}
          />
          <Text style={styles.loadingText}>Joining Stream, Please Wait</Text>
        </>
      ) : (
        <>
        broadcasterVideoState === VideoRemoteState.Decoding ? (
  <RtcRemoteView.SurfaceView 
   uid={1} 
   style={styles.fullscreen} 
   channelId={props.route.params.channel} 
  />
) : (
  <View style={styles.broadcasterVideoStateMessage}>
    <Text style={styles.broadcasterVideoStateMessageText}>{videoStateMessage(broadcasterVideoState)}</Text>
  </View>
);
        {isBroadcaster ? (
          <RtcLocalView.SurfaceView 
            style={styles.fullscreen} 
            channelId={props.route.params.channel} 
          />
        ) : (
          <RtcRemoteView.SurfaceView 
            uid={1} 
            style={styles.fullscreen} 
            channelId={props.route.params.channel} 
          />
        )}
         <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button} onPress={onShare}>
      <Text style={styles.shareText}>Share</Text>
    </TouchableOpacity>
  </View>
  <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.button} onPress={onShare}>
    <Text style={styles.buttonText}>Share</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.button} onPress={onSwitchCamera}>
    <Text style={styles.buttonText}>Switch Camera</Text>
  </TouchableOpacity>
</View>
      </>
      )}

    </View>
  );
}




























