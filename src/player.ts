import PlayIcon from './assets/play.svg'
import StopIcon from './assets/stop.svg'
import { storageVolume } from './store'
import type { Game } from './games'

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

    this.#currentAudio.addEventListener('play', () => (icon.src = StopIcon))
    this.#currentAudio.addEventListener('pause', () => (icon.src = PlayIcon))
    this.#currentAudio.addEventListener('ended', () => {
      icon.src = PlayIcon
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
