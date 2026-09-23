export type EventType = | "moon" | "eclipse" | "meteor" | "iss" | "asteroid";

export interface  AstronomyEvent {
    id: string;
    title: string;
    type: EventType;
    date: Date;
    description: string;
    icon: string;
}

