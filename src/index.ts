import { container } from './container'
import { render } from './render'

import './style.css'

const app = document.querySelector<HTMLElement>('#app')!
const game = render()

container.append(...game)
app.append(container)
