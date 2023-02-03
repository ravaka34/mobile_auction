import {
    IonLabel,
    IonItem
} from '@ionic/react';

import React from 'react';

export default function TransactionItem(props: {transaction: any}) {
    return (
        <IonItem>
            <IonLabel>
                <h2>{props.transaction.transactionName}</h2>
                <p> Type : {props.transaction.transactionType}  </p>
                <p> Amount : {props.transaction.amount} Ar  </p>
                <p> Date : {props.transaction.dateTransaction}  </p>
            </IonLabel>
        </IonItem>
    )
}