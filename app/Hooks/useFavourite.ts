import { useRouter } from "next/navigation";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
import React, { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";




interface IUseFavourite{
    listingId : string;
    currentUser? : SafeUser | null;
}

const useFavourite = ({
    listingId,
    currentUser
}: IUseFavourite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavourite = useMemo(()=>{
      const list = currentUser?.favouriteIds || [];

      return list.includes(listingId);

    },[currentUser, listingId])


    const toggleFavourite = useCallback(async(
        e: React.MouseEvent<HTMLDivElement>
    )=>{
       e.stopPropagation();

       if(!currentUser){
        return loginModal.onOpen();
       }

       try {
        let request;
        if(hasFavourite){
          request=()=>  axios.delete(`/api/favourite/${listingId}`);
        }
        else{
            request=()=> axios.post(`/api/favourite/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success('Success');

        
       } catch (error) {
        toast.error('Something went wrong');
        
       }
    },[currentUser, hasFavourite, loginModal, router, listingId])

    return{
        hasFavourite, 
        toggleFavourite
    }
}

export default useFavourite;