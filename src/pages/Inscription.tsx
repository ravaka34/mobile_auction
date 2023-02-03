import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { MutableRefObject, useRef, useState } from "react";
import { useHistory } from "react-router";
import CardResponse from "../components/CardResponse";
import { postDatas } from "../util/util";
import "./Inscription.css";

const Inscription: React.FC<{}> = () => {
  const [response, setResponse] = useState<any>();
  const genres = [
    {
      name: "Homme",
      id: 1,
    },
    {
      name: "Femme",
      id: 2,
    },
  ];

  const nom: MutableRefObject<HTMLInputElement | any> =
    useRef<HTMLInputElement>(null);
  const prenom: MutableRefObject<HTMLInputElement | any> =
    useRef<HTMLInputElement>(null);
  const dateNaissance: MutableRefObject<HTMLIonDatetimeElement | any> =
    useRef<HTMLIonDatetimeElement>(null);
  const contact: MutableRefObject<HTMLInputElement | any> =
    useRef<HTMLInputElement>(null);
  const genre: MutableRefObject<HTMLIonSelectElement | any> =
    useRef<HTMLIonSelectElement>(null);
  const email: MutableRefObject<HTMLInputElement | any> =
    useRef<HTMLInputElement>(null);
  const password: MutableRefObject<HTMLInputElement | any> =
    useRef<HTMLInputElement>(null);
  const repassword: MutableRefObject<HTMLInputElement | any> =
    useRef<HTMLInputElement>(null);

  const history = useHistory();

  const handleLoginClick = () => {
    history.push("/login");
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(password.current.value !== repassword.current.value){
        setResponse("Password not match");
        return;
    }
    const data = {
        client : {
            firstName : prenom.current.value,
            lastName : nom.current.value,
            birthDate : dateNaissance.current.value,
            contact : contact.current.value,
            genderId : genre.current.value
        },
        login : {
            email : email.current.value,
            pwd : password.current.value
        }
    };
    const state : any = await postDatas(data, "https://api-production-6a5a.up.railway.app/client");
    if (state.data) {
        localStorage.setItem("profil", JSON.stringify(state.data));
        history.push("/page/Auctions");
    }else {
        setResponse(state.error.message);
    }
    console.log(data);
  };

  return (
    <IonPage id="view-message-page">
      <IonContent>
        <div className="inscription">
          <IonList>
            <h3> Inscription </h3>
            <form onSubmit={handleSubmit}>
              <IonItem>
                <IonLabel position="floating"> Nom : </IonLabel>
                <IonInput ref={nom} required />
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Prenom :</IonLabel>
                <IonInput ref={prenom} required />
              </IonItem>

              <IonItem>
                <IonLabel>Genre</IonLabel>
                <IonSelect ref={genre}>
                  {genres?.map((genre: any) => {
                    return (
                      <IonSelectOption value={genre.id} key={genre.id}>
                        {genre.name}
                      </IonSelectOption>
                    );
                  })}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel>Date Naissance :</IonLabel>
                <IonInput type="date" ref={dateNaissance} required />
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Contact :</IonLabel>
                <IonInput ref={contact} required />
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Email :</IonLabel>
                <IonInput type="email" ref={email} required />
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Password :</IonLabel>
                <IonInput type="password" ref={password} required />
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Repassword :</IonLabel>
                <IonInput type="password" ref={repassword} required />
              </IonItem>

              <CardResponse message={response} />
              <IonButton
                className="ion-margin-top inputitem"
                type="submit"
                expand="block"
              >
                S'inscrire
              </IonButton>
                  
            </form>
            <IonButton
                className="ion-margin-top inputitem"
                type="submit"
                expand="block"
                onClick={handleLoginClick}
              >
                Login
              </IonButton>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Inscription;
