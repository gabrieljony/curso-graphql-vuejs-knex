module.export = async ({ req }) => {
  // Apenas em desenvolvimento
  await require('./simularUsuarioLogado')(req)
  const auth = req.headers.authorization;
  // console.log(auth)
};
