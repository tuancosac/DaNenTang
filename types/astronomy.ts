export type EventType = | "moon" | "esclipe" | "meteor" | "iss" | "asteroid";

export interface  AstronomyEvent {
    id: string;
    title: string;
    type: EventType;
    date: Date;
    description: string;
    icon: string;
}