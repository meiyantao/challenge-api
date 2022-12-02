const { Channel, Message } = require('../connection/connect.ts');

interface messageDataType {
    title: string;
    content: string;
    channel: string;
}
interface resqonseDataType {
    code: number;
    message: string;
    error?: string;
    data?: object;
}

class resultModel implements resqonseDataType {
    code: number
    message: string
    error?: any
    data?: object
    constructor(code: number, message: string, data?: object, error?: any) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}
module.exports = {
    async creatChannel(name: string): Promise<resqonseDataType> {
        try {
            if (!name) {
                return new resultModel(400, '没有传递name参数');
            }
            await Channel.create({ name: name });
            return new resultModel(200, '创建频道成功');
        } catch (err) {
            return new resultModel(500, '创建频道失败', undefined, err);
        }
    },
    async createMessage(data: messageDataType): Promise<resqonseDataType> {
        try {
            const channelext = await Channel.findOne({
                where: {
                    id: data.channel
                }
            });
            if (!channelext) {
                return new resultModel(400, '消息所属频道不存在');
            } else {
                await Message.create(data);
                return new resultModel(200, '创建消息成功');
            }
        } catch (err) {
            return new resultModel(500, '创建消息失败', undefined, err);
        }
    },
    async getMessage(channelId: string, limit?: number, skip?: number): Promise<resqonseDataType> {
        try {
            const channelext = await Channel.findOne({
                where: {
                    id: channelId
                }
            });
            if (!channelext) {
                return new resultModel(400, '获取消息所属频道不存在');
            }
            if (limit || skip) {
                if (!limit) {
                    return new resultModel(400, '分页查询需传limit参数');
                }
                if (!skip) {
                    return new resultModel(400, '分页查询需传skip参数');
                }
                const messageByfy = await Message.findAndCountAll({
                    where: {
                        channel: channelId
                    },
                    order: [
                        ['created_at', 'desc']
                    ],
                    offset: Number(skip),
                    limit: Number(limit)
                });
                return new resultModel(200, '分页查询消息成功', messageByfy);
            } else {
                const messages = await Message.findAll({
                    where: {
                        channel: channelId
                    },
                    order: [
                        ['created_at', 'desc']
                    ]
                });
                return new resultModel(200, '查询消息成功', messages);
            }
        } catch (err) {
            return new resultModel(500, '获取消息失败', undefined, err);
        }
    }
};