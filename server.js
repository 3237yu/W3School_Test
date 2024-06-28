import jsonServer from 'json-server';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// 获取当前模块的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

// 处理访问统计数据
server.post('/visits', (req, res) => {
    const visit = req.body;
    visit.timestamp = new Date();
    router.db.get('visits').push(visit).write();
    res.status(201).json(visit);
});

// 处理用户登录请求
server.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = router.db.get('users').value();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.status(200).json({ success: true, username: user.username, isAdmin: user.isAdmin });
    } else {
        res.status(401).json({ success: false });
    }
});

server.use(router);

server.listen(3000, () => {
    console.log('JSON Server is running on port 3000');
});
