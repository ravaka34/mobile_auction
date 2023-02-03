import { IonButton, IonInput, IonItem, IonLabel, IonList } from "@ionic/react";
import { MutableRefObject, useRef, useState } from "react";
import { useCheckConnected } from "../hooks/UseCheckConnected";
import { postDatas } from "../util/util";
import CardResponse from "./CardResponse";

const BalanceReload: React.FC<{}> = () => {
  useCheckConnected();
  
  const contact: MutableRefObject<HTMLInputElement | any> =
    useRef<HTMLInputElement>(null);
  const montant: MutableRefObject<HTMLInputElement | any> =
    useRef<HTMLInputElement>(null);

  const [response, setResponse] = useState<any>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      client: {
        id: 1,
      },
      contact: contact.current.value,
      amount: montant.current.value,
    };
    console.log(data);
    const state: any = await postDatas(
      data,
      "https://api-production-6a5a.up.railway.app/balance/reload-account"
    );
    if (state.data) {
      setResponse("Reload request sent");
    } else {
      setResponse(state.error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <IonList>
        <IonItem>
          <IonLabel>Contact</IonLabel>
          <IonInput ref={contact} required />
        </IonItem>
        <IonItem>
          <IonLabel>Montant</IonLabel>
          <IonInput ref={montant} type="number" required />
        </IonItem>
        <CardResponse message={response} />
        <IonButton
          className="ion-margin-top inputitem"
          type="submit"
          expand="block"
        >
          Creer
        </IonButton>
      </IonList>
    </form>
  );
};
export default BalanceReload;
