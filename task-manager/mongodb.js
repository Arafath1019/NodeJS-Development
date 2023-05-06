const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

// MongoDB Globally Unique Object ID
// const ObjectID = mongodb.ObjectID;
// const id = new ObjectID();
// console.log(id);

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }

    const db = client.db(databaseName);

    // Insert One Single Document into database
    db.collection("users").insertOne(
      {
        name: "Yeasin Arafath",
        age: 27,
      },
      (error, result) => {
        if (error) {
          return console.log("Unable to insert document");
        }

        console.log(result.ops);
      }
    );

    // Insert Many Documents into users collection of task-manager database
    db.collection("users").insertMany(
      [
        {
          name: "Allen",
          age: 20,
        },
        {
          name: "John",
          age: 23,
        },
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert documents");
        }

        console.log(result.ops);
      }
    );

    // Insert Many Documents into tasks collection of task-manager database
    db.collection("tasks").insertMany(
      [
        {
          description: "Task 01",
          completed: true,
        },
        {
          description: "Task 02",
          completed: false,
        },
        {
          description: "Task 03",
          completed: true,
        },
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert documents");
        }

        console.log(result.ops);
      }
    );

    // Find a Single Document
    db.collection("users").findOne({ name: "Allen" }, (error, user) => {
      if (error) {
        return console.log("Unable to fetch");
      }

      console.log(user);
    });

    db.collection("users").findOne(
      { _id: new ObjectID("645642f53a537307ccfe93f1") },
      (error, user) => {
        if (error) {
          return console.log("Unable to fetch");
        }

        console.log(user);
      }
    );

    // Find documents using find method
    db.collection("users")
      .find({ age: 20 })
      .toArray((error, users) => {
        if (error) {
          return console.log("Unable to fetch!");
        }

        console.log(users);
      });

    db.collection("users")
      .find({ age: 20 })
      .count((error, count) => {
        if (error) {
          return console.log("Unable to fetch");
        }

        console.log(count);
      });

    db.collection("tasks").findOne(
      { _id: new ObjectID("645643e1f25cbd479c7fd1cc") },
      (error, user) => {
        if (error) {
          return console.log("Unable to fetch");
        }

        console.log(user);
      }
    );

    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, tasks) => {
        if (error) {
          return console.log("Unable to fetch");
        }

        console.log(tasks);
      });

    // Update one document
    db.collection("users")
      .updateOne(
        { _id: new ObjectID("645642f53a537307ccfe93f1") },
        {
          $set: {
            name: "Yeasin Arafath",
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    // Update many documents
    db.collection("tasks")
      .updateMany(
        { completed: true },
        {
          $set: {
            completed: false,
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    // Delete One document
    db.collection("tasks")
      .deleteOne({
        description: "Task 01",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    // Delete Many document
    db.collection("users")
      .deleteMany({
        age: 23,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
