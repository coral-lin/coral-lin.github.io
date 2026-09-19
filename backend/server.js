// 這個檔案用來模擬後端 API。
// 目的是讓前端先行串接假資料，等之後要接真資料庫時，前端程式碼可以保持相同結構。

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://127.0.0.1:3000').split(',').map((origin) => origin.trim()).filter(Boolean);

function sanitizeText(value) {
  return String(value || '').replace(/[<>]/g, '').trim();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('This origin is not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept']
}));
app.use(express.json({ limit: '1mb' }));

// 假資料：profile、skills、experience、focus。
// 之後若接資料庫，只需把這些資料改成從資料庫查詢即可。
const mockData = {
  profile: {
    name: '陳雅婷',
    title: 'UI / UX Designer',
    introduction: 'Designing thoughtful digital experiences.',
    avatarUrl: 'assets/portrait.jpg'
  },
  skills: [
    { id: 1, name: 'Front-end', description: 'HTML / CSS / JavaScript / React' },
    { id: 2, name: 'UI / UX', description: 'Figma / Wireframe / Prototyping' },
    { id: 3, name: 'Project Flow', description: '需求整理 / 版本控管 / 團隊溝通' },
    { id: 4, name: 'Design System', description: '元件規範 / 設計語言 / 品牌一致性' },
    { id: 5, name: 'Research', description: '使用者訪談 / 觀察 / 需求分析 / 測試' },
    { id: 6, name: 'Optimization', description: '效能調校 / RWD / 可用性改善 / 維護' }
  ],
  experience: [
    {
      id: 1,
      year: '2023',
      role: '前端工程師',
      company: 'XX Company',
      description: '負責前端頁面開發與維護，優化使用者體驗，持續提升產品介面的一致性與可用性。'
    },
    {
      id: 2,
      year: '2021',
      role: 'UI/UX 設計師',
      company: 'YY Studio',
      description: '參與品牌視覺、專案介面與互動原型，協助將需求轉為清楚且可執行的設計方向。'
    },
    {
      id: 3,
      year: '2017',
      role: '資訊管理學系',
      company: 'XX University',
      description: '學習使用者體驗、互動設計與前端基礎，建立研究與產品設計思維。'
    }
  ],
  focus: [
    {
      title: '設計',
      text: '專注於使用者研究、資訊架構、介面設計與互動優化，讓產品更直覺、更有說服力。',
      list: ['使用者導向設計', 'UI 系統建立', '原型測試', '視覺語言設計']
    },
    {
      title: '開發',
      text: '擅長將設計稿轉為高可用的前端頁面，重視程式結構、RWD 與可維護性。',
      list: ['HTML / CSS / JS', 'RWD / 響應式設計', '元件化開發', '效能優化']
    },
    {
      title: '協助',
      text: '能與設計、PM 與工程團隊協作，將需求轉成清晰執行方案並保持品質一致。',
      list: ['需求溝通', '產品優先排序', '團隊協作', '問題解決']
    }
  ]
};

// 健康檢查 API：確認後端有正常啟動。
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// 取得個人資料。
app.get('/api/profile', (req, res) => {
  res.json({
    success: true,
    data: mockData.profile
  });
});

// 取得技能列表。
app.get('/api/skills', (req, res) => {
  res.json({
    success: true,
    data: mockData.skills
  });
});

// 取得經歷列表。
app.get('/api/experience', (req, res) => {
  res.json({
    success: true,
    data: mockData.experience
  });
});

// 取得三大重點區塊資料，用來更新互動面板。
app.get('/api/focus', (req, res) => {
  res.json({
    success: true,
    data: mockData.focus
  });
});

// 這裡保留一個範例錯誤處理，方便之後接資料庫時統一格式。
app.use((err, req, res, next) => {
  console.error('伺服器錯誤：', err);
  res.status(500).json({
    success: false,
    message: '伺服器發生錯誤'
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  const safeName = sanitizeText(name).slice(0, 100);
  const safeEmail = sanitizeText(email).slice(0, 254);
  const safeMessage = sanitizeText(message).slice(0, 1000);

  if (!safeName || !safeEmail || !safeMessage) {
    return res.status(400).json({
      success: false,
      message: '姓名、電子郵件與訊息內容為必填。'
    });
  }

  if (!isValidEmail(safeEmail)) {
    return res.status(400).json({
      success: false,
      message: '電子郵件格式不正確。'
    });
  }

  console.log('收到聯絡表單：', { name: safeName, email: safeEmail });

  return res.status(200).json({
    success: true,
    message: '表單已成功送出。'
  });
});

app.listen(port, () => {
  console.log(`Mock API 已啟動，網址：http://localhost:${port}`);
});
