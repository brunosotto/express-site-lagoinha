// configuração de execução no pm2
module.exports = {
  apps: [
    {
      name: "express-site-lagoinha-production-8093",
      script: "start.js",
      watch: false,
      env: {
        PORT: 8093,
        NODE_ENV: "production",
      }
    }
  ]
}
