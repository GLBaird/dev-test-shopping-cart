import type { Seconds } from "@/types/times.ts";
import { secondsToMilliseconds } from "@/lib/convert-time.ts";


export function pause(time: Seconds): Promise<void> {
    return new Promise((res) => {
        setTimeout(res, secondsToMilliseconds(time))
    })
}
