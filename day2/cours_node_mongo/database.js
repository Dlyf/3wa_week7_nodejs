const { MongoClient } = require('mongodb');

// Connection URL

const url = process.env.URI_MONGO;
const client = new MongoClient(url);

// Database Name
const dbName = 'fsd40';

async function main() {
    // Use connect method to connect to the server
  //   await client.connect();
  //   console.log('Connected successfully to server');
  //   const db = client.db(dbName);
  //   const user = db.collection('user');
  //   const users = await user.find({}).toArray();
  //   console.log(users)
      // await user.deleteMany({});
      // const insertUser = await user.insertOne({
      //     firstName: "Edouard",
      //     lastName: "Dupont",
      //     email: "ed@gmail.com",
      //     password: "azerty1234",
      //     creationDateTime: new Date(),
      //     role: "user",

      // })

     // console.log("USER", users)
    // the following code examples can be pasted here...

    return client.connect()
              .then(async(result)=>{
                  console.log('Connected successfully to server');
                  const db = client.db(dbName);

                  return db
              })
              .catch((err)=>{
                  console.log('err', err)
              })

  }

  module.exports = {client, main}