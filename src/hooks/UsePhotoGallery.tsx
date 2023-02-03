import { useState } from "react";

import {
  Camera,
  CameraResultType,
  CameraSource,
} from "@capacitor/camera";


export function usePhotoGallery() {
  const [photos, setPhotos] = useState<(string | undefined)[]>([]);

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      allowEditing: false,
      quality: 90,
    });
    const src = "data:image/"+photo.format+";base64,"+photo.base64String;
    const newPhotos = [src, ...photos];
    console.log(photo);
    setPhotos(newPhotos);
  };

  return {
    photos,
    takePhoto,
  };
}
