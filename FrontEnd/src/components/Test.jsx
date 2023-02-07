import './VideoRoomComponent.css';

import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import OpenViduLayout from '../layout/openvidu-layout';
import UserModel from '../models/user-model';
import ChatComponent from './chat/ChatComponent';
import DialogExtensionComponent from './dialog-extension/DialogExtension';
import TextareaDec from './memo/TextareaDec';
import StreamComponent from './stream/StreamComponent';
import ToolbarComponent from './toolbar/ToolbarComponent';

var localUser = '';
const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000/';

export default function Test() {
  let layout = '';
  let OV = undefined;

  const [hasBeenUpdated, setHasBeenUpdated] = useState(false);
  const [sessionName, setsessionName] = useState('A');
  const [userName, setUserName] = useState('이름');
  const [remotes, setRemotes] = useState([]);
  const [localUserAccessAllowed, setLocalUserAccessAllowed] = useState(false);
  const [mySessionId, setMySessionId] = useState('');
  const [myUserName, setMyUserName] = useState('');
  const [session, setSession] = useState(undefined);
  const [localUser, setLocalUser] = useState(undefined); // 페이지의 메인 비디오 화면(퍼블리셔 또는 참가자의 화면 중 하나)
  const [subscribers, setSubscribers] = useState([]); // 다른 유저의 스트림 정보를 저장할 배열
  const [chatDisplay, setChatDisplay] = useState(undefined); // 페이지의 메인 비디오 화면(퍼블리셔 또는 참가자의 화면 중 하나)
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined); // 다른 유저의 스트림 정보를 저장할 배열
  const [showExtensionDialog, setShowExtensionDialog] = useState(true);
  const [messageReceived, setMessageReceived] = useState(false);

  // 토큰 받아오기
  const getToken = useCallback(() => {
    return createToken(mySessionId).then((sessionId) => createToken(sessionId));
  }, [mySessionId]);

  // 세션 생성하기
  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'api/sessions/1',
      { customSessionId: sessionId, clientId: 2 },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    console.log(response.data.conferenceId);
    return response.data.sessionId; // The sessionId
  };

  // 토근 생성하기
  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections',
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response.data; // The token
  };

  useEffect(() => {
    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: 'OV_big', // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };

    layout.initLayoutContainer(document.getElementById('layout'), openViduLayoutOptions);
    window.addEventListener('beforeunload', onbeforeunload);
    window.addEventListener('resize', updateLayout);
    window.addEventListener('resize', checkSize);
    joinSession();
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
      window.removeEventListener('resize', updateLayout);
      window.removeEventListener('resize', checkSize);
      leaveSession();
    };
  }, []);

  const onbeforeunload = (event) => {
    leaveSession();
  };

  const joinSession = async () => {
    OV = new OpenVidu();
    const mySession = OV.initSession(); // --- 2) 세션을 시작 --
    setSession(mySession);
    await subscribeToStreamCreated();
    await connectToSession();
  };

  const connectToSession = async () => {
    if (token !== undefined) {
      console.log('token received: ', token);
      connect(token);
    } else {
      try {
        var token = getToken();
        console.log(token);
        connect(token);
      } catch (error) {
        console.error('There was an error getting the token:', error.code, error.message);
      }
    }
  };

  const connect = (token) => {
    session.connect(token, { clientData: myUserName }).then(() => {
      connectWebCam();
    });
  };

  const connectWebCam = async () => {
    await OV.getUserMedia({ audioSource: undefined, videoSource: undefined });
    var devices = await OV.getDevices();
    var videoDevices = devices.filter((device) => device.kind === 'videoinput');

    let publisher = OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: '640x480',
      frameRate: 30,
      insertMode: 'APPEND',
    });

    if (session.capabilities.publish) {
      publisher.on('accessAllowed', () => {
        session.publish(publisher).then(() => {
          updateSubscribers();
          setLocalUserAccessAllowed(true);
          if (joinSession) {
            joinSession();
          }
        });
      });
    }
    localUser.setNickname(myUserName);
    localUser.setConnectionId(session.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);
    subscribeToUserChanged();
    subscribeToStreamDestroyed();
    sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });

    setCurrentVideoDevice(videoDevices[0]);
    setLocalUser(localUser);

    localUser.getStreamManager().on('streamPlaying', (e) => {
      updateLayout();
      publisher.videos[0].video.parentElement.classList.remove('custom-class');
    });
  };

  const updateSubscribers = () => {
    var subscribers = remotes;
    setSubscribers(subscribers);

    if (localUser) {
      sendSignalUserChanged({
        isAudioActive: localUser.isAudioActive(),
        isVideoActive: localUser.isVideoActive(),
        nickname: localUser.getNickname(),
        isScreenShareActive: localUser.isScreenShareActive(),
      });
    }
    updateLayout();
  };

  const leaveSession = () => {
    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    OV = null;
    setSession(undefined);
    setSubscribers([]);
    setMySessionId(undefined);
    setMyUserName('OpenVidu_User' + Math.floor(Math.random() * 100));
    setLocalUser(undefined);

    if (leaveSession) {
      leaveSession();
    }
  };
  const camStatusChanged = () => {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    setLocalUser(localUser);
  };

  const micStatusChanged = () => {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    setLocalUser(localUser);
  };

  // nicknameChanged(nickname) {
  //   let localUser = state.localUser;
  //   localUser.setNickname(nickname);
  //   setState({ localUser: localUser });
  //   sendSignalUserChanged({ nickname: state.localUser.getNickname() });
  // }

  const deleteSubscriber = (stream) => {
    const remoteUsers = subscribers;
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream,
    )[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      setSubscribers(remoteUsers);
    }
  };

  const subscribeToStreamCreated = () => {
    session.on('streamCreated', (event) => {
      const subscriber = session.subscribe(event.stream, undefined);
      // var subscribers = state.subscribers;
      subscriber.on('streamPlaying', (e) => {
        checkSomeoneShareScreen();
        subscriber.videos[0].video.parentElement.classList.remove('custom-class');
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType('remote');
      const nickname = event.stream.connection.data.split('%')[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      remotes.push(newUser);
      if (localUserAccessAllowed) {
        updateSubscribers();
      }
    });
  };

  const subscribeToStreamDestroyed = () => {
    // On every Stream destroyed...
    session.on('streamDestroyed', (event) => {
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream);
      setTimeout(() => {
        checkSomeoneShareScreen();
      }, 20);
      event.preventDefault();
      updateLayout();
    });
  };

  const subscribeToUserChanged = () => {
    session.on('signal:userChanged', (event) => {
      let remoteUsers = subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          console.log('EVENTO REMOTE: ', event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
          if (data.isScreenShareActive !== undefined) {
            user.setScreenShareActive(data.isScreenShareActive);
          }
        }
      });
      setSubscribers(remoteUsers);
      checkSomeoneShareScreen();
    });
  };

  const updateLayout = () => {
    setTimeout(() => {
      layout.updateLayout();
    }, 20);
  };

  const sendSignalUserChanged = (data) => {
    const signalOptions = {
      data: JSON.stringify(data),
      type: 'userChanged',
    };
    session.signal(signalOptions);
  };

  const toggleFullscreen = () => {
    const document = window.document;
    const fs = document.getElementById('container');
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (fs.requestFullscreen) {
        fs.requestFullscreen();
      } else if (fs.msRequestFullscreen) {
        fs.msRequestFullscreen();
      } else if (fs.mozRequestFullScreen) {
        fs.mozRequestFullScreen();
      } else if (fs.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  // async switchCamera() {
  //   try {
  //     const devices = await OV.getDevices();
  //     var videoDevices = devices.filter((device) => device.kind === 'videoinput');

  //     if (videoDevices && videoDevices.length > 1) {
  //       var newVideoDevice = videoDevices.filter(
  //         (device) => device.deviceId !== state.currentVideoDevice.deviceId,
  //       );

  //       if (newVideoDevice.length > 0) {
  //         // Creating a new publisher with specific videoSource
  //         // In mobile devices the default and first camera is the front one
  //         var newPublisher = OV.initPublisher(undefined, {
  //           audioSource: undefined,
  //           videoSource: newVideoDevice[0].deviceId,
  //           publishAudio: localUser.isAudioActive(),
  //           publishVideo: localUser.isVideoActive(),
  //           mirror: true,
  //         });

  //         //newPublisher.once("accessAllowed", () => {
  //         await state.session.unpublish(state.localUser.getStreamManager());
  //         await state.session.publish(newPublisher);
  //         state.localUser.setStreamManager(newPublisher);
  //         setState({
  //           currentVideoDevice: newVideoDevice,
  //           localUser: localUser,
  //         });
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  const screenShare = () => {
    const videoSource =
      navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';
    const publisher = OV.initPublisher(
      undefined,
      {
        videoSource: videoSource,
        publishAudio: localUser.isAudioActive(),
        publishVideo: localUser.isVideoActive(),
        mirror: false,
      },
      (error) => {
        if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
          setShowExtensionDialog(true);
        } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
          alert('Your browser does not support screen sharing');
        } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
          alert('You need to enable screen sharing extension');
        } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
          alert('You need to choose a window or application to share');
        }
      },
    );

    publisher.once('accessAllowed', () => {
      session.unpublish(localUser.getStreamManager());
      localUser.setStreamManager(publisher);
      session.publish(localUser.getStreamManager()).then(() => {
        localUser.setScreenShareActive(true);

        setLocalUser(localUser);
        sendSignalUserChanged({
          isScreenShareActive: localUser.isScreenShareActive(),
        });
      });
    });
    publisher.on('streamPlaying', () => {
      updateLayout();
      publisher.videos[0].video.parentElement.classList.remove('custom-class');
    });
  };

  const closeDialogExtension = () => {
    setShowExtensionDialog(false);
  };

  const stopScreenShare = () => {
    session.unpublish(localUser.getStreamManager());
    connectWebCam();
  };

  const checkSomeoneShareScreen = () => {
    let isScreenShared;
    // return true if at least one passes the test
    isScreenShared =
      subscribers.some((user) => user.isScreenShareActive()) ||
      localUser.isScreenShareActive();
    const openviduLayoutOptions = {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: isScreenShared,
      bigClass: 'OV_big',
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      animate: true,
    };
    layout.setLayoutOptions(openviduLayoutOptions);
    updateLayout();
  };

  // chat toggle
  const toggleChat = (property) => {
    let display = property;

    if (display === undefined) {
      display = chatDisplay === 'none' ? 'block' : 'none';
    }
    if (display === 'block') {
      setChatDisplay(display);
      setMessageReceived(false);
    } else {
      console.log('chat', display);
      setChatDisplay(display);
    }
    updateLayout();
  };

  const checkNotification = (event) => {
    setMessageReceived(chatDisplay === 'none');
  };

  const checkSize = () => {
    if (document.getElementById('layout').offsetWidth <= 700 && !hasBeenUpdated) {
      toggleChat('none');
      setHasBeenUpdated(true);
    }
    if (document.getElementById('layout').offsetWidth > 700 && hasBeenUpdated) {
      setHasBeenUpdated(false);
    }
  };

  // const client = useLocation();
  // const [test, setTest] = React.useState(location.state?.clientData);

  // console.log(test1);

  return (
    <div className="container" id="container">
      <ToolbarComponent
        sessionId={mySessionId}
        user={localUser}
        showNotification={messageReceived}
        camStatusChanged={camStatusChanged}
        micStatusChanged={micStatusChanged}
        screenShare={screenShare}
        stopScreenShare={stopScreenShare}
        toggleFullscreen={toggleFullscreen}
        leaveSession={leaveSession}
        toggleChat={toggleChat}
      />

      <DialogExtensionComponent
        showDialog={showExtensionDialog}
        cancelClicked={closeDialogExtension}
      />

      <div id="layout" className="bounds">
        {localUser !== undefined && localUser.getStreamManager() !== undefined && (
          <div className="OT_root OT_publisher custom-class" id="localUser">
            <StreamComponent user={localUser} />
          </div>
        )}
        {subscribers.map((sub, i) => (
          <div key={i} className="OT_root OT_publisher custom-class" id="remoteUsers">
            <StreamComponent user={sub} streamId={sub.streamManager.stream.streamId} />
          </div>
        ))}
        {localUser !== undefined && localUser.getStreamManager() !== undefined && (
          <div className="OT_root OT_publisher custom-class" style={chatDisplay}>
            <ChatComponent
              user={localUser}
              chatDisplay={chatDisplay}
              close={toggleChat}
              messageReceived={checkNotification}
            />
          </div>
        )}
        <div>
          <TextareaDec />
        </div>
      </div>
    </div>
  );
}

/**
 * --------------------------------------------
 * GETTING A TOKEN FROM YOUR APPLICATION SERVER
 * --------------------------------------------
 * The methods below request the creation of a Session and a Token to
 * your application server. This keeps your OpenVidu deployment secure.
 *
 * In this sample code, there is no user control at all. Anybody could
 * access your application server endpoints! In a real production
 * environment, your application server must identify the user to allow
 * access to the endpoints.
 *
 * Visit https://docs.openvidu.io/en/stable/application-server to learn
 * more about the integration of OpenVidu in your application server.
 */
