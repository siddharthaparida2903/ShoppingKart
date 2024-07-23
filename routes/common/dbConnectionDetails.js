const { MongoClient } = require('mongodb');
var dbUrl = 'mongodb://localhost:27017';
const client = new MongoClient(dbUrl);

var mongodbConnectionDetails = {
    getConnectToCollection(collectionName, qtype, data) {
        getClientRef();
        const db = client.db("ShoppingKart");
        const collection = db.collection(collectionName);
        if (qtype == 'finduser') {
            return collection.find({accountId: data.accountId}).toArray();
        } else if (qtype == 'insert') {
            return collection.insertOne(data);
        } else if (qtype == 'find') {
            return collection.find(data).toArray();
        } else if (qtype == 'addItemToKart') {
           
            collection.find({"userId" : data.userId}).toArray().then((result) => {
                
                if (result.length == 0) {
                    var obj = {};
                    obj.userId = data.userId;
                    obj.productId = [data.productId];
                    return collection.insertOne(obj);
                } else {
                    var newProductList = result[0].productId;
                    newProductList.push(data.productId);
                    return collection.updateOne({"userId" : data.userId}, {$set: {productId: newProductList}});
                }
            })

            // var dataobj = {};
            // // dataobj[data.userId] = [data.productId];
            // // return collection.insertOne(dataobj)
            // return collection.updateOne({"userId" : data.userId}, {$set: {productsList: [data.productId]}});
            
        } else if (qtype == 'delete') {
            return collection.deleteOne({});
        }
    }
}
async function getClientRef() {
    await client.connect();
}

module.exports = mongodbConnectionDetails;