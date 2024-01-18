import ClientOnly from "../Components/ClientOnly";
import EmptyState from "../Components/EmptyState";
import getCurrerntUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";
import ReservationsClient from "./ReservationsClient";



const ReservationsPage = async ()=>{
    const currentUser = await getCurrerntUser();

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState 
                 title="Unautharized"
                 subtitle="Please login" />
            </ClientOnly>
        )
    }
    const reservation = await getReservation({
        authorId: currentUser.id
    });

    if (reservation.length === 0){
        return(
            <ClientOnly>
                <EmptyState 
                 title="No reservations found"
                 subtitle="Looks like you have no reservations on your properties" />
            </ClientOnly>
        )
    }
    return(
        <ClientOnly>
            <ReservationsClient 
             reservations={reservation}
             currentUser={currentUser} />
        </ClientOnly>
    )

};
export default ReservationsPage;