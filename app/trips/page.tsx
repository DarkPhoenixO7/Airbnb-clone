import ClientOnly from "../Components/ClientOnly";
import EmptyState from "../Components/EmptyState";
import getCurrerntUser from "../actions/getCurrentUser"
import getReservation from "../actions/getReservation";
import TripsClient from "./TripsClient";



const TripsPage = async()=>{
    const currentUser = await getCurrerntUser();

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState title="Unauthorized"
                 subtitle="Please login" />
            </ClientOnly>
        )
    }

    const reservations = await getReservation({
        userId:currentUser.id
    })

    if(reservations.length=== 0){
        return(
            <ClientOnly>
                <EmptyState title="No trips found"
                 subtitle="Looks like you have not reserved any trips" />
            </ClientOnly>
        )
    }
    return(
        <ClientOnly>
            <TripsClient
             reservations={reservations}
             currentUser={currentUser} />
        </ClientOnly>
    )
}
export default TripsPage;