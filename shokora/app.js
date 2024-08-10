// app.js
document.getElementById('tweetButton').addEventListener('click', function() {
    // Get the tweet input value
    const tweetInput = document.getElementById('tweetInput').value;

    // Create a new div for the tweet
    const tweetDiv = document.createElement('div');
    tweetDiv.className = 'tweet';
    tweetDiv.textContent = tweetInput;

    // Append the new tweet to the tweet list
    const tweetList = document.getElementById('tweetList');
    tweetList.insertBefore(tweetDiv, tweetList.firstChild);

    // Clear the input box
    document.getElementById('tweetInput').value = '';
});
