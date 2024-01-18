import ClientOnly from './Components/ClientOnly';
import Container from './Components/Container';
import EmptyState from './Components/EmptyState';
import ListingCard from './Components/listing/ListingCard';
import getCurrerntUser from './actions/getCurrentUser';
import getListings, { IListingsParams } from './actions/getListings';

interface HomeProps{
  searchParams: IListingsParams;
}

const Home= async({searchParams}: HomeProps)=> {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrerntUser();
  const isEmpty = true;
   if(listings.length === 0){
    return(
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div className='pt-24
         gap-8
         grid
         grid-cols-1
         sm:grid-cols-2
         md:grid-cols-3
         lg:grid-cols-4
         xl:grid-cols-5
         2xl:grid-cols-6'
         >
          {listings.map((listing:any)=>{
            console.log(listing);
            return(
              <ListingCard
               currentUser={currentUser}
               key={listing.id}
               data={listing} />
            )
          })}

        </div>
      </Container>

    </ClientOnly>
  )
}
export default Home;