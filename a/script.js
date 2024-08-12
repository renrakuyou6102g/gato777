document.getElementById('load-video').addEventListener('click', function() {
    const videoUrl = document.getElementById('video-url').value;
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
        const iframe = document.getElementById('youtube-video');
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
    } else {
        alert('有効なYouTube URLを入力してください。');
    }
});

function extractVideoId(url) {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
        return urlObj.searchParams.get('v');
    } else if (urlObj.hostname === 'youtu.be') {
        return urlObj.pathname.slice(1);
    }
    return null;
}
