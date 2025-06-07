module.exports = {
  apps: [
    {
      name: 'resume-roaster-backend',
      script: './backend/server.js',
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'resume-roaster-frontend',
      script: 'cd ./frontend && npm run preview',
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}; 