const { sendResponse } = require('../../responses/index')
const { db } = require('../../services/db')

async function getTodos() {
    const todosFromDb = await db.scan({
        TableName: 'todos-db'
    }).promise()
    
    return sendResponse(200, { success: true, todosFromDb })
}

module.exports.handler = async (event) => {
    console.log(event)
    try {
        return await getTodos()
    } catch (error) {
        return sendResponse(400, error.message)
    }
};
