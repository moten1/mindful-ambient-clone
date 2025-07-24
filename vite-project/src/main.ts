import './tailwind.css' // Tailwind CSS
import typescriptLogo from './assets/typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter'

// Root app element
const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Root element #app not found')

// Inject HTML
app.innerHTML = `
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 via-white to-blue-100 p-6 text-center">
    <div class="flex gap-8 mb-6">
      <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
        <img src="${viteLogo}" class="h-16 hover:scale-110 transition-transform duration-300" alt="Vite logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
        <img src="${typescriptLogo}" class="h-16 hover:scale-110 transition-transform duration-300" alt="TypeScript logo" />
      </a>
    </div>
    <h1 class="text-4xl font-extrabold text-gray-800 mb-4">Welcome to <span class="text-purple-600">Mindful Ambient</span></h1>
    <div class="bg-white rounded-lg shadow-md p-6">
      <button id="counter" type="button" class="px-6 py-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition">Click me</button>
    </div>
    <p class="mt-6 text-sm text-gray-600">
      Explore more by clicking the logos above.
    </p>
  </div>
`

// Setup counter button
const counterButton = document.querySelector<HTMLButtonElement>('#counter')
if (counterButton) {
  setupCounter(counterButton)
} else {
  console.warn('Counter button not found')
}

// Ambient audio setup
const ambientAudio = new Audio('/assets/soundtrack.mp3')
ambientAudio.loop = true
ambientAudio.volume = 0.4

// Play audio on first interaction (browser autoplay policy compliance)
const enableAudio = () => {
  ambientAudio.play().catch((err) => {
    console.warn('Autoplay failed:', err)
  })
  document.removeEventListener('click', enableAudio)
  document.removeEventListener('touchstart', enableAudio)
}
document.addEventListener('click', enableAudio)
document.addEvent
