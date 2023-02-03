import { IonCard, IonCardContent } from "@ionic/react";
import React from "react";

export default function CardResponse(props: { message: string }) {
  const renderResponse = () => {
    if (props.message == null || props.message === "") {
      return <></>;
    } else {
      return (
        <IonCard>
          <IonCardContent>{props.message}</IonCardContent>
        </IonCard>
      );
    }
  };

  return (
    <>
        { renderResponse() }
    </>
  );
}
