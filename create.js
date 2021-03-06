import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  await dynamoDb.put(params);

  return params.Item;
});

// export function main(event, context, callback) {
//   // Request body is passed in as a JSON encoded string in 'event.body'
//   const data = JSON.parse(event.body);

//   const params = {
//     TableName: process.env.tableName,
//     Item: {
//       userId: event.requestContext.identity.cognitoIdentityId,
//       noteId: uuid.v1(),
//       content: data.content,
//       attachment: data.attachment,
//       createdAt: Date.now()
//     }
//   };

//   dynamoDb.put(params, (error, data) => {
//     // Set response headers to enable CORS (Cross-Origin Resource Sharing)
//     const headers = {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Credentials": true
//     };

//     // Return status code 500 on error
//     if (error) {
//       const response = {
//         statusCode: 500,
//         headers: headers,
//         body: JSON.stringify({ status: false })
//       };
//       callback(null, response);
//       return;
//     }

//     // Return status code 200 and the newly created item
//     const response = {
//       statusCode: 200,
//       headers: headers,
//       body: JSON.stringify(params.Item)
//     };
//     callback(null, response);
//   });
// }
