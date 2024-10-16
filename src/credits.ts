import { el } from '@zero-dependency/dom'

export const credits = el(
  'div',
  { className: 'credits' },
  'Сделано с',
  el('span', { className: 'heart' }, '❤️'),
  'от',
  el(
    'span',
    {
      className: 'link',
      title: 'Лешот'
    },
    'le_xot'
  ),
  'и',
  el(
    'span',
    {
      className: 'link',
      title: 'Всщоде'
    },
    'VS_Code'
  )
)
