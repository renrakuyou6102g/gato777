document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const commentInput = document.getElementById('commentInput');

    if (fileInput.files.length === 0 || commentInput.value === '') {
        alert('ファイルとコメントを選択してください');
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('comment', commentInput.value);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.filePath) {
            addPostToDOM(data.filePath, commentInput.value);
        }
    })
    .catch(error => console.error('Error:', error));

    // フォームをリセット
    fileInput.value = '';
    commentInput.value = '';
});

function addPostToDOM(filePath, comment) {
    const postsContainer = document.getElementById('postsContainer');
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const ext = filePath.split('.').pop();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext.toLowerCase())) {
        const img = document.createElement('img');
        img.src = filePath;
        postElement.appendChild(img);
    } else if (['mp4', 'webm', 'ogg'].includes(ext.toLowerCase())) {
        const video = document.createElement('video');
        video.src = filePath;
        video.controls = true;
        postElement.appendChild(video);
    }

    const commentElement = document.createElement('p');
    commentElement.classList.add('comment');
    commentElement.textContent = comment;
    postElement.appendChild(commentElement);

    postsContainer.appendChild(postElement);
}
