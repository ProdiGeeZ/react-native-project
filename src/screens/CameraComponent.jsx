import React, { useContext, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Camera } from 'expo-camera'
import { UserContext } from '../context/UserContext';
import { Buffer } from "buffer"
import { API_URL } from '../../consts.json';

const CameraComponent = ({ hasPermission, setHasPermission }) => {
  const { id, token, rerender, setRerender } = useContext(UserContext);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null)

  const sendToServer = async (data) => {
    const res = data.base64;
    let blob = Buffer.from(res, 'base64');

    return fetch(`${API_URL}/user/${id}/photo`, {
      method: 'POST',
      headers: {
        "Content-Type": "image/png",
        "X-Authorization": token
      },
      body: blob
    }).then((response) => {
      console.log("Picture added", response);
      setRerender(!rerender);
      setHasPermission(null);
    })
      .catch((err) => {
        console.log('uhhhhho', err);
      })
  }

  const takePicture = async () => {
    if (cameraRef) {
      const options = {
        quality: 0.5,
        base64: true,
        skipProcessing: true,
        onPictureSaved: data => sendToServer(data)
      };
      await cameraRef.current.takePictureAsync(options);
    }
  }


  if (hasPermission) {
    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                let switchCam = type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back;

                setType(switchCam);
              }}>
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => takePicture()}>
                <Text style={styles.text}> Take Photo </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      </View>
    )
  } else {
    return (<Text>No access to camera</Text>)
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  camButton: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 44 / 2,
    alignSelf: 'center',
    height: 44,
    width: 44,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: 'white',
  }
})
export default CameraComponent; 