export interface TierObj {
  title: string;
  description: string;
  amount: {
    currency: string;
    issuer: string;
    value: number;
  };
  asset: string;
}

export interface Initiative {
  title: string;
  description: string;
  tag: number;
  XAddress: string;
  start: number;
  end: number;
  tiers: TierObj[];
  defaultAsset: string;
}

export interface RegistryEntry {
  name: string;
  description: string;
  address: string;
  image: string;
  url: string;
  phone: string;
  mailingAddress: string;
  country: string;
  EIN: string;
  initatives: Initiative[];
}

export interface HeadEntry {
  title: string;
  description: string;
}

export type RegistryArray = { registry: RegistryEntry[] };
export type Head = { document: HeadEntry };
export type Registry = (Head | RegistryArray)[];
