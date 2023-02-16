export type Time = {
	seconds: number
	minutes: number
	hours: number
	days: number
}

export type TimeWithTotal = Time & {
	secondsTotal: number
}
