import { IonList, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import { useCheckConnected } from "../hooks/UseCheckConnected";
import { getDatas, getProfil } from "../util/util";
import TransactionItem from "./TransactionItem";

const Transactions: React.FC<{}> = () => {
    useCheckConnected();
    const profil = getProfil();
    
    const [transactions, setTransactions] = useState<any>([]);
    useIonViewWillEnter(() => {
        console.log("get transactions")
        getDatas(setTransactions, "https://api-production-6a5a.up.railway.app/transaction/"+profil.client.id);
        console.log(transactions);
    })

    return (
         
        <IonList>
            {transactions?.map((transaction: any)=> <TransactionItem transaction={transaction} />)}
        </IonList>
        
    );
}
export default Transactions;
