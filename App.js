import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import RootNavigation from "./Navigation/RootNavigation";

import handleResourcesAsync from "./Components/helpingComponents/loadAssests";

import rootReducers from "./Components/Reducers/rootReducers";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

export default function App() {
  const [isDataLoaded, setisDataLoaded] = useState(false);

  const store = createStore(rootReducers, applyMiddleware(thunk));

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
    <Provider store={store}>
      <RootNavigation>
        <StatusBar style="dark" />
      </RootNavigation>
    </Provider>
  );
}
