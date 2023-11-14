const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer([
  '📄 Aquí tenemos el flujo secundario',
]);

const flowDocs = addKeyword([
  'doc',
  'documentacion',
  'documentación',
]).addAnswer(
  [
    '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
    'https://bot-whatsapp.netlify.app/',
    '\n*2* Para siguiente paso.',
  ],
  null,
  null,
  [flowSecundario],
);

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
  [
    '🙌 Aquí encontras un ejemplo rapido',
    'https://bot-whatsapp.netlify.app/docs/example/',
    '\n*2* Para siguiente paso.',
  ],
  null,
  null,
  [flowSecundario],
);

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
  [
    '🚀 Puedes aportar tu granito de arena a este proyecto',
    '[*opencollective*] https://opencollective.com/bot-whatsapp',
    '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
    '[*patreon*] https://www.patreon.com/leifermendez',
    '\n*2* Para siguiente paso.',
  ],
  null,
  null,
  [flowSecundario],
);

const flowDiscord = addKeyword(['discord']).addAnswer(
  [
    '🤪 Únete al discord',
    'https://link.codigoencasa.com/DISCORD',
    '\n*2* Para siguiente paso.',
  ],
  null,
  null,
  [flowSecundario],
);

const linkedinSecondaryFlow = addKeyword([
  'si',
  'sí',
  'dale',
  'va',
  'claro',
  'siguiente',
]).addAnswer([
  'Aquí esta mi linkedin',
  'https://www.linkedin.com/in/angelcruzl/',
  'No olvides conectar conmigo 🌎',
]);

const portfolioFlow = addKeyword(['web', 'portfolio', 'portafolio']).addAnswer(
  [
    '💻 Aquí esta mi portfolio',
    'https://angelcruzl.dev',
    '¿Te interesa ver también mi linkedin?',
  ],
  null,
  null,
  [linkedinSecondaryFlow],
);

const portfolioSecondaryFlow = addKeyword([
  'si',
  'sí',
  'dale',
  'va',
  'claro',
  'siguiente',
]).addAnswer(['Aquí esta mi portfolio', 'https://angelcruzl.dev']);

const linkedinFlow = addKeyword(['linkedin', 'link']).addAnswer(
  [
    '💻 Aquí esta mi linkedin',
    'https://www.linkedin.com/in/angelcruzl/',
    '¿Te interesa ver también mi portfolio?',
  ],
  null,
  null,
  [portfolioSecondaryFlow],
);

const mainFlow = addKeyword(['hola', 'ole', 'alo', 'ola', 'que onda', 'wenas'])
  .addAnswer('Hola bienvenido a este *Chatbot* 🫡')
  // .addAnswer(
  //   'En este momento me encuentro en desarrollo pero espero pronto poder ayudarte',
  // )
  .addAnswer(
    [
      'Actualmente estoy en fase de pruebas 🛠️',
      '\nPero mientras puedes ir a ver mi portfolio web o buscarme en linkedin para una comunicación mas directa\n',
      '*web*: para ver mi portfolio',
      '*linkedin*: para ver mi perfil',
    ],
    null,
    null,
    [portfolioFlow, linkedinFlow],
  );

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([mainFlow]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
