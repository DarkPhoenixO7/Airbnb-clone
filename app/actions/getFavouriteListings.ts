import prisma from '@/app/libs/prismadb';
import getCurrerntUser from './getCurrentUser';


export default async function getFavouriteListing() {
    try{
        const currentUser = await getCurrerntUser();
        if(!currentUser){
            return [];
        }
        const favourites = await prisma.listing.findMany({
            where:{
                id:{
                    in:[...(currentUser.favouriteIds || [])]
                }
            }
        });
        const safeFavourites = favourites.map((favourite)=>({
            ...favourite,
            createdAt:favourite.createdAt.toISOString()
        }))
        return safeFavourites;
    }catch(error:any){
        throw new Error(error);
    }
    
}