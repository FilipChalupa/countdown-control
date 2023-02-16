import { Time } from './Time'

export const secondsToTime = (secondsTotal: number): Time => {
	const days = Math.floor(secondsTotal / 86400)
	const hours = Math.floor((secondsTotal - days * 86400) / 3600)
	const minutes = Math.floor((secondsTotal - days * 86400 - hours * 3600) / 60)
	const seconds = secondsTotal % 60

	return {
		seconds,
		minutes,
		hours,
		days,
	}
}
