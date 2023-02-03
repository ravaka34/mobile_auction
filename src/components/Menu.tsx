import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import { addOutline } from "ionicons/icons";
import "./Menu.css";
import { getProfil } from "../util/util";
import { useCheckConnected } from "../hooks/UseCheckConnected";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Create",
    url: "/page/Create",
    iosIcon: addOutline,
    mdIcon: addOutline,
  },
  {
    title: "My Auctions",
    url: "/page/Auctions",
    iosIcon: addOutline,
    mdIcon: addOutline,
  },
  {
    title: "Transactions",
    url: "/page/Transactions",
    iosIcon: addOutline,
    mdIcon: addOutline,
  },
  {
    title: "Login",
    url: "/login",
    iosIcon: addOutline,
    mdIcon: addOutline,
  },
  {
    title: "Balance Reload",
    url: "/page/BalanceReload",
    iosIcon: addOutline,
    mdIcon: addOutline,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const profil = getProfil();

  const renderHeadMenu = () => {
    if ( profil == null) {
      return <></>;
    } else {
      return (
        
          <IonNote>
            {profil.client.lastName} {profil.client.firstName}
          </IonNote>
       
      );
    }
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>MG Auction</IonListHeader>
          {renderHeadMenu() }
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
