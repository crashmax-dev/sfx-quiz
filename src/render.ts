import { el } from '@zero-dependency/dom'

import { credits } from './credits'
import { GAMES } from './games'
import { Icons } from './icons'
import { audioPlayer } from './player'
import { storageQuiz } from './store'
import type { Game } from './games'

const grid = el('div', { className: 'grid' })
const progress = el('div', { className: 'progress' })

export function render() {
  const gameItems: HTMLElement[] = []

  const progressFill = el('div', { className: 'progress-fill' })
  const progressCounter = el('div', { className: 'progress-counter' })
  progress.replaceChildren(progressFill, progressCounter)

  for (const [index, game] of Object.entries(GAMES)) {
    const gameIndex = Number(index)
    const gameItem = el('div', { className: 'grid-item' })

    const buttonIcon = el('img', { src: Icons.Play })
    const buttonPlay = el(
      'button',
      {
        className: 'play-button',
        onclick: () => audioPlayer.play(buttonIcon, game)
      },
      buttonIcon
    )

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
          updateProgress(progressFill, progressCounter)
        }
      }
    })

    if (storageQuiz.value.includes(gameIndex)) {
      inputSolved(input, game)
    }

    gameItem.append(input, buttonPlay)
    gameItems.push(gameItem)
  }

  grid.replaceChildren(...gameItems)
  updateProgress(progressFill, progressCounter)

  return [
    grid,
    progress,
    credits
  ]
}

function formatText(text: string) {
  return text
    .match(/([A-Za-zА-Яа-я0-9])/gm)
    ?.join('')
    .toLowerCase()
}

function checkAnswer(event: Event, game: Game) {
  const value = formatText((event.target as HTMLInputElement).value)
  if (
    value === formatText(game.name) ||
    game.answers.some((answer) => formatText(answer) === value)
  )
    return true
  return false
}

function inputSolved(input: HTMLInputElement, game: Game) {
  input.classList.add('solved')
  input.value = game.name
  input.disabled = true
}

export function updateProgress(fill: HTMLElement, counter: HTMLElement) {
  const progressPercentage = (storageQuiz.value.length / GAMES.length) * 100
  fill.style.width = `${progressPercentage}%`
  counter.textContent = `${storageQuiz.value.length}/${GAMES.length}`
}
