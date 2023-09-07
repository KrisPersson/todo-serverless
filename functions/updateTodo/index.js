const { sendResponse } = require('../../responses/index')
const { db } = require('../../services/db')

async function updateTodo(body) {
    const { id, done } = body
    const todo = await db.update({
      TableName: 'todos-db',
      Key: { id: id },
      ReturnValues: 'ALL_NEW',
      UpdateExpression: 'set done = :done',
      ExpressionAttributeValues: {
        ':done': done
      }
    }).promise()

    return sendResponse(200, { success: true, todo, message: 'Todo updated successfully!'})
  }

module.exports.handler = async (event) => {
    console.log(event)
    try {
        return await updateTodo(JSON.parse(event.body))
        
    } catch (error) {
        return sendResponse(400, error.message)
    }
};
