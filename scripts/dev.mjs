import { createServer } from 'vite';
import { spawn } from 'node:child_process';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.once('error', () => resolve(false));
    server.listen(port, '127.0.0.1', () => {
      server.close(() => resolve(true));
    });
  });
}

async function findFreePort(startPort) {
  for (let port = startPort; port < startPort + 200; port += 1) {
    if (await isPortFree(port)) {
      return port;
    }
  }
  throw new Error(`No free port found in range ${startPort}-${startPort + 199}`);
}

function getElectronBin() {
  const binName = process.platform === 'win32' ? 'electron.cmd' : 'electron';
  return path.resolve(projectRoot, 'node_modules', '.bin', binName);
}

async function main() {
  process.chdir(projectRoot);

  const port = await findFreePort(15173);
  const devUrl = `http://localhost:${port}`;

  const viteServer = await createServer({
    clearScreen: false,
    server: {
      port,
      strictPort: true,
      host: 'localhost',
    },
  });

  await viteServer.listen();
  viteServer.printUrls();

  const electronBin = getElectronBin();
  const env = {
    ...process.env,
    VITE_DEV_SERVER_URL: devUrl,
  };

  const electron = process.platform === 'win32' ?
    spawn(process.env.ComSpec || 'cmd.exe', ['/c', electronBin, '.'], {
      stdio: 'inherit',
      cwd: projectRoot,
      env,
    }) :
    spawn(electronBin, ['.'], {
      stdio: 'inherit',
      cwd: projectRoot,
      env,
    });

  const cleanup = async () => {
    try {
      electron.kill();
    } catch {
    }
    try {
      await viteServer.close();
    } catch {
    }
  };

  process.on('SIGINT', async () => {
    await cleanup();
    process.exit(0);
  });
  process.on('SIGTERM', async () => {
    await cleanup();
    process.exit(0);
  });

  electron.on('exit', async (code) => {
    await cleanup();
    process.exit(code ?? 0);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
