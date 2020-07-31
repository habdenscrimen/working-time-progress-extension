import { Config } from './types'

export class Percentage {
  private startTime: Date
  private endTime: Date

  constructor(private config: Config) {
    this.startTime = new Date(this.config.startTime)

    this.endTime = new Date()
    this.endTime.setHours(this.startTime.getHours() + this.config.duration)
  }

  private calculatePercentage = () => {
    const now = new Date().getTime()
    const start = this.startTime.getTime()
    const end = this.endTime.getTime()

    return Math.round(((now - start) / (end - start)) * 100)
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
