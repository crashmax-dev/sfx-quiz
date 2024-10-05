import { LocalStorage } from '@zero-dependency/storage'
import { GAMES, type Game } from './games'
import { el } from '@zero-dependency/dom'
import { audioPlayer } from './player'
import { Icons } from './icons'
import './style.css'

const storageQuiz = new LocalStorage<number[]>('sfx-quiz', [])
const app = document.querySelector<HTMLElement>('#app')!

const volume = el('input', {
  className: 'volume-slider',
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

const resetButton = el('button', {
  className: 'reset-button',
  onclick: () => {
    const isConfirm = confirm('Вы уверены, что хотите сбросить прогресс?')
    if (!isConfirm) return
    storageQuiz.write([])
    render()
  }
}, 'Сбросить прогресс')

const volumeLabel = el(
  'label', { className: 'volume-label' },
  'Громкость',
  volume
)

const container = el(
  'div', { className: 'container' },
  el('header', { className: 'header' },
    el('h1', { className: 'title' }, 'SFX Quiz'),
    el('span', { className: 'easter-egg' }, atob('cnVEaW1ibyBmcmVhaw==')),
    el('div', { className: 'controls' }, volumeLabel, resetButton)
  )
)

const credits = el(
  'div', { className: 'credits' },
  'Сделано с',
  el('span', { className: 'heart' }, '❤️'),
  'от',
  el('a', {
    href: '#ищинатвич',
    className: 'link',
    title: 'Лешот'
  }, 'le_xot'),
  'и',
  el('a', {
    href: '#ищинатвич',
    className: 'link',
    title: 'Всщоде'
  }, 'VS_Code'),
)

const grid = el('div', { className: 'grid' })
const progress = el('div', { className: 'progress' })

function render() {
  const progressFilled = el('div', { className: 'progress-filled' })
  const progressCounter = el('div', { className: 'progress-counter' })
  progress.replaceChildren(progressFilled, progressCounter)

  const gridItems: HTMLElement[] = []

  for (const [index, game] of Object.entries(GAMES)) {
    const gameIndex = Number(index)
    const item = el('div', { className: 'grid-item' })

    const buttonIcon = el('img', { src: Icons.Play })
    const button = el('button', {
      className: 'play-button',
      onclick: () => audioPlayer.play(buttonIcon, game)
    }, buttonIcon)

    const input = el('input', {
      className: 'input',
      placeholder: `Игра #${gameIndex + 1}`,
      oninput: (event) => {
        const isSolved = checkAnswer(event, game)
        if (isSolved) {
          inputSolved(input, game)
          storageQuiz.write((value) => {
            value.push(gameIndex)
            return value
          })
          updateProgressCounter(progressFilled, progressCounter)
        }
      }
    })

    if (storageQuiz.value.includes(gameIndex)) {
      inputSolved(input, game)
    }

    item.append(input, button)
    gridItems.push(item)
  }

  grid.replaceChildren(...gridItems)
  updateProgressCounter(progressFilled, progressCounter)
  container.append(grid, progress, credits)
}

render()
app.append(container)

function formatText(text: string) {
  return text.match(/([A-Za-zА-Яа-я0-9])/gm)?.join('').toLowerCase()
}

function checkAnswer(event: Event, game: Game) {
  const value = formatText((event.target as HTMLInputElement).value)
  if (
    value === formatText(game.name) ||
    game.answers.some((answer) => formatText(answer) === value)
  ) return true
  return false
}

function inputSolved(input: HTMLInputElement, game: Game) {
  input.classList.add('solved')
  input.value = game.name
  input.disabled = true
}

function updateProgressCounter(fill: HTMLElement, counter: HTMLElement) {
  const progressPercentage = (storageQuiz.value.length / GAMES.length) * 100
  fill.style.width = `${progressPercentage}%`
  counter.textContent = `${storageQuiz.value.length}/${GAMES.length}`
}
