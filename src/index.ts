import { Percentage } from './percentage'
import { getStartWorkingTime, getWorkingDuration } from './storage'

// query percentage element
const percentageElement = document.querySelector<HTMLElement>('#percentage')!
const progressLeftElement = document.querySelector<HTMLElement>('#progress_left')!

// start application
const start = async () => {
  // get start working time and duration from the storage
  const startWorkingTime = await getStartWorkingTime()
  const workingDuration = await getWorkingDuration()

  // set start time using data from storage
  const startTime = new Date()
  startTime.setHours(Number(startWorkingTime.hours))
  startTime.setMinutes(Number(startWorkingTime.minutes))
  startTime.setSeconds(0)
  startTime.setMilliseconds(0)

  // create a Percentage instance with event handlers
  const percentage = new Percentage({
    startTime: startTime.getTime(),
    duration: workingDuration, // in the hours

    onUpdatePercentage: (percentage) => {
      percentageElement.innerHTML = `${percentage}%`
      progressLeftElement.style.width = `${100 - percentage}%`
    },

    beforeWork: () => {
      percentageElement.classList.add('hidden')
      progressLeftElement.classList.add('hidden')
    },
    afterWork: () => {
      percentageElement.classList.add('hidden')
      progressLeftElement.classList.add('hidden')
    },
  })

  // render percentage
  percentage.render()
}

start()
