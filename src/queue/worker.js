import 'dotenv/config';
import '../configs/sentry';

import Queue from './models/Queue';

try {
  (async () => {
    await Queue.connectQueue();
    await Queue.subscribe();
  })();
} catch (e) {
  throw new Error(e.message);
}
