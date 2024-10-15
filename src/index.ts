import { container } from './container'
import { render } from './render'
import { splashScreen } from './splash-screen'

import './styles/main.scss'

splashScreen.init()
splashScreen.onInit(() => {
  const app = document.querySelector<HTMLElement>('#app')!
  app.classList.add('background')

  const game = render()
  container.append(...game)
  app.append(container)
})
