'use client';
import React, { useCallback, useState } from "react";
import Container from "../Components/Container";
import Heading from "../Components/Heading";
import { SafeUser, safeReservations } from "../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { error } from "console";
import ListingCard from "../Components/listing/ListingCard";


interface ReservationsClientProps{
    reservations: safeReservations[];
    currentUser?: SafeUser | null;
}

const ReservationsClient:React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id:string)=>{
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success('reservation Cancelled');
            router.refresh();
        })
        .catch(()=>{
          toast.error('invaid id');
        })
        .finally(()=>{
            setDeletingId('');
        })

    },[router])

    return ( 
        <Container>
            <Heading 
             title="Reservations"
             subtitle="Booking on your properties" 
             />
             <div className="
              mt-10
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-8
              "
              >
                {reservations.map((reservation)=>(
                    <ListingCard 
                     key={reservation.id}
                     data={reservation.listing}
                     reservation={reservation}
                     actionId={reservation.id}
                     onAction={onCancel}
                     disabled={deletingId === reservation.id}
                     actionLabel="Cancel guest reservation"
                     currentUser={currentUser} />
                 ))}


             </div>
        </Container>
     );
}
 
export default ReservationsClient;