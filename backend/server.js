const app = require('./app');

// Veritabanını başlat (import sırasında otomatik çalışır)
require('./src/db/database');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

const server = app.listen(PORT, HOST, () => {
  console.log('');
  console.log('🚀 ===================================');
  console.log(`🌐  Bulut Bilişim Todo API`);
  console.log('=====================================');
  console.log(`📡  Sunucu  : http://${HOST}:${PORT}`);
  console.log(`🏥  Sağlık  : http://${HOST}:${PORT}/api/health`);
  console.log(`📋  Görevler: http://${HOST}:${PORT}/api/todos`);
  console.log(`🌍  Ortam   : ${process.env.NODE_ENV || 'development'}`);
  console.log('=====================================');
  console.log('');
});

// Beklenmeyen kapanmaları yakala
process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM alındı. Sunucu kapatılıyor...');
  server.close(() => {
    console.log('✅ Sunucu güvenli şekilde kapatıldı.');
    process.exit(0);
  });
});

process.on('uncaughtException', (err) => {
  console.error('❌ Yakalanmamış hata:', err);
  process.exit(1);
});

module.exports = server;
