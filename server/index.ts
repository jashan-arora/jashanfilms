import { createServer as createViteServer } from 'vite';

const port = 4200;

async function startServer() {
  const vite = await createViteServer({
    server: {
      port: port,
      host: 'localhost'
    },
    configFile: './vite.config.ts'
  });

  await vite.listen();
  console.log(`Server running on http://localhost:${port}`);
}

startServer().catch(console.error);