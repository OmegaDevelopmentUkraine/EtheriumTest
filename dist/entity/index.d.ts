import { Group } from "./group";
export declare class Index {
    id: number;
    name: string;
    ethPriceInWei: bigint;
    usdPriceInCents: bigint;
    usdCapitalization: bigint;
    percentageChange: bigint;
    group: Group;
}
