### 错误url报错
```
{
    "code": 404,
    "message": "调用接口url错误"
}
```
### 创建频道
#### url
    POST http:127.0.0.1:3000/api/v1/channel
#### 参数
在**body**中选择**row**传递**json**数据，例如:
```
{
    "name":"test"
}
```
#### 返回值
```
{
    "code": 200,
    "message": "创建频道成功"
}
```
如果没有传递参数，则会返回错误，例如：
```
{
    "code": 400,
    "message": "没有传递name参数"
}
```
如果是其他错误，则会返回
```
{
    "code": 500,
    "message": "创建频道失败",
    "error":错误原因
}
```
### 创建消息
#### url
    POST http:127.0.0.1:3000/api/v1/message
#### 参数
在**body**中选择**row**传递**json**数据，例如:
```
{
    "title":"test",
    "content":"testMessage",
    "channel":已有channel的id
}
```
#### 返回值
```
{
    "code": 200,
    "message": "创建消息成功"
}
```
如果channel的id不存在，则会返回错误，例如：
```
{
    "code": 400,
    "message": "消息所属频道不存在"
}
```
如果是其他错误，则会返回
```
{
    "code": 500,
    "message": "创建消息失败",
    "error":错误原因
}
```
### 获取频道中的消息
#### url
    GET http:127.0.0.1:3000/api/v1/channel/:channelId/messages
#### 参数
channelId为查询消息的所属频道id
#### 返回值
```
{
    "code": 200,
    "message": "查询消息成功",
    "data": [
        {
            "id": "3f164df7-692e-439a-840a-f7eed7ad4a5c",
            "title": "qwer1111",
            "content": "sadfa",
            "channel": "1d43db18-150c-46e1-85cb-44ea4a26a475",
            "createdAt": "2022-12-02 06:40:54"
        }
    ]
}
```
如果channel的id不存在，则会返回错误，例如：
```
{
    "code": 400,
    "message": "获取消息所属频道不存在"
}
```
如果需要分页，需要在**params**中传递**limit**和**skip**参数,返回值例如：
```
{
    "code": 200,
    "message": "分页查询消息成功",
    "data": {
        "count": 1,
        "rows": [
            {
                "id": "3f164df7-692e-439a-840a-f7eed7ad4a5c",
                "title": "qwer1111",
                "content": "sadfa",
                "channel": "1d43db18-150c-46e1-85cb-44ea4a26a475",
                "createdAt": "2022-12-02 06:40:54"
            }
        ]
    }
}
```
如果传递分页参数**limit**(每页最多包含几条数据)和**skip**(从第几条数据后开始)缺少其一，则会返回错误，例如：
```
{
    "code": 400,
    "message": "分页查询需传skip/limit参数"
}
```
如果是其他错误，则会返回
```
{
    "code": 500,
    "message": "创建消息失败",
    "error":错误原因
}
```