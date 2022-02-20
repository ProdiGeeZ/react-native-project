import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen';

const screens = {
  Login: {
    screen: LoginScreen
  },
  SignUp: {
    screen: SignUpScreen
  }
}
const stack = createStackNavigator(screens);

export default createAppContainer(stack);