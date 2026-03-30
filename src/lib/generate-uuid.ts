/**
 * Generates a random UUID using crypto.randomUUID if available or browser safe fallback
 * @return uuid string
 */
export function generateUUID() {
    if (typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID()
    }

    // fallback
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = crypto.getRandomValues(new Uint8Array(1))[0] & 15
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}
