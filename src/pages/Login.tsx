import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import React, { MutableRefObject, useRef, useState } from "react";
import { useHistory } from "react-router";
import CardResponse from "../components/CardResponse";
import { postDatas } from "../util/util";
const Login: React.FC<{}> = () => {
  const [response, setResponse] = useState<any>();
  const email: MutableRefObject<HTMLInputElement | any> =
    useRef<HTMLInputElement>(null);
  const pwd: MutableRefObject<HTMLIonSelectElement | any> =
    useRef<HTMLIonSelectElement>(null);
  const history = useHistory();

  const handleInscrireClick = () => {
    history.push("/inscription");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      email: email.current.value,
      password: pwd.current.value,
    };
    console.log(data);
    const state: any = await postDatas(data, "https://api-production-6a5a.up.railway.app/login");
    if (state.data) {
      console.log(state.data);
      localStorage.setItem("profil", JSON.stringify(state.data));
      history.push("/page/Auctions");
    } else {
      setResponse(state.error.message);
    }
  };

  return (
    <IonPage id="view-message-page">
      <IonContent>
        <div className="login">
          <IonList>
            <h3> Login </h3>
            <form onSubmit={handleSubmit}>
              <IonItem>
                <IonLabel position="floating"> Email : </IonLabel>
                <IonInput type="text" ref={email} required />
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Mot de passe :</IonLabel>
                <IonInput type="password" ref={pwd} required />
              </IonItem>
              <CardResponse message={response} />
              <IonButton
                className="ion-margin-top inputitem"
                type="submit"
                expand="block"
              >
                Login
              </IonButton>
            </form>
            <IonButton
                className="ion-margin-top inputitem"
                type="submit"
                expand="block"
                onClick={handleInscrireClick}
              >
                S'inscrire
              </IonButton>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
