export interface Config {
  startTime: number
  duration: number

  onUpdatePercentage: (percentage: number) => void
  onFinish: () => void
}
