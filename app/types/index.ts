// Import the User model type from Prisma client
import { Listing, Reservation, User } from "@prisma/client";

// Define a SafeUser type. 
// This type is derived from the original User type but with modifications to ensure certain fields are serializable.
export type SafeUser = 

  // Use the Omit utility type to exclude specific fields from the original User type.
  Omit< User, "createdAt" | "updatedAt" | "emailVerified"> & 
  {
    // Replace the original Date type fields with string types for serialization.
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
  }

export type SafeListing = 

  Omit< Listing, "createdAt" > & {
    createdAt: string;
  } 

export type SafeReservation =

  Omit<Reservation, "createdAt" | "startDate" | "endDate" | "listing"> &
  {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
  }