import { Principal } from '@dfinity/principal';

export type Transaction = {
    pic: Uint8Array | number[];
    challenger: Principal;
}