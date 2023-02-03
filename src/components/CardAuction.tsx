import React from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

function CardAuction(props : {auction : any}) {

  const renderState = (isFinished : any) => {
    if(isFinished === 1 ){
      return<h3> Fini </h3>
    }else{
      return <h3> En cours</h3>
    }
  }

  return (
    <IonCard>
      <img alt="" src={props.auction.productPictureList[0]?.picture} />
      <IonCardHeader>
        <IonCardTitle>{props.auction.productName} </IonCardTitle>
        <IonCardSubtitle>
          {props.auction.category.name}
        </IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
          <p> Date debut : {props.auction.depositoryDate} </p>
          <p> Date fin : {props.auction.endDate} </p>
          <IonButton>{ renderState(props.auction.isFinished) }</IonButton>
      </IonCardContent>
      
    </IonCard>
  );
}
export default CardAuction;