import { el } from '@zero-dependency/dom'

import { audioPlayer } from './player'
import { render } from './render'
import { storageQuiz } from './store'

const volumeRange = el('input', {
  className: 'volume-range',
  type: 'range',
  value: `${audioPlayer.getVolume()}`,
  min: '0',
  max: '100',
  oninput: (event) => {
    const volume = Number((event.target as HTMLInputElement).value)
    if (Number.isNaN(volume)) return
    audioPlayer.volume(volume)
  }
})

const resetButton = el(
  'button',
  {
    className: 'reset-button',
    onclick: () => {
      const isConfirm = confirm('Вы уверены, что хотите сбросить прогресс?')
      if (!isConfirm) return
      storageQuiz.write([])
      render()
    }
  },
  'Сбросить прогресс'
)

export const header = el(
  'header',
  { className: 'header' },
  el('h1', { className: 'title' }, 'SFX Quiz'),
  el('span', { className: 'easter-egg' }, atob('cnVEaW1ibyBmcmVhaw==')),
  el(
    'div',
    { className: 'controls' },
    el('label', { className: 'volume-label' }, 'Громкость', volumeRange),
    resetButton
  )
)
