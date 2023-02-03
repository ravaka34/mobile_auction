import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import Menu from "../components/Menu";
import "./Page.css";

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <IonSplitPane contentId="main">
      <Menu />
      <IonPage id="main">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{name}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <ExploreContainer name={name} />
        </IonContent>
      </IonPage>
    </IonSplitPane>
  );
};

export default Page;
