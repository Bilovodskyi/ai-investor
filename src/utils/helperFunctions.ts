export function formatMarketCap(value: number): string {
    if (!value && value !== 0) return "N/A";
    if (value === 0) return "0 USD";

    const trillion = 1_000_000_000_000;
    const billion = 1_000_000_000;
    const million = 1_000_000;
    const thousand = 1_000;

    let formattedValue: number;
    let suffix: string;

    if (Math.abs(value) >= trillion) {
        formattedValue = value / trillion;
        suffix = "T";
    } else if (Math.abs(value) >= billion) {
        formattedValue = value / billion;
        suffix = "B";
    } else if (Math.abs(value) >= million) {
        formattedValue = value / million;
        suffix = "M";
    } else if (Math.abs(value) >= thousand) {
        formattedValue = value / thousand;
        suffix = "K";
    } else {
        formattedValue = value;
        suffix = "";
    }

    const formattedNumber = formattedValue.toFixed(2);

    const cleanedNumber = formattedNumber.replace(
        /\.0+$|(\.\d*[1-9])0+$/,
        "$1"
    );

    return `${cleanedNumber} ${suffix} USD`;
}

// export function debounce<T extends (...args: any[]) => void>(
//     func: T,
//     delay: number
// ): (...args: Parameters<T>) => void {
//     let timeoutId: number | undefined;
//     return (...args: Parameters<T>) => {
//         if (timeoutId !== undefined) {
//             clearTimeout(timeoutId);
//         }
//         timeoutId = window.setTimeout(() => {
//             func(...args);
//             timeoutId = undefined;
//         }, delay);
//     };
// }
