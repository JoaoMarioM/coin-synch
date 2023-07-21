type DebounceCallback = (...args: any[]) => void;

export function debounce(callback: DebounceCallback, delay: number): DebounceCallback {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    return function (...args: any[]) {
        if (timeoutId) clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}
