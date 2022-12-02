const koaRouter = require('koa-router');

const apiServer = require('../server/apiServer.ts');

const apiRouter = new koaRouter({ prefix: '/api/v1' });

apiRouter.post('/channel', async (ctx: any, next: any) => {
    let result = await apiServer.creatChannel(ctx.request.body.name);
    ctx.body = result;
});
apiRouter.post('/message', async (ctx: any, next: any) => {
    let result = await apiServer.createMessage(ctx.request.body);
    ctx.body = result;
});
apiRouter.get('/channel/:channelId/messages', async (ctx: any, next: any) => {
    const channelId = ctx.request.params.channelId;
    const limit = ctx.request.query.limit;
    const skip = ctx.request.query.skip;
    let result = await apiServer.getMessage(channelId, limit, skip);
    ctx.body = result;
});
module.exports = apiRouter;