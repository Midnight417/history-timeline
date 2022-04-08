export interface HistoricalEvent {
    id: string,
    name: string,
    date: [number, number, number],
    description: string,
    monthPresent?: boolean,
    datePresent?: boolean,
    leader?: Leader,
    leaderId: string
};

export interface Leader {
    id: string,
    name: string,
    color: string
}