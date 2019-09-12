module.exports = {
  apps : [{
    name: 'rest-api-skeleton',
    script: 'src/pm2-index.js',
    node_args: '-r esm',
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      DB_HOST: 'localhost',
      DB_USER: 'postgres',
      DB_PASS: '',
      DB_NAME: 'rest-api-skeleton',
      JWT_SECRET: 'secret',
      ADMIN_LOGIN: 'admin',
      ADMIN_PASS: 'admin'
    }
  }]
};
