import { z } from "zod";

export class LocalStore {
    static saveToStore<T>(key: string, data: T): void {
        console.log('Saving to local storage', key)
        try {
            const serialized = JSON.stringify(data);
            localStorage.setItem(key, serialized);
        } catch (e) {
            // ignore errors such as circular structures, quota exceeded, or storage access issues.
            console.error('Failed to store data in local cache', e)
        }
    }

    static loadFromStore<TSchema extends z.ZodTypeAny>(
        key: string,
        schema: TSchema
    ): z.infer<TSchema> | null {
        console.log('Loading from local storage', key)
        try {
            const raw = localStorage.getItem(key);
            if (raw === null) return null;

            const parsedJson: unknown = JSON.parse(raw);
            const result = schema.safeParse(parsedJson);
            return result.success ? result.data : null;
        } catch (e) {
            // Covers invalid JSON and storage access issues.
            console.error('Failed to parse or load JSON', e)
            return null;
        }
    }
}