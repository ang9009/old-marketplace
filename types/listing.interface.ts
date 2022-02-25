import ListingState from "./listingState.enum";
import Condition from "./condition.enum";

export default interface Listing {
  id: string;
  ownerId: string;
  buyerId: string;
  name: string;
  description: string;
  condition: Condition;
  state: ListingState;
  type: string;
  yearLevel: number;
  subject?: string;
  price: number;
  imagePath?: string;
}
