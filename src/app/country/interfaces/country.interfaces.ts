export interface Country {
  flag: string;
  flag_svg: string;
  namee: string;
  capital: string[];
  population: number;
  region: string;
}

export const REGIONS = [
  'Africa',
  'Americas',
  'Asia',
  'Europe',
  'Oceania',
  'Antarctic',
] as const;