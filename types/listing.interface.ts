export default interface Listing {
  id: string;
  name: string;
  description: string;
  type: string;
  yearLevel: string;
  subject?: string;
  imagePath?: string;
}
