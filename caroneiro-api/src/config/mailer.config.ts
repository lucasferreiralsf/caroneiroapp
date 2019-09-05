import { HandlebarsAdapter } from '@nest-modules/mailer';
import * as path from 'path';

export default {
  transport:
    process.env.MAILER_MODULE_TRANSPORT ||
    'smtp://no-reply@caroneiroapp.com.br:Car069471@smtp.umbler.com',
  defaults: {
    from: '"CaroneiroAPP" <no-replay@caroneiroapp.com.br>',
  },
  template: {
    dir: path.resolve('templates'),
    adapter: new HandlebarsAdapter(), // or new PugAdapter()
    options: {
      strict: true,
    },
  },
};
