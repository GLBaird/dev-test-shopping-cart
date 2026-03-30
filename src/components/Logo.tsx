import LogoArtwork from '@/assets/logo-placeholder.svg?react'
import type {CSSProperties} from "react";

type LogoProps = {
    width?: number,
    height?: number,
    className?: string,
    style?: CSSProperties
}

export function Logo({ width, height, className, style }: LogoProps) {
    return (
        <LogoArtwork
            width={width}
            height={height}
            className={className}
            style={style}
        />
    )
}
