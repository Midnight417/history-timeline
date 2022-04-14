export interface HistoricalEvent {
    id: string,
    name: string,
    date: [number, number, number],
    description: string,
    monthPresent?: boolean,
    datePresent?: boolean,
    leader?: Leader,
    leaderId: string,
    country?: Country,
    countryId: string,
};

export interface Leader {
    id: string,
    name: string,
    color: string,
    historicalEvent?: HistoricalEvent[],
    country: Country,
    countryId: string,
}

export interface Country {
    id: string,
    name: string,
    color: string,
    leader?: Leader[],
    historicalEvent?: HistoricalEvent[],
}

export interface Filter {
    startDate: Date | null,
    endDate: Date | null,
    leader: string[],
    country: string[]
}