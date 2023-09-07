const { sendResponse } = require('../../responses/index')
const { db } = require('../../services/db')

async function deleteTodo(body) {
    const { id } = body
    await db.delete({
        TableName: 'todos-db',
        Key: {
            id: id
        }
    }).promise()
    return sendResponse(200, {success: true, message: 'Todo successfully deleted!'})
}

module.exports.handler = async (event) => {
    console.log(event)
    try {
        return await deleteTodo(JSON.parse(event.body))
        
    } catch (error) {
        return sendResponse(400, error.message)
    }
};
