import prisma from "@/app/libs/prismadb"

export default async function getListingsStatic() {
  try{
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeListings = listings.map((listings) => ({
      ...listings,
      createdAt: listings.createdAt.toISOString()
    }))

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}