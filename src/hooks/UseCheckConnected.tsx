import { useHistory } from "react-router";
import { getProfil, getTokenExpirationDate } from "../util/util";

export function useCheckConnected() {
    const history = useHistory();
    const profil = getProfil();
    if(profil == null || profil === undefined) {
        return history.push("/login") ;
    }
    console.log(getTokenExpirationDate());
    if(getTokenExpirationDate() < new Date()) {
        return history.push("/login") ;
    }
}