# Countdown control [![npm](https://img.shields.io/npm/v/countdown-control.svg)](https://www.npmjs.com/package/countdown-control) ![npm type definitions](https://img.shields.io/npm/types/countdown-control.svg)

## Installation

```bash
npm install countdown-control
```

## Usage

### HTML

```html
<time id="seconds"></time>
<button id="start">Start</button>
<button id="stop">Stop</button>
```

### JavaScript

```js
import { countdownControl } from 'countdown-control'

const seconds = document.querySelector('#seconds')
const start = document.querySelector('#start')
const stop = document.querySelector('#stop')

const handleChange = (time) => {
	seconds.textContent = time.secondsTotal
}

const countdown = countdownControl(handleChange)

start.addEventListener('click', () => {
	countdownControl.start(60) // Set the countdown to 60 seconds
})

stop.addEventListener('click', () => {
	countdownControl.stop()
})
```

## Demo

For more complex example check [code here](demo/index.html#L52) or live [demo here](https://filipchalupa.cz/countdown-control/).
