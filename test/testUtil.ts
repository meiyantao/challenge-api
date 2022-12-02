const Sequelize = require('sequelize');
const rp = require('request-promise');
//测试数据库配置
const dbConfig = {
    database: 'challenge', //数据库名
    account: 'root',      //用户名
    password: '123456',   //密码
    ip: 'localhost'       //数据库服务IP地址
} as const;

const sequelize = new Sequelize(dbConfig.database, dbConfig.account, dbConfig.password, {
    host: dbConfig.ip,
    dialect: 'mysql',
    logging: false,
    define: {
        freezeTableName: true
    }
});
const apiPrefix = 'http://127.0.0.1:3000/api/v1';
/**
 * 模拟http的get请求
 */
async function reqOfGet(url: string, data: object = {}) {
    let option = {
        method: 'get',
        url: `${apiPrefix}${url}`,
        json: true,
        qs: data
    };
    const rpBody = await rp(option);
    return rpBody;
}
/**
 * 模拟http的post请求
 */
async function reqOfPost(url: string, data: object = {}) {
    let option = {
        method: 'post',
        url: `${apiPrefix}${url}`,
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: data
    };
    const rpBody = await rp(option);
    return rpBody;
}
/**
 * 创建指定id的频道
 */
async function createChannelById(id: string) {
    return await sequelize.query(`insert into channel (id,name) values("${id}","testChannel");`);
}
/**
 * 删除指定id的频道
 */
async function delChannelById(id: string) {
    return await sequelize.query(`delete from channel where id="${id}";`);
}

/**
 * 清空频道数据
 */
async function clearChannel() {
    return await sequelize.query(`delete from channel;`);
}

/**
 * 清空消息数据
 */
async function clearMessage() {
    return await sequelize.query(`delete from message;`);
}

/**
 * 创建多条消息数据
 */
async function createMessagesBychannel(channel: string) {
    for (let i = 1; i <= 10; i++) {
        await sequelize.query(`insert into message (id,title,content,channel) values("${i}","testMessage","testMessage","${channel}");`);
    }
    return true;
}
export {
    reqOfGet,
    reqOfPost,
    createChannelById,
    delChannelById,
    clearChannel,
    clearMessage,
    createMessagesBychannel
};