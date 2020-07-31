import { Config } from './types'

export class Percentage {
  constructor(private config: Config) {}

  private get startTime() {
    return new Date().setHours(this.config.startHours, 0, 0, 0)
  }

  private get endTime() {
    return new Date().setHours(this.config.endHours, 0, 0, 0)
  }

  private calculatePercentage = () => {
    // calculate the difference between 'start' and 'end' time
    const total = this.endTime - this.startTime
    // how much 'time' has passed now
    const passed = new Date().getTime() - this.startTime

    // update percentage
    return Math.round((passed * 100) / total)
  }

  public render = () => {
    // calculate percentage
    let percentage = this.calculatePercentage()
    // if time is up (percentage > 99), call 'onFinish' callback
    if (percentage > 99) {
      return this.config.onFinish()
    }

    // update percentage before the first render's tick
    this.config.onUpdatePercentage(percentage)

    const interval = setInterval(() => {
      // if time is up, clear interval and call 'onFinish' callback
      if (percentage > 99) {
        clearInterval(interval)
        return this.config.onFinish()
      }

      // update percentage
      this.config.onUpdatePercentage(this.calculatePercentage())
    }, 1000)
  }
}
