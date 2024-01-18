import ClientOnly from "../Components/ClientOnly";
import EmptyState from "../Components/EmptyState";
import getCurrerntUser from "../actions/getCurrentUser";
import getFavouriteListing from "../actions/getFavouriteListings";
import FavouritesClient from "./FavouritesClient";




const ListingPage = async ()=>{
    const listings = await getFavouriteListing();
    const currentUser = await getCurrerntUser();

    if(listings.length === 0){
    return(
       <ClientOnly>
         <EmptyState title="No favourites found "
          subtitle="Looks like you have no favourite listing" 
          />
       </ClientOnly>
     )
  }
  return(
    <ClientOnly>
        <FavouritesClient
         listings={listings}
         currentUser={currentUser} />
    </ClientOnly>
  )
}

export default ListingPage;