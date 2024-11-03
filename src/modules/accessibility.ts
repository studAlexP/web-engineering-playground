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

const showCommentsBtn = document.querySelector('.show-hide') as HTMLElement;
const commentWrapper = document.querySelector(
  '.comment-wrapper'
) as HTMLElement;

showCommentsBtn.onclick = function () {
  if (
    commentWrapper.style.display === 'none' ||
    commentWrapper.style.display === ''
  ) {
    commentWrapper.style.display = 'block';
    showCommentsBtn.textContent = 'Hide comments';
  } else {
    commentWrapper.style.display = 'none';
    showCommentsBtn.textContent = 'Show comments';
  }
};

showCommentsBtn.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    showCommentsBtn.click();
    e.preventDefault();
  }
});
