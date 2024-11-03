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

transcriptBtn.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    transcriptBtn.click();
    e.preventDefault();
  }
});
