document.addEventListener('DOMContentLoaded', function() {
    loadPosts();
});

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const commentInput = document.getElementById('commentInput');

    if (fileInput.files.length === 0 || commentInput.value === '') {
        alert('ファイルとコメントを選択してください');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const post = {
            type: file.type,
            content: e.target.result,
            comment: commentInput.value
        };

        savePost(post);
        addPostToDOM(post);

        // フォームをリセット
        fileInput.value = '';
        commentInput.value = '';
    };

    reader.readAsDataURL(file);
});

function savePost(post) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(post => addPostToDOM(post));
}

function addPostToDOM(post) {
    const postsContainer = document.getElementById('postsContainer');
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    if (post.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = post.content;
        postElement.appendChild(img);
    } else if (post.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.src = post.content;
        video.controls = true;
        postElement.appendChild(video);
    }

    const commentElement = document.createElement('p');
    commentElement.classList.add('comment');
    commentElement.textContent = post.comment;
    postElement.appendChild(commentElement);

    postsContainer.appendChild(postElement);
}
