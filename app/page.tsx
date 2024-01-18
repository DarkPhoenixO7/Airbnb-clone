import ClientOnly from './Components/ClientOnly';
import Container from './Components/Container';
import EmptyState from './Components/EmptyState';
import ListingCard from './Components/listing/ListingCard';
import getCurrerntUser from './actions/getCurrentUser';
import getListings, { IListingsParams } from '@/app/actions/getListings';

interface HomeProps{
  searchParams: IListingsParams;
}
export const dynamic = 'force-dynamic';

const Home= async({searchParams}: HomeProps)=> {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrerntUser();
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
          {listings.map((listing:any)=>(
              <ListingCard
               currentUser={currentUser}
               key={listing.id}
               data={listing} 
               />
            
          ))}

        </div>
      </Container>

    </ClientOnly>
  )
}
export default Home;
