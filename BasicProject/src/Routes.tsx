import React, {memo, useCallback} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {defaultScreenOptions, navigationRef} from '@/utils/navigation';
import {DetailScreen} from '@/screens/Detail/DetailScreen';
import {LoginScreen} from '@/screens/Login/LoginScreen';
import {ForgotPasswordScreen} from '@/screens/Login/ForgotPasswordScreen';
import {RegisterScreen} from '@/screens/Login/RegisterScreen';
import {CameraScreen} from '@/screens/Camera/CameraScreen';
import {DrawerContent} from '@/screens/DrawerContent';
import {AddCameraScreen} from '@/screens/Camera/AddCameraScreen';
import {NotifyScreen} from '@/screens/Notify/NotifyScreen';
import {HomeScreen} from '@/screens/Home/HomeScreen';
import {VisitorScreen} from '@/screens/Visitor/VisitorScreen';
import {UserScreen} from '@/screens/UserScreen/UserScreen';
import {ScanQRCodeScreen} from '@/screens/Camera/ScanQRCodeScreen';
import {AnimatedScreen} from '@/screens/Animated/AnimatedScreen';

const RootStack = createStackNavigator();
const ModalStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();
const MainStack = createStackNavigator();

const MainStackComponent = memo(function MainStackComponent() {
  return (
    <MainStack.Navigator
      initialRouteName={'CameraScreen'}
      headerMode={'none'}
      screenOptions={defaultScreenOptions}>
      <DrawerStack.Screen name={'CameraScreen'} component={CameraScreen} />
      <DrawerStack.Screen name={'DetailScreen'} component={DetailScreen} />
      <DrawerStack.Screen name={'NotifyScreen'} component={NotifyScreen} />
      {/*<DrawerStack.Screen*/}
      {/*  name={'ForgotPasswordScreen'}*/}
      {/*  component={ForgotPasswordScreen}*/}
      {/*/>*/}
      <DrawerStack.Screen name={'RegisterScreen'} component={RegisterScreen} />
      <DrawerStack.Screen
        name={'AddCameraScreen'}
        component={AddCameraScreen}
      />
      <DrawerStack.Screen name={'VisitorScreen'} component={VisitorScreen} />
      <DrawerStack.Screen
        name={'ScanQRCodeScreen'}
        component={ScanQRCodeScreen}
      />
      <DrawerStack.Screen name={'AnimatedScreen'} component={AnimatedScreen} />
    </MainStack.Navigator>
  );
});

const DrawerStackComponent = memo(function DrawerStackComponent() {
  return (
    <DrawerStack.Navigator
      screenOptions={{
        swipeEnabled: false,
      }}
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName={'Main'}>
      <DrawerStack.Screen name={'Main'} component={MainStackComponent} />
    </DrawerStack.Navigator>
  );
});

export const ModalStackComponent = memo(function ModalStackComponent() {
  return (
    <ModalStack.Navigator
      initialRouteName={'HomeScreen'}
      headerMode={'none'}
      mode={'modal'}>
      <ModalStack.Screen name={'Main'} component={DrawerStackComponent} />
      <ModalStack.Screen name={'LoginScreen'} component={LoginScreen} />
      <ModalStack.Screen name={'HomeScreen'} component={HomeScreen} />
      <ModalStack.Screen name={'RegisterScreen'} component={RegisterScreen} />
      <ModalStack.Screen
        name={'ForgotPasswordScreen'}
        component={ForgotPasswordScreen}
      />
      <ModalStack.Screen name={'UserScreen'} component={UserScreen} />
    </ModalStack.Navigator>
  );
});

export const Routes = memo(function Routes() {
  const routeNameRef = React.useRef<string>('');
  const onStateChange = useCallback(() => {
    const previousRouteName = routeNameRef.current;
    // @ts-ignore
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (currentRouteName && previousRouteName !== currentRouteName) {
      // analytics().setCurrentScreen(currentRouteName);
      routeNameRef.current = currentRouteName;
    }
  }, []);

  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
      <RootStack.Navigator initialRouteName={'Root'} headerMode={'none'}>
        <RootStack.Screen name={'Root'} component={ModalStackComponent} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
});

export default Routes;
