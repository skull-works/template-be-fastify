import fastify from 'fastify'
import * as closeWithGrace from 'close-with-grace';
import AppService from './app';

const server = fastify({
  logger: {
    prettyPrint: {
      colorize: true,
      ignore: 'hostname,pid,reqId',
      translateTime: 'SYS:standard',
      timestampKey: 'time',
    },
    serializers: {
      req (request) {
        return {
          method: request.method,
          url: request.url,
        }
      }
    }
  }
})

// register the main application
server.register(AppService);

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace({ delay: 500 }, async function ({ signal, err, manual }: any) {
  if (err) {
    server.log.error(err)
  }
  await server.close()
})

server.addHook('onClose', async (_instance, done) => {
  closeListeners.uninstall()
  done()
})

server.listen(3000, (err, address) => {
  if (err) {
    server.log.info('hey');
    server.log.error(err)
    process.exit(1)
  }
})