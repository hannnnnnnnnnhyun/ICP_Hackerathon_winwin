import {Transaction} from "@type/data/transaction.type";
import { Principal } from '@dfinity/principal';

export type Event = {
    id: Principal;
    name: string;
    location: string;
    logo: Uint8Array | number[];
    category: string;
    price: bigint;
    creator: Principal;
    state: string;
    transactions: Array<Transaction>
}

