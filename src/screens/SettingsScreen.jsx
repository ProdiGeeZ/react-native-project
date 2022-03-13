
import React, { createRef, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { FormControl, Input, WarningOutlineIcon } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Camera } from 'expo-camera'
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import axios from 'axios';

import { UserContext } from '../context/UserContext';
import { API_URL } from '../../consts.json'
import CameraComponent from './CameraComponent';

const SettingsScreen = () => {
  const user = useContext(UserContext);
  const { id, token, details, password, setDetails, profilePic } = user;
  const { first_name, last_name, email } = details.profile;

  const [updatedFirstName, setFirstName] = useState(first_name);
  const [updatedLastName, setLastName] = useState(last_name);
  const [updatedEmail, setEmail] = useState(email);
  const [updatedPassword, setPassword] = useState(password);
  const [err, setError] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  const bottompanel = createRef();
  const fall = new Animated.Value(1);

  const launchCam = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const renderContent = () => (
    <View style={styles.uploadPanel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 27, height: 35 }}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose your profile photo</Text>
        <TouchableOpacity style={styles.panelButton}
          onPress={launchCam}>
          <Text style={styles.panelButtonTitle}>Take photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={() => bottompanel.current.snapTo(1)}>
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View >
  );

  const renderHeader = () => (
    <View style={styles.uploadHeader}>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.panelHandle}>
        </View>
      </View>
    </View>
  );

  const updateDetails = () => {
    setError(false);
    axios.patch(`${API_URL}/user/${id}`, {
      first_name: updatedFirstName,
      last_name: updatedLastName,
      email: updatedEmail,
      password: updatedPassword
    }, {
      headers: {
        'X-Authorization': token,
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      setDetails(prevState => ({
        profile: {
          ...prevState.profile,
          first_name: updatedFirstName,
          last_name: updatedLastName,
          email: updatedEmail
        },
        ...prevState.photo
      }));
    }).catch((err) => setError(true))
  };

  return (
    hasPermission ? <CameraComponent hasPermission={hasPermission} setHasPermission={setHasPermission} /> : <View style={styles.container}>
      <BottomSheet
        callbackNode={fall}
        enabledGestureInteraction
        initialSnap={1}
        ref={bottompanel}
        renderContent={renderContent}
        renderHeader={renderHeader}
        snapPoints={[330, 0]}
      />

      <Animated.View style={{
        margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0))
      }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => bottompanel.current.snapTo(0)}>
            <View style={styles.profileContainer}>
              <ImageBackground
                source={{
                  uri: profilePic
                }}
                style={styles.profilePicture}
                imageStyle={{ borderRadius: 15 }}>
                <View style={styles.cameraOverlay}>
                  <Icon name='camera' size={35} color='#fff'
                    style={styles.cameraIcon} />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={styles.userName}> {first_name} {last_name} </Text>
        </View>
        <View style={styles.formFields}>
          <FormControl isInvalid={err} style={styles.formControl}>
            <Input
              variant='underlined'
              InputLeftElement={<Icon name='account-outline' size={30} color="#ff8f73" />}
              placeholder="First Name"
              value={updatedFirstName}
              onChangeText={text => setFirstName(text)}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Something went wrong
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={err} style={styles.formControl}>
            <Input
              variant='underlined'
              InputLeftElement={<Icon name='account-outline' size={30} color="#ff8f73" />}
              placeholder="Last Name"
              value={updatedLastName}
              onChangeText={text => setLastName(text)}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Something went wrong
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={err} style={styles.formControl}>
            <Input
              variant='underlined'
              keyboardType='email-address'
              InputLeftElement={<Icon name="email" size={30} color="#ff8f73" />}
              placeholder="Email"
              value={updatedEmail}
              onChangeText={text => setEmail(text)}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Something went wrong
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={err} style={styles.formControl}>
            <Input
              variant='underlined'
              secureTextEntry
              InputLeftElement={<Icon name="lock" size={30} color="#ff8f73" />}
              placeholder="New Password"
              onChangeText={text => setPassword(text)}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Something went wrong
            </FormControl.ErrorMessage>
          </FormControl>
        </View>
        <TouchableOpacity style={styles.panelButton} onPress={() => { updateDetails() }}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  cameraIcon: {
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
  },
  formControl: {
    padding: 10
  },
  formFields: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  profileContainer: {
    height: 100,
    width: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profilePicture: {
    height: 100,
    width: 100,
    backgroundColor: 'red',
    borderRadius: 20
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'grey',
    marginBottom: 10,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  uploadHeader: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  uploadPanel: {
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  },
  userName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default SettingsScreen; 