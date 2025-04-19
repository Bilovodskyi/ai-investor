export type Principle = {
    principle: string;
    implementation: string;
};

export type Image = {
    imageUrl: string;
    alt: string;
};

export type Investor = {
    mainTitle: string;
    image: Image;
    principles: Principle[];
};

export type InvestorsPrinciples = {
    [key: string]: Investor;
};
