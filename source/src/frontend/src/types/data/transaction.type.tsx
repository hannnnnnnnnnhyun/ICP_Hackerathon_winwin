import { Principal } from '@dfinity/principal';

export type Transaction = {
    id: Principal;
    pic: Uint8Array | number[];
    challenger: Principal;
    pick: boolean;
}