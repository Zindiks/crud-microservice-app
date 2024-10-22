import { Movies } from '../models/movies.model';
import { logger } from '../utils/logger';

const verifySeed = async () => {
  try {
    const movies = await Movies.findAll();
    logger.info('Current movies in database:', movies);
  } catch (error) {
    logger.error('Error verifying seed:', error);
  }
};

verifySeed();
