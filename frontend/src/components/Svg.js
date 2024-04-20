import { Svg, Path, Polyline, Circle, Line } from "react-native-svg"

export function HomeIcon({ color }) {
    return (
        <Svg className="feather feather-home" height="24" width="24" viewBox="0 0 24 24">
            <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <Polyline points="9 22 9 12 15 12 15 22" fill="none" stroke={color}strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </Svg>
    )
}

export function AnswerIcon({ color }) {
    return (
        <Svg className="feather feather-message-square" height="24" width="24" viewBox="0 0 24 24">
            <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </Svg>
    )
}

export function ProfileIcon({ color }) {
    return (
        <Svg className="feather feather-user" height="24" width="24" viewBox="0 0 24 24">
            <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <Circle cx="12" cy="7" r="4" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </Svg>
    )
}

export function Exit({ color, scale = 1 }) {
    const size = 24 * scale;
    return (
        <Svg className="feather feather-x" fill="none" height={size} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg">
            <Line x1="18" x2="6" y1="6" y2="18"/><Line x1="6" x2="18" y1="6" y2="18"/>
        </Svg>
    )
}
