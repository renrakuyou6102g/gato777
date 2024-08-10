// app.js
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // フォームのデフォルトの送信を防ぐ

    // ユーザーが入力した検索クエリを取得
    const query = document.getElementById('search-input').value;

    // 検索結果エリアに表示
    const resultsDiv = document.getElementById('search-results');
    resultsDiv.innerHTML = `You searched for: <strong>${query}</strong>`;
});
