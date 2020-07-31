import { Percentage } from './percentage'
import { Config } from './types'

// query percentage element
const percentageElement = document.querySelector<HTMLElement>('#percentage')!
const progressLeftElement = document.querySelector<HTMLElement>('#progress-left')!

// config object
const config: Config = {
  startTime: 1596236400000,
  duration: 1, // in the hours

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
}

const percentage = new Percentage(config)

percentage.render()
