export const initComments = () => {
    const showHideBtn = document.querySelector('.show-hide');
    const commentWrapper = document.querySelector('.comment-wrapper');

    commentWrapper.style.display = 'none';

    showHideBtn.addEventListener('click', () =>  {
        const showHideText = showHideBtn.textContent;
        if(showHideText === 'Show comments') {
            showHideBtn.textContent = 'Hide comments';
            commentWrapper.style.display = 'block';
        } else {
            showHideBtn.textContent = 'Show comments';
            commentWrapper.style.display = 'none';
        }
    });

    const form = document.querySelector('.comment-form');
    const nameField = document.querySelector('#name');
    const commentField = document.querySelector('#comment');
    const list = document.querySelector('.comment-container');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const listItem = document.createElement('li');
        const namePara = document.createElement('p');
        const commentPara = document.createElement('p');
        const nameValue = nameField.value.trim();
        const commentValue = commentField.value.trim();

        if (nameValue && commentValue) {
            namePara.textContent = nameValue;
            commentPara.textContent = commentValue;

            list.appendChild(listItem);
            listItem.appendChild(namePara);
            listItem.appendChild(commentPara);

            nameField.value = '';
            commentField.value = '';
        } else {
            alert('Please fill in both fields');
        }
    });
}
