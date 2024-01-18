import ClientOnly from "@/app/Components/ClientOnly";
import EmptyState from "@/app/Components/EmptyState";
import getListingById from "@/app/actions/getListingById";
import ListingClient from "./ListingClient";
import getCurrerntUser from "@/app/actions/getCurrentUser";
import getReservation from "@/app/actions/getReservation";

interface IParams{
    listingId?: string;
}

const ListingPage = async ({params}:{params: IParams}) => {
    const listing = await getListingById(params);
    const reservations = await getReservation(params);
    const currentUser = await getCurrerntUser();
    if(!listing){
        return(
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }
    return ( 
        <ClientOnly>
            <ListingClient
             listing={listing}
             reservations={reservations}
             currentUser={currentUser} />
            
        </ClientOnly>
     );
}
 
export default ListingPage;