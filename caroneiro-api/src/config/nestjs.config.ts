export default {
  HOST_API: process.env.HOST_API || 'http://localhost',
  MAILER_MODULE_TRANSPORT:
    process.env.MAILER_MODULE_TRANSPORT ||
    'smtp://no-reply@caroneiroapp.com.br:Car069471@smtp.umbler.com',
  SECRET_OR_PRIVATE_KEY: process.env.SECRET_OR_PRIVATE_KEY || 'L2c@s2346&5%4jsdhu*!9',
  GOOGLE_CLIENT_ID:
    process.env.GOOGLE_CLIENT_ID ||
    '255898393899-sk17d4qlo1m146prsjkip62ot0thload.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'fZrfhNJ9k3mWJM49mh_rF01E',
};
