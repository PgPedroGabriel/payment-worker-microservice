import 'dotenv/config';

import Queue from './models/Queue';

(async () => {
  await Queue.connectQueue();
  await Queue.subscribe();
})();
