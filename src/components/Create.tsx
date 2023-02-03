import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  useIonViewWillEnter,
} from "@ionic/react";
import { camera } from "ionicons/icons";
import { MutableRefObject, useRef, useState } from "react";
import { useCheckConnected } from "../hooks/UseCheckConnected";
import { usePhotoGallery } from "../hooks/UsePhotoGallery";
import {
  getDatas,
  getProfil,
  hmsToMillis,
  millisToHourMinuteSecondString,
  postDatas,
} from "../util/util";
import CardResponse from "./CardResponse";

const Create: React.FC<{}> = () => {
  useCheckConnected();

  const [categories, setCategories] = useState<any>([]);
  const [minDuration, setMinDuration] = useState<any>(0);
  const [maxDuration, setMaxDuration] = useState<any>(0);
  const [commission, setCommission] = useState<any>(0);
  const [response, setResponse] = useState<any>(null);

  const nom: MutableRefObject<HTMLInputElement | any> =
    useRef<HTMLInputElement>(null);
  const category: MutableRefObject<HTMLIonSelectElement | any> =
    useRef<HTMLIonSelectElement>(null);
  const description: MutableRefObject<HTMLIonTextareaElement | any> =
    useRef<HTMLIonTextareaElement>(null);
  const hh: MutableRefObject<HTMLInputElement | any> =
    useRef<HTMLInputElement>(null);
  const mm: MutableRefObject<HTMLInputElement | any> =
    useRef<HTMLInputElement>(null);
  const ss: MutableRefObject<HTMLInputElement | any> =
    useRef<HTMLInputElement>(null);
  const enchereMin: MutableRefObject<HTMLInputElement | any> =
    useRef<HTMLInputElement>(null);

  const { photos, takePhoto } = usePhotoGallery();
  const profil = getProfil();

  useIonViewWillEnter(() => {
    getDatas(setCategories, "https://api-production-6a5a.up.railway.app/category");
  }, []);

  const prepareData = () => {
    let pictures: { picture: string | undefined }[] = [];
    photos.forEach((photo) => {
      pictures.push({
        picture: photo,
      });
    });

    const data = {
      productName: nom.current.value,
      client: {
        id: profil.client.id,
      },
      category: {
        id: category.current.value,
      },
      productDescription: description.current.value,
      duration: hmsToMillis(
        hh.current.value,
        mm.current.value,
        ss.current.value
      ),
      amountMin: enchereMin.current.value,
      productPictureList: pictures,
    };
    console.log(data);
    return data;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = prepareData();
    console.log(data);

    const url =
      "https://api-production-6a5a.up.railway.app/auction?clientId=" +
      profil.client.id +
      "&token=" +
      profil.token;
    const response: any = await postDatas(data, url);
    if (response.error) {
      console.log(response.error);
      setResponse(response.error.message);
    } else {
      window.location.href = "/page/Auctions";
    }
  };

  const getCategory = (id: any) => {
    return categories.filter((cat: any) => cat.id === id)[0];
  };

  const handleCategoryChange = (e: any) => {
    console.log(e.target.value);
    console.log(categories);
    const cat = getCategory(e.target.value);
    console.log(cat);
    console.log(cat.minDuration);
    setMinDuration(cat.minDuration);
    setMaxDuration(cat.maxDuration);
    setCommission(cat.comission);
  };

  return (
    <form onSubmit={handleSubmit}>
      <IonList>
        <IonItem>
          <IonLabel>Nom produit</IonLabel>
          <IonInput ref={nom} required />
        </IonItem>

        <IonItem>
          <IonLabel>Category</IonLabel>
          <IonSelect ref={category} onIonChange={handleCategoryChange}>
            {categories?.map((cat: any) => {
              return (
                <IonSelectOption value={cat.id} key={cat.id}>
                  {cat.name}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonGrid>
            <IonRow>
              <IonCol>
                Duree min : {millisToHourMinuteSecondString(minDuration)}{" "}
              </IonCol>
              <IonCol>
                Duree max : {millisToHourMinuteSecondString(maxDuration)}{" "}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>

        <IonItem>
          <IonLabel>Comission </IonLabel>
          <IonInput value={commission + "%"} readonly={true} />
        </IonItem>

        <IonItem>
          <IonLabel>Enchere minimum </IonLabel>
          <IonInput type="number" ref={enchereMin} required />
        </IonItem>

        <IonItem>
          <IonGrid>
            <IonRow>
              <IonCol size="4">Duree</IonCol>
              <IonCol size="2">
                <IonInput type="number" ref={hh} placeholder="hh" required />
              </IonCol>
              {/* <IonCol size="1">:</IonCol> */}
              <IonCol size="2">
                <IonInput type="number" ref={mm} placeholder="mm" required />
              </IonCol>
              {/* <IonCol size="1">:</IonCol> */}
              <IonCol size="2">
                <IonInput type="number" ref={ss} placeholder="ss" required />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>

        <IonItem>
          <IonLabel>Description produit</IonLabel>
          <IonTextarea autoGrow={true} ref={description} required />
        </IonItem>

        <IonItem lines="none">
          <IonLabel>Photo</IonLabel>
          <IonButton slot="end" onClick={() => takePhoto()}>
            <IonIcon icon={camera} slot="icon-only"></IonIcon>
          </IonButton>
        </IonItem>
        <IonItem lines="none">
          <IonGrid>
            <IonRow>
              {photos?.map((photo, index) => (
                <IonCol size="6" key={index}>
                  <img src={photo} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
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

export default Create;
