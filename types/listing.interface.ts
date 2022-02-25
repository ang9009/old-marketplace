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
  yearLevel: string;
  subject?: string;
  imagePath?: string;
}
