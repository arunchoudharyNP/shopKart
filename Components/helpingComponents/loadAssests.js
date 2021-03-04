import * as Font from "expo-font";
import { Asset } from "expo-asset";

import { Image } from "react-native";

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

  const imageAssets = cacheImages([]);

  const fontAssets = cacheFonts([
    // { Caveat: require("./assets/fonts/static/Caveat-Medium.ttf") },
  ]);

  return Promise.all([...imageAssets, ...fontAssets]);
};

export default handleResourcesAsync;
