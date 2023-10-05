import FavoritesClient from "./FavoritesClient";
import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUsers";
import getFavoriteListings from "../actions/getFavoriteListings";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly> 
        <EmptyState 
          title="No Favorites found"
          subtitle="You did not add any favorites listings."
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <FavoritesClient 
        favoriteListings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default ListingPage
