import { LocalStorage } from '@zero-dependency/storage'
import { Icons } from './icons'
import type { Game } from './games'

const storageVolume = new LocalStorage('sfx-quiz-volume', 50)

class AudioPlayer {
  #volume = storageVolume.value

  #currentAudio: HTMLAudioElement | undefined
  #currentGame: Game | undefined

  play(icon: HTMLImageElement, game: Game) {
    if (this.#currentGame && this.#currentAudio?.played) {
      this.#currentAudio.pause()
      this.#currentAudio = undefined
      if (this.#currentGame.name === game.name) return
    }

    this.#currentGame = game
    this.#currentAudio = new Audio(game.sfx)
    this.#updateVolume()

    this.#currentAudio.addEventListener('play', () => icon.src = Icons.Stop)
    this.#currentAudio.addEventListener('pause', () => icon.src = Icons.Play)
    this.#currentAudio.addEventListener('ended', () => {
      icon.src = Icons.Play
      this.#currentAudio = undefined
    })

    this.#currentAudio.play()
  }

  #updateVolume() {
    if (!this.#currentAudio) return
    this.#currentAudio.volume = this.#volume / 100
  }

  volume(volume: number) {
    this.#volume = volume
    this.#updateVolume()
    storageVolume.write(volume)
  }

  getVolume() {
    return this.#volume
  }
}

export const audioPlayer = new AudioPlayer()
