import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Page from "./pages/Page";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/Login";
import Inscription from "./pages/Inscription";

import OneSignal from "onesignal-cordova-plugin";

setupIonicReact();

const App: React.FC = () => {
  const appId = "9db88a0a-5927-4f81-817d-05d55d0d8a37";
  const OneSignalInit = () => {
    OneSignal.setAppId(appId);
    OneSignal.setNotificationOpenedHandler(function (jsonData) {
      console.log("Notification opened:\n" + JSON.stringify(jsonData));
    });
  };

  OneSignalInit();

  return (
    <IonApp>
      <IonReactRouter>
        {/* <Route path="/login">
              <Login />
          </Route> */}
        {/* <IonSplitPane contentId="main"> */}

        {/* <Menu /> */}
        <IonRouterOutlet>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/inscription">
            <Inscription />
          </Route>

          <Route path="/" exact={true}>
            <Redirect to="/page/Auctions" />
          </Route>
          <Route path="/page/:name" exact={true}>
            <Page />
          </Route>
        </IonRouterOutlet>
        {/* </IonSplitPane> */}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
