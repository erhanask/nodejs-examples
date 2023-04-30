// first run `npm install koa` in the terminal
const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
    const url = ctx.url === '/' ? 'home' : ctx.url.substr(1);

    if (url === 'about' || url === 'contact' || url === 'home') {
        ctx.response.body = `<h1>Welcome to ${url} page.</h1>`;
    } else {
        ctx.response.body = `<h1>Error page not found.</h1>`;
    }
});

app.listen(3000);