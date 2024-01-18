'use client';
import Container from "@/app/Components/Container";
import { categories } from "@/app/Components/Navbar/Categories";
import ListingHead from "@/app/Components/listing/ListingHead";
import ListingInfo from "@/app/Components/listing/ListingInfo";
import ListingReservation from "@/app/Components/listing/ListingReservation";
import useLoginModal from "@/app/Hooks/useLoginModal";
import { SafeListing, SafeUser, safeReservations } from "@/app/types";
import { Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

const initialDateRange ={
 startDate:new Date(),
 endDate: new Date(),
 key:'selection'
}


interface ListingClientProps{
    listing: SafeListing & {
        user: SafeUser;
    };
    reservations?: safeReservations[];
    currentUser?: SafeUser | null

}


   const ListingClient: React.FC<ListingClientProps> = ({
    reservations=[],
    listing,
    currentUser
   }) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const disableDates = useMemo(()=>{
      let dates: Date[]= [];

      reservations.forEach((reservation)=>{
        const range= eachDayOfInterval({
            start: new Date(reservation.startDate),
            end: new Date(reservation.endDate)
        });
        dates=[...dates, ...range];
      });
      return dates;
    },[reservations]);

    const [isLoading, setIsLoading]= useState(false);
    const[totalPrice, setTotalPrice]= useState(listing.price);
    const[dateRange, setDateRange]= useState<Range>(initialDateRange);


    const onCreateReservation= useCallback(()=>{
      if(!currentUser){
        return loginModal.onOpen();
      }
      setIsLoading(true);
      axios.post('/api/reservations',{
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id
      })
      .then(()=>{
        toast.success('Listing Reserved!');
        setDateRange(initialDateRange);
        //redirect to /trips
        router.push('/trips');
      })
      .catch(()=>{
        toast.error('something went wrong');
      })
      .finally(()=>{
        setIsLoading(false);
      })
    },[
        totalPrice,
        dateRange,
        listing?.id,
        router,
        currentUser,
        loginModal
    ]);

    useEffect(()=>{
     if(dateRange.startDate && dateRange.endDate){
        const dayCount = differenceInCalendarDays(
            dateRange.endDate,
            dateRange.startDate
        );

        if( dayCount && listing.price){
            setTotalPrice(dayCount * listing.price);
        }else{
            setTotalPrice(listing.price);
        }
     }
    },[dateRange, listing.price]);


    const category = useMemo(()=>{
        return categories.find((item)=>
            item.label === listing.category
        );
    },[listing.category])
    return ( 
        <Container >
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                     title={listing.title}
                     imageSrc={listing.imageSrc}
                     locationValue={listing.locationValue}
                     id={listing.id}
                     currentUser={currentUser} 
                     />
                     <div className="
                      grid
                      grid-cols-1
                      md:grid-cols-7
                      md:gap-10
                      mt-6 ">
                        <ListingInfo
                         user={listing.user}
                         description={listing.description}
                         category={category}
                         roomCount={listing.roomCount}
                         bathroomCount={listing.bathroomCount}
                         guestCount={listing.guestCount}
                         locationValue={listing.locationValue} 
                         />
                         <div className="order-first
                          mb-10
                          md:order-last
                          md:col-span-3 "
                          >
                            <ListingReservation 
                             price={listing.price}
                             totalPrice={totalPrice}
                             onChangeDate={(value)=> setDateRange(value)}
                             dateRange={dateRange}
                             onSubmit={onCreateReservation}
                             disabled={isLoading}
                             disabledDates={disableDates} />

                         </div>

                     </div>

                </div>

            </div>

        </Container>
     );
   }
    
   export default ListingClient;