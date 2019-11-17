import React, {useEffect} from 'react';
import {
  ApplicationProvider,
  IconRegistry,
} from 'react-native-ui-kitten';
import {
  mapping,
  light as theme,
} from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Navigator from './screens/Navigator'
import {GoogleSignin} from '@react-native-community/google-signin'
import store, {persistor} from './store'
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from 'react-redux'
import {StatusBar} from 'react-native'

/** do not delete this */
import 'react-native-gesture-handler'

const App = (): React.ReactFragment => {

  useEffect(() => {
    GoogleSignin.configure()
  }, [])
  
    return (
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <React.Fragment>
            <IconRegistry icons={EvaIconsPack}/>
            <ApplicationProvider mapping={mapping} theme={theme}>
              <StatusBar hidden={true}/>
              <Navigator/>
            </ApplicationProvider>
          </React.Fragment>
        </Provider>
      </PersistGate>
    )
}

export default App
