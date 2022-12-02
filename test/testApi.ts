import { describe, it } from 'mocha';
import assert from 'assert';
import { reqOfGet, reqOfPost, createChannelById, delChannelById, clearChannel, clearMessage, createMessagesBychannel } from './testUtil';

describe('test api', function () {
    const testChannelId = 'test';
    const channelNotExist = '123';
    describe('test create channel api', function () {
        afterEach(function () {
            clearChannel();
        });
        it('name is not undefined,it is ok', async function () {
            const res = await reqOfPost('/channel', { name: 'testChannel' });
            assert.deepEqual(res, {
                code: 200,
                message: '创建频道成功'
            });
        });
        it('name is undefined,it is error', async function () {
            const res = await reqOfPost('/channel');
            assert.deepEqual(Object.keys(res), ['code', 'message']);
            assert.equal(res.code, 400);
            assert.equal(res.message, '没有传递name参数');
        });
    });
    describe('test create message api', function () {
        afterEach(function () {
            clearMessage();
        });
        it('channel is right,it is ok', async function () {
            await createChannelById(testChannelId);
            const res = await reqOfPost('/message', { title: 'testMessage', content: 'test', channel: testChannelId });
            assert.deepEqual(res, {
                code: 200,
                message: '创建消息成功'
            });
            await delChannelById(testChannelId);
        });
        it('channel is not exist,it is error', async function () {
            const res = await reqOfPost('/message', { title: 'testMessage', content: 'test', channel: 'test' });
            assert.deepEqual(Object.keys(res), ['code', 'message']);
            assert.equal(res.code, 400);
            assert.equal(res.message, '消息所属频道不存在');
        });
        it('data is not right,it is error', async function () {
            await createChannelById(testChannelId);
            const res = await reqOfPost('/message', { title: 'testMessage', channel: 'test' });
            assert.deepEqual(Object.keys(res), ['code', 'message', 'error']);
            assert.equal(res.code, 500);
            assert.equal(res.message, '创建消息失败');
            await delChannelById(testChannelId);
        });
    });
    describe('test get message api', function () {
        before(async function () {
            await createChannelById(testChannelId);
            await createMessagesBychannel(testChannelId);
        });
        after(function () {
            clearChannel();
            clearMessage();
        });
        it('limit and skip are not undefined,it is ok', async function () {
            const res = await reqOfGet(`/channel/${testChannelId}/messages`, { limit: 10, skip: 0 });
            assert.deepEqual(Object.keys(res), ['code', 'message', 'data']);
            assert.equal(res.code, 200);
            assert.equal(res.message, '分页查询消息成功');
        });
        it('limit and skip are undefined,it is ok', async function () {
            const res = await reqOfGet(`/channel/${testChannelId}/messages`);
            assert.deepEqual(Object.keys(res), ['code', 'message', 'data']);
            assert.equal(res.code, 200);
            assert.equal(res.message, '查询消息成功');
            assert.equal(res.data.length, 10);
        });
        it('limit is undefined,it is error', async function () {
            const res = await reqOfGet(`/channel/${testChannelId}/messages`, { skip: 0 });
            assert.deepEqual(Object.keys(res), ['code', 'message']);
            assert.equal(res.code, 400);
            assert.equal(res.message, '分页查询需传limit参数');
        });
        it('skip is undefined,it is error', async function () {
            const res = await reqOfGet(`/channel/${testChannelId}/messages`, { limit: 10 });
            assert.deepEqual(Object.keys(res), ['code', 'message']);
            assert.equal(res.code, 400);
            assert.equal(res.message, '分页查询需传skip参数');
        });
        it('select messages of channel is not exist,it is error', async function () {
            const res = await reqOfGet(`/channel/${channelNotExist}/messages`, { limit: 10 });
            assert.deepEqual(Object.keys(res), ['code', 'message']);
            assert.equal(res.code, 400);
            assert.equal(res.message, '获取消息所属频道不存在');
        });
    });
});