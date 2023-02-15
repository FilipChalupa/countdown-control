type Time = {
	seconds: number
	minutes: number
	hours: number
	days: number
	secondsTotal: number
}

export const countdownControl = (handleTimeChange: (time: Time) => void) => {
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

	const getTime = (): Time => {
		const nowMilliseconds = now()
		const elapsedMilliseconds = nowMilliseconds - countdownStartedAtMilliseconds
		const secondsTotal =
			startedAtSecondsTotal - Math.floor(elapsedMilliseconds / 1000)

		if (secondsTotal === 0) {
			stop()
		}

		const days = Math.floor(secondsTotal / 86400)
		const hours = Math.floor((secondsTotal - days * 86400) / 3600)
		const minutes = Math.floor(
			(secondsTotal - days * 86400 - hours * 3600) / 60,
		)
		const seconds = secondsTotal % 60
		return {
			seconds,
			minutes,
			hours,
			days,
			secondsTotal,
		}
	}

	const stop = () => {
		if (timer === null) {
			return
		}
		clearTimeout(timer)
	}

	const getState = () => {
		if (timer === null) {
			return 'stopped'
		}
		return 'started'
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
