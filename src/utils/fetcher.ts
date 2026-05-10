export async function fetchGet<T>(endpoint: string, options: RequestInit = {}): Promise<T> {

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`Failed to GET from ${endpoint}.`);
    }

    return response.json() as Promise<T>;

}