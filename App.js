import React from 'react';
import { StatusBar } from 'react-native';
// import SignUpScreen from './SignUpScreen';
import CalendarScreen from '../DaNenTang/screens/calendarScreen';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#050510" />
      {/* <SignUpScreen /> */}
      <CalendarScreen />
    </>
  );
}