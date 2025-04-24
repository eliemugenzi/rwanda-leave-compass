
interface Environment {
  apiUrl: string;
}

interface Config {
  development: Environment;
  production: Environment;
}

const config: Config = {
  development: {
    apiUrl: 'http://localhost:8083/api/v1',
  },
  production: {
    apiUrl: 'https://time-away-backend-production.up.railway.app/api/v1',
  },
};

const environment = import.meta.env.MODE || 'development';

export const currentConfig: Environment = config[environment as keyof Config];

