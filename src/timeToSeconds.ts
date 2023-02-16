import { Time } from './Time'

export const timeToSeconds = (time: Partial<Time>): number =>
	(time.seconds ?? 0) +
	(time.minutes ?? 0) * 60 +
	(time.hours ?? 0) * 3600 +
	(time.days ?? 0) * 86400
