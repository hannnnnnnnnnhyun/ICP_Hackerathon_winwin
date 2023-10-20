// Type: Type for NFT
export type Attributes = {
    name: string;
    location: string;
    category: string;
    price: string;
}

export type Metadata = {
    name: string;
    description: string;
    image: Uint8Array | number[];
    attributes: Attributes;
}

export type NFT = {
    id: number;
    metadata: Metadata;
    owner: string;
}