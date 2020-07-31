import { Config } from './types'

export class Percentage {
  private startDate: Date
  private endDate: Date

  constructor(private config: Config) {
    this.startDate = new Date(this.config.startTime)
    this.endDate = new Date(this.config.startTime + this.config.duration * 60 * 60 * 1000)
  }

  get nowTime() {
    return new Date().getTime()
  }

  get startTime() {
    return this.startDate.getTime()
  }

  get endTime() {
    return this.endDate.getTime()
  }

  get status() {
    return this.nowTime > this.endTime
      ? 'after'
      : this.nowTime < this.startTime
      ? 'before'
      : 'ok'
  }

  private calculatePercentage = () => {
    return Math.round(
      ((this.nowTime - this.startTime) / (this.endTime - this.startTime)) * 100,
    )
  }

  private makeMagic = () => {
    if (this.status === 'after') {
      return this.config.afterWork()
    }

    if (this.status === 'before') {
      return this.config.beforeWork()
    }

    if (this.status === 'ok') {
      return this.config.onUpdatePercentage(this.calculatePercentage())
    }
  }

  public render = () => {
    this.makeMagic()

    setInterval(this.makeMagic, 1000)
  }
}
