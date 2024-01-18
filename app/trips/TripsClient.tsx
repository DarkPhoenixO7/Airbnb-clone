'use client';
import React, { useCallback, useState } from "react";
import { SafeUser, safeReservations } from "../types";
import Container from "../Components/Container";
import Heading from "../Components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../Components/listing/ListingCard";

interface TripsClinetProps{
    reservations: safeReservations[];
    currentUser?: SafeUser | null;
}

const TripsClient:React.FC<TripsClinetProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId]= useState('');
    const onCancel=useCallback((id:string)=>{
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success('Reservation Cancelled');
            router.refresh();
        })
        .catch((error)=>{
            toast.error(error?.response?.data?.error);
        })
        .finally(()=>{
            setDeletingId('');
        })

    },[router]);
    return ( 
        <Container>
            <Heading title="Trips"
             subtitle="Where have you been and where are you going?" 
             />
             <div 
             className="
              mt-10
              grid
              grid-col-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-8
               ">
                {reservations.map((reservation)=>(
                    <ListingCard 
                     key={reservation.id}
                     data={reservation.listing}
                     reservation={reservation}
                     actionId={reservation.id}
                     onAction={onCancel}
                     disabled={deletingId === reservation.id}
                     actionLabel="Cancel Reservation"
                     currentUser={currentUser} />
                ))}

             </div>
        </Container>
     );
}
 
export default TripsClient;