import { el } from '@zero-dependency/dom'

export const credits = el(
  'div',
  { className: 'credits' },
  'Сделано с',
  el('span', { className: 'heart' }, '❤️'),
  'от',
  el(
    'a',
    {
      href: '#',
      className: 'link',
      title: 'Лешот'
    },
    'le_xot'
  ),
  'и',
  el(
    'a',
    {
      href: '#',
      className: 'link',
      title: 'Всщоде'
    },
    'VS_Code'
  )
)
