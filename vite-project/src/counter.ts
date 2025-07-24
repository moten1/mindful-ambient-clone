export function setupCounter(button: HTMLButtonElement): void {
  const storageKey = 'vite-counter';
  let count = Number(localStorage.getItem(storageKey)) || 0;

  const updateDisplay = (): void => {
    button.textContent = `Count is ${count}`;
  };

  button.addEventListener('click', () => {
    count++;
    localStorage.setItem(storageKey, count.toString());
    updateDisplay();
    button.classList.toggle('clicked');
  });

  updateDisplay();
}
