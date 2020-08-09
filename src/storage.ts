/**
 * Storage layer needs to
 * 1. share data between popup and the main app
 * 2. store popup data in the Chrome storage
 */

import { StartWorkingTime } from './types'

export const setStartWorkingTime = ({ hours, minutes }: StartWorkingTime) =>
  new Promise((resolve) => {
    chrome.storage.sync.set({ startWorkingTime: { hours, minutes } }, resolve)
  })

export const getStartWorkingTime = (): Promise<StartWorkingTime> =>
  new Promise((resolve) => {
    chrome.storage.sync.get('startWorkingTime', (result) => {
      resolve({
        hours: result?.startWorkingTime?.hours || '09',
        minutes: result?.startWorkingTime?.minutes || '00',
      })
    })
  })

export const setWorkingDuration = (value: number) => {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ workingDuration: value }, resolve)
  })
}

export const getWorkingDuration = (): Promise<number> =>
  new Promise((resolve) => {
    chrome.storage.sync.get('workingDuration', (result) => {
      resolve(result?.workingDuration || 8)
    })
  })
