import '@testing-library/jest-dom'
import * as structuredCloneModule from '@ungap/structured-clone';
import { TextEncoder, TextDecoder } from 'util'

const structuredClonePolyfill =
    (structuredCloneModule as unknown as { default?: typeof structuredClone }).default ??
    (structuredCloneModule as unknown as typeof structuredClone)

if (!globalThis.structuredClone) {
    globalThis.structuredClone = structuredClonePolyfill as typeof structuredClone
}

if (!globalThis.TextEncoder) {
    globalThis.TextEncoder = TextEncoder as typeof globalThis.TextEncoder
}

if (!globalThis.TextDecoder) {
    globalThis.TextDecoder = TextDecoder as typeof globalThis.TextDecoder
}
