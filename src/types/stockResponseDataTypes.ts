export interface StockProfile {
    // Company Information
    symbol: string;
    companyName: string;
    description: string;
    ceo: string;
    sector: string;
    industry: string;

    // Contact Information
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    website: string;

    // Financial Information
    currency: string;
    price: number;
    change: number;
    changePercentage: number;
    marketCap: number;
    lastDividend: number;

    // Volume Information
    volume: number;
    averageVolume: number;
    range: string;
    beta: number;

    // Dates, IDs and Classification
    ipoDate: string;
    cik: string;
    cusip: string;
    isin: string;
    exchange: string;
    exchangeFullName: string;

    // Flags / Status
    isActivelyTrading: boolean;
    isAdr: boolean;
    isEtf: boolean;
    isFund: boolean;

    // Image
    image: string;
    defaultImage: boolean;

    // Additional Info
    fullTimeEmployees: string;
}
