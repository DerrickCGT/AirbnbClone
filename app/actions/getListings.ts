import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(
  params: IListingsParams
) {
  try{
    const { 
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category
     } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    // gte stands for greater than equal to, and "+" is to translate the string to number (string is pass in)
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    // query.NOT used to reversed logic
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate},
                startDate: {lte: startDate},
              },
              {
                startDate: { lte: endDate},
                endDate: { gte: endDate},
              }
            ]
          }
        }
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
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