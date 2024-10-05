import { LocalStorage } from '@zero-dependency/storage'

const STORAGE_PREFIX = 'sfx-quiz'

export const storageQuiz = new LocalStorage<number[]>(STORAGE_PREFIX, [])
export const storageVolume = new LocalStorage(`${STORAGE_PREFIX}-volume`, 50)
