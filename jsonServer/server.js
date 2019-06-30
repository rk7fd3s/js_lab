const path = require('path');

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));
const middlewares = jsonServer.defaults()

// ミドルウェアの設定 (コンソール出力するロガーやキャッシュの設定など)
server.use(middlewares);

// デフォルトで500ミリ秒遅延
server.use(function (req, res, next) {
  setTimeout(next, 500);
});

// db.json を基にデフォルトのルーティングを設定する
server.use(router);

server.listen(9090, () => {
  console.log('JSON Server is running');
});
