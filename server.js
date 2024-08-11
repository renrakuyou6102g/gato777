const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// ファイルの保存先とファイル名の設定
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));

// ファイルアップロードのエンドポイント
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('ファイルがありません');
    }
    res.json({ filePath: `/uploads/${req.file.filename}` });
});

// サーバーを開始
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
