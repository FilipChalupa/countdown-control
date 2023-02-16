import { secondsToTime } from './secondsToTime'
import { TimeWithTotal } from './Time'

export const countdownControl = (
	handleTimeChange: (time: TimeWithTotal) => void,
) => {
	let timer: ReturnType<typeof setTimeout> | null = null
	let startedAtSecondsTotal = 0
	let countdownStartedAtMilliseconds = 0

	const now = () => Date.now()

	const start = (
		time:
			| {
					seconds?: number
					minutes?: number
					hours?: number
					days?: number
			  }
			| number,
	) => {
		if (timer !== null) {
			stop()
		}
		const seconds =
			typeof time === 'number'
				? time
				: (time.seconds ?? 0) +
				  (time.minutes ?? 0) * 60 +
				  (time.hours ?? 0) * 3600 +
				  (time.days ?? 0) * 86400

		startedAtSecondsTotal = seconds
		countdownStartedAtMilliseconds = now()
		loop()
	}

	const loop = () => {
		const nowMilliseconds = now()
		const elapsedMilliseconds = nowMilliseconds - countdownStartedAtMilliseconds
		const nextTickInMilliseconds = 1000 - (elapsedMilliseconds % 1000)
		timer = setTimeout(loop, nextTickInMilliseconds)
		callback()
	}

	const getTime = (): TimeWithTotal => {
		const nowMilliseconds = now()
		const elapsedMilliseconds = nowMilliseconds - countdownStartedAtMilliseconds
		const secondsTotal = Math.max(
			0,
			startedAtSecondsTotal - Math.floor(elapsedMilliseconds / 1000),
		)

		if (secondsTotal === 0) {
			stop()
		}
		return {
			...secondsToTime(secondsTotal),
			secondsTotal,
		}
	}

	const stop = () => {
		if (timer === null) {
			return
		}
		clearTimeout(timer)
		timer = null
	}

	const getState = () => {
		if (timer === null) {
			return 'stopped'
		}
		return 'running'
	}

	const callback = () => {
		handleTimeChange(getTime())
	}

	return {
		start,
		stop,
		getTime,
		getState,
	}
}
