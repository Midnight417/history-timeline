export interface HistoricalEvent {
    id: string,
    name: string,
    date: [number, number, number],
    description: string,
    monthPresent?: boolean,
    datePresent?: boolean,
    leader?: {
        name: string,
        color: string
    }
};