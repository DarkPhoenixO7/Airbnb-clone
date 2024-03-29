import getCurrerntUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';





export async function POST(
    request: Request
){
    const currentUser = await getCurrerntUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        totalPrice,
        listingId,
        startDate,
        endDate
    } = body;

    if(!listingId || !totalPrice || !startDate || !endDate){
        return NextResponse.error();
    }

    const listingAndReservation = await prisma.listing.update({
        where:{
            id:listingId
        },
        data:{
            reservations:{
                create:{
                    userId: currentUser.id,
                    startDate,
                    endDate, 
                    totalPrice
                }
            }
        }

    })
    return NextResponse.json(listingAndReservation);
}