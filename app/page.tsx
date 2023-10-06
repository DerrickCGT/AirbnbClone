import getCurrentUser from "@/app/actions/getCurrentUsers";
// import getListings, { IListingsParams } from "@/app/actions/getListings";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingCard from "@/app/components/listings/ListingCard";
import ClientOnly from "./components/ClientOnly";
import getListingsStatic from "./actions/getListingsStatic";

// interface HomeProps {
//   searchParams: IListingsParams
// }

// const Home = async ({ searchParams }: HomeProps) =>  {
export default async function Home() {
  const listings = await getListingsStatic();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>      
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="
          pt-24
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
          {listings.map((listing: any) => (            
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

// export default Home;