import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import CompassView from './src/screens/CompassView';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <CompassView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
