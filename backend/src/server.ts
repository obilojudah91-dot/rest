import app from './app';
import { logger } from './utils/logger';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
  logger.info(`Environment: ${process.env.NODE_ENV}`);
  logger.info(`API Documentation: http://localhost:${port}/api-docs`);
});

export default app;
