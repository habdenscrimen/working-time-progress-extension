export interface Config {
  startTime: number
  duration: number

  onUpdatePercentage: (percentage: number) => void

  beforeWork: () => void
  afterWork: () => void
}

export interface StartWorkingTime {
  hours: string
  minutes: string
}
