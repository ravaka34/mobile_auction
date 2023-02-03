import { IonCard, IonCardContent, IonTitle } from "@ionic/react";

const MyAuctionDetails: React.FC<{}> = () => {
  return (
    <>
      <IonCard>
        <img
          alt="Silhouette of mountains"
          src="https://ionicframework.com/docs/img/demos/card-media.png"
        />
        <>
          
            <h3> Kiraro </h3>
          
          <h4>Description</h4>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. In
            exercitationem nemo ducimus officiis, officia deserunt nostrum
            voluptas est veritatis nam, consectetur, odio dolorem? Voluptate,
            veniam! Autem reprehenderit perferendis aliquam praesentium.
          </p>
           <p>Date debut : 25/01/2023 12:00:00 </p>
           <p> Date fin : 25/01/2023 12:00:00 </p>
           <p> Duree :  1:00:00 </p>
           <p> Montant initale : 125,000 Ar </p>
        </>
      </IonCard>
    </>
  );
};

export default MyAuctionDetails;
