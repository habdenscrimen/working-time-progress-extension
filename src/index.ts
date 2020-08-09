import { Percentage } from './percentage'
import { getStartWorkingTime, getWorkingDuration } from './storage'

// query percentage element
const percentageElement = document.querySelector<HTMLElement>('#percentage')!
const progressLeftElement = document.querySelector<HTMLElement>('#progress_left')!
const messageContainerElement = document.querySelector<HTMLElement>('#message_container')!

/** Hide html elements. */
const hideElements = (elements: HTMLElement[]) => {
  elements.forEach((element) => {
    element.classList.add('hidden')
  })
}

/** Show html elements. */
const showElements = (elements: HTMLElement[]) => {
  elements.forEach((element) => {
    element.classList.remove('hidden')
  })
}

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
      hideElements([messageContainerElement])
      showElements([percentageElement, progressLeftElement])

      percentageElement.innerHTML = `${percentage}%`
      progressLeftElement.style.width = `${100 - percentage}%`
    },

    beforeWork: () => {
      hideElements([percentageElement, progressLeftElement])

      messageContainerElement.innerHTML = 'Rest before your work ✋'
      showElements([messageContainerElement])
    },
    afterWork: () => {
      hideElements([percentageElement, progressLeftElement])

      messageContainerElement.innerHTML = 'You’ve done well 🎉'
      showElements([messageContainerElement])
    },
  })

  // render percentage
  percentage.render()
}

start()
