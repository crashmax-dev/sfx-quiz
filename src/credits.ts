import { el } from '@zero-dependency/dom'

// const buildDate = new Intl.DateTimeFormat('ru', {
//   dateStyle: 'long',
//   timeStyle: 'long'
// }).format(new Date(__BUILD_DATE__))

export const credits = el(
  'div',
  { className: 'credits' },
  'Сделано с',
  el('span', { className: 'heart' }, '❤️'),
  'от',
  el(
    'a',
    {
      href: '#ищинатвич',
      className: 'link',
      title: 'Лешот'
    },
    'le_xot'
  ),
  'и',
  el(
    'a',
    {
      href: '#ищинатвич',
      className: 'link',
      title: 'Всщоде'
    },
    'VS_Code'
  ),
  // el('span', { className: 'time-build' }, `Сборка ${buildDate}`)
)
