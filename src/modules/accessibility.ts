const transcript = document.querySelector('.transcript') as HTMLElement;
const transcriptBtn = document.querySelector(
  '.transcript-container button'
) as HTMLButtonElement;

transcriptBtn.onclick = function () {
  if (transcriptBtn.textContent === 'Show transcript') {
    transcript.style.height = '150px';
    transcriptBtn.textContent = 'Hide transcript';
  } else {
    transcript.style.height = '0';
    transcriptBtn.textContent = 'Show transcript';
  }
};

document.onkeydown = (e: KeyboardEvent): void => {
  if (e.key === 'Enter') {
    const activeElement = document.activeElement as HTMLElement;
    activeElement?.click();
  }
};
