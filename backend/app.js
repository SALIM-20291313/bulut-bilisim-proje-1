const express = require('express');
const dotenv = require('dotenv');
const corsMiddleware = require('./src/middleware/cors');
const todoRoutes = require('./src/routes/todoRoutes');

// .env dosyasını yükle
dotenv.config();

const app = express();

// ─── Middleware'ler ────────────────────────────────────────────────────────────
app.use(corsMiddleware);                    // CORS
app.use(express.json());                    // JSON body parser
app.use(express.urlencoded({ extended: true })); // URL-encoded body parser

// ─── Sağlık Kontrolü ──────────────────────────────────────────────────────────
/**
 * @route   GET /api/health
 * @desc    API'nin çalışıp çalışmadığını kontrol et
 * @access  Public
 */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API çalışıyor ✅',
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    },
  });
});

// ─── API Rotaları ──────────────────────────────────────────────────────────────
app.use('/api/todos', todoRoutes);

// ─── Ana Rota ─────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bulut Bilişim Dersi — Todo API\'ye hoş geldiniz!',
    data: {
      docs: 'Mevcut endpoint\'ler:',
      endpoints: {
        health:   'GET  /api/health',
        listAll:  'GET  /api/todos',
        stats:    'GET  /api/todos/stats',
        getOne:   'GET  /api/todos/:id',
        create:   'POST /api/todos',
        update:   'PUT  /api/todos/:id',
        delete:   'DELETE /api/todos/:id',
      },
    },
  });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Rota bulunamadı: ${req.method} ${req.originalUrl}`,
    data: null,
  });
});

// ─── Global Hata Handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Sunucu hatası:', err.message);
  res.status(500).json({
    success: false,
    message: err.message || 'Beklenmeyen bir sunucu hatası oluştu',
    data: null,
  });
});

module.exports = app;
