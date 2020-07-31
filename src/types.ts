export interface Config {
  startHours: number
  endHours: number

  onUpdatePercentage: (percentage: number) => void
  onFinish: () => void
}
