import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getPlural(number: number, singular: string, plural: string) {
    const pluralRules = new Intl.PluralRules();
    return pluralRules.select(number) === "one" ? singular : plural;
}
