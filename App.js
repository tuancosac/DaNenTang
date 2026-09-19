import React from 'react';
import { StatusBar } from 'react-native';
import SignUpScreen from './screens/SignUpScreen';
import CalendarScreen from './screens/calendarScreen';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#050510" />
      <SignUpScreen />
      {/* <CalendarScreen /> */}
    </>
  );
}