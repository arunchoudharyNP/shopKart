import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';

import * as Font from "expo-font";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import RootNavigation from "./Navigation/RootNavigation";


export default function App() {

  const [isDataLoaded, setisDataLoaded] = useState(false);

  function cacheImages(images) {
    return images.map((image) => {
      if (typeof image === "string") {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  function cacheFonts(fonts) {
    return fonts.map((font) => Font.loadAsync(font));
  }

  const handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app

    const imageAssets = cacheImages([
     
    ]);

    const fontAssets = cacheFonts([
      // { Caveat: require("./assets/fonts/static/Caveat-Medium.ttf") },
    ]);

    return Promise.all([...imageAssets, ...fontAssets]);
  };


  if (!isDataLoaded) {
    return (
      <AppLoading
        startAsync={handleResourcesAsync}
        onError={(error) => console.warn(error)}
        onFinish={() => setisDataLoaded(true)}
      />
    );
  }

  return (
    // <Provider store={store}>
      <RootNavigation>
        <StatusBar style="dark" />
      </RootNavigation>
    // </Provider>
  );
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
