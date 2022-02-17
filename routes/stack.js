import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import LoginScreen from '../src/screens/LoginScreen'
import SignUpScreen from '../src/screens/SignUpScreen';

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