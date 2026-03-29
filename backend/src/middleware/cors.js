const cors = require('cors');

/**
 * CORS Middleware Yapılandırması
 *
 * Geliştirme sırasında React frontend'in (localhost:3000)
 * Express API'ye (localhost:5000) erişimine izin verir.
 *
 * Üretimde ALLOWED_ORIGINS ortam değişkeninden okunur.
 */
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://127.0.0.1:3000'];

const corsOptions = {
  origin: (origin, callback) => {
    // Postman gibi origin olmayan araçlara izin ver
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS engellendi: ${origin} kaynağına izin verilmiyor`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

module.exports = cors(corsOptions);
