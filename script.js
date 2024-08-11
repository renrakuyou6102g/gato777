document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const commentInput = document.getElementById('commentInput');
    const postsContainer = document.getElementById('postsContainer');

    if (fileInput.files.length === 0 || commentInput.value === '') {
        alert('ファイルとコメントを選択してください');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = e.target.result;
            postElement.appendChild(img);
        } else if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.src = e.target.result;
            video.controls = true;
            postElement.appendChild(video);
        }

        const commentElement = document.createElement('p');
        commentElement.classList.add('comment');
        commentElement.textContent = commentInput.value;
        postElement.appendChild(commentElement);

        postsContainer.appendChild(postElement);

        // フォームをリセット
        fileInput.value = '';
        commentInput.value = '';
    };

    reader.readAsDataURL(file);
});
