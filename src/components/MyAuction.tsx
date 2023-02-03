import { IonCol, IonGrid, IonRow, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import { useCheckConnected } from "../hooks/UseCheckConnected";
import { getDatas, getProfil } from "../util/util";
import CardAuction from "./CardAuction";

const MyAuction: React.FC<{}> = () => {

    useCheckConnected();
    
    const [auctions, setAuctions] = useState<any>([]);
    const profil = getProfil();
    useIonViewWillEnter(() => {
        getDatas(setAuctions, "https://api-production-6a5a.up.railway.app/client/"+profil.client.id+"/auction-state");
    })

    return (
        <>
            <IonGrid>
                <IonRow>
                    {auctions?.map((auction : any) => {
                        return (
                            <IonCol size="6" >
                                <CardAuction key = {auction.id} auction={auction} />
                            </IonCol>
                        )
                    })}
                </IonRow>
          </IonGrid>
        </>
    );
}

export default MyAuction;