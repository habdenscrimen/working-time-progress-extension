import {
  setStartWorkingTime,
  setWorkingDuration,
  getWorkingDuration,
  getStartWorkingTime,
} from './storage'

// query elements
const startWorkingInput = document.querySelector<HTMLInputElement>('#starting_work')!
const workingDurationInput = document.querySelector<HTMLInputElement>(
  '#working_duration',
)!

// init popup
const init = async () => {
  // get working time and duration from the storage
  const startWorking = await getStartWorkingTime()
  const workingDuration = await getWorkingDuration()

  // set default input values
  startWorkingInput.value = `${startWorking.hours}:${startWorking.minutes}`
  workingDurationInput.value = workingDuration.toString()

  // when start working input changing, save its value to storage
  startWorkingInput.addEventListener('change', function () {
    const [hours, minutes] = this.value.split(':')

    return setStartWorkingTime({ hours, minutes })
  })

  // when duration input changing, save its value to storage
  workingDurationInput.addEventListener('change', function () {
    return setWorkingDuration(Number(this.value))
  })
}

init()
