import type {Milliseconds, Seconds} from "@/types/times.ts";

export function secondsToMilliseconds(time: Seconds): Milliseconds {
    return time * 1000;
}
