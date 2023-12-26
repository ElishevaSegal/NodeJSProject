type IImage = {
  url: string;
  alt: string;
};
type IAddress = {
  state?: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  zip?: string;
};
type ICardInput = {
  address: IAdress;
  image?: IImage;
  email: string;
  phone: string;
  title: string;
  subtitle: string;
  description: string;
  web: string;
};

export type ICard = ICardInput & {
  bizNumber?: number;
  userId?: string;
  _id?: string;
  likes: string[];
  createdAt: Date;
};

export { ICard,ICardInput, IAddress, IImage };
