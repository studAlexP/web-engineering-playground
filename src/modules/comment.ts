export const initComments = () => {
  const showHideBtn = document.querySelector('.show-hide') as HTMLElement;
  const commentWrapper = document.querySelector(
    '.comment-wrapper'
  ) as HTMLElement;

  commentWrapper.style.display = 'none';

  const show_text = 'Show comments';
  const hide_text = 'Hide comments';

  showHideBtn.onclick = () => {
    const showHideText = showHideBtn.textContent;
    if (showHideText === show_text) {
      showHideBtn.textContent = hide_text;
      commentWrapper.style.display = 'block';
    } else {
      showHideBtn.textContent = show_text;
      commentWrapper.style.display = 'none';
    }
  };

  const form = document.querySelector('.comment-form') as HTMLElement;
  const nameField = document.querySelector('#name') as HTMLInputElement;
  const commentField = document.querySelector(
    '#comment'
  ) as HTMLTextAreaElement;
  const list = document.querySelector('.comment-container') as HTMLElement;

  form.onsubmit = (e) => {
    e.preventDefault();
    const listItem = document.createElement('li');
    const namePara = document.createElement('p');
    const commentPara = document.createElement('p');
    const nameValue = nameField.value;
    const commentValue = commentField.value;

    namePara.textContent = nameValue;
    commentPara.textContent = commentValue;

    list.appendChild(listItem);
    listItem.appendChild(namePara);
    listItem.appendChild(commentPara);

    nameField.value = '';
    commentField.value = '';
  };
};
