const express = require("express");

const app = express();

app.use(express.json());
app.use(require("cors")());

// simple in-memory "database"
let users = [
  {
    username: "Alice",
    createDate: new Date(2023, 5, 23),
    age: 25,
    type: "user",
  },
  {
    username: "Bob",
    createDate: new Date(2022, 8, 15),
    age: 16,
    type: "employee",
    title: "Developer",
  },
  {
    username: "Charlie",
    createDate: new Date(2024, 2, 2),
    age: 35,
    type: "User",
  },
];

// Get UI metadata
app.get("/meta", (_, res) => {
  // list of all the user types and their display names
  const userTypes = [
    { field: "user", name: "User" },
    { field: "employee", name: "Employee" },
    { field: "external", name: "External User" },
  ];

  // list of all the available user fields/properties and their display names
  const userFields = [
    { field: "username", name: "Username" },
    { field: "age", name: "Age" },
    { field: "createDate", name: "Create Date" },
    { field: "type", name: "Type" },
    { field: "tile", name: "Job Title" },
  ];

  res.json({
    userTypes,
    userFields,
  });
});

// Retrieve users
app.get("/users", (req, res) => {
  const { sort: field } = req.query;

  // Bug: Any field name can be passed, even if it doesn't exist
  users.sort((a, b) => (a[field] > b[field] ? 1 : -1));

  res.json(users);
});

// Adding a new user (no validation or type checking)
app.post("/users", (req, res) => {
  const body = req.body;

  console.log(`[POST] /users: ${JSON.stringify(body)}`);

  const newUser = {
    createDate: new Date(),
    username: body.username,
    type: body.type,
  };

  // initialize a object to hold validation results (by field name)
  const validFields = {
    username: !!body.username,
  };

  // validate employee fields
  if (!body.type) {
    validFields.type = false;
  }
  if (body.type === "Employee") {
    validFields.title = !!body.title;
    newUser.title = body.title
  } else {
    validFields.age = !!body.age;
    newUser.age = body.age
  }

  if (Object.values(validFields).some((x) => !x)) {
    const invalidFieldNames = Object.keys(
      validFields,
    ).filter((field) => !validFields[field]);

    return res
      .status(400)
      .json({
        error:
          "Missing required fields: " +
          invalidFieldNames.join(", "),
      });
  }

  // by this point we've added all of the appropriate fields and newUser
  // is now a full, valid "User"
  users.push(newUser);

  res.status(201).json({
    message: "User added successfully",
    user: newUser,
  });
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    `User management app listening on http://localhost:${port}`,
  );
});
