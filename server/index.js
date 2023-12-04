const express = require("express");
const {
  addEmployee,
  getAllEmployees,
  getEmployee,
  updateAddress,
  deleteEmployee,
  getAllDepartments,
} = require("./utils/queryHelpers");
const app = express();
app.use(express.json());
const cors = require("cors");

const genericError = "Sorry, something went wrong!";



// const whitelist = ["http://52.201.214.154:3000"]; //Change to the port in which react app is running
// const corsOptions = {
//   origin: function (origin, callback) {
// 	    if (!origin || whitelist.indexOf(origin) !== -1) {
// 		      callback(null, true);
// 		    } else {
// 			      callback(new Error("Not allowed by CORS"));
// 			   }
// 	  },
//   credentials: true,
// };

const corsOptions = {
    origin: "*",
    credentials: true,
  };
app.use(cors(corsOptions));


app.get("/departments", async function (request, response) {
  try {
    const [result] = await getAllDepartments();
    response.send({ success: true, result });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.get("/", async function (request, response) {
  try {
    const [result] = await getAllEmployees();
    response.send({ success: true, result });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.get("/:id", async function (request, response) {
  const { id } = request.params;
  try {
    const [result] = await getEmployee(id);
    if (result.length > 0) {
      response.send({ success: true, result: result[0] });
    } else {
      response.status(404).send({
        success: false,
        error: `No employee found with id ${id}`,
      });
    }
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.post("/", async function (request, response) {
  try {
    console.log("Received POST request:", request.body); 
    const { name, department, address } = request.body;
    const [result] = await addEmployee(name, department, address);
    if (result.insertId) {
      const [data] = await getEmployee(result.insertId);
      response.send({ success: true, result: data[0] });
    } else {
      response.status(500).send({
        success: false,
        error: genericError,
      });
    }
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.put("/:id", async function (request, response) {
  try {
    const { address } = request.body;
    const { id } = request.params;
    const [result] = await updateAddress(id, address);
    if (result.affectedRows > 0) {
      const [data] = await getEmployee(id);
      response.send({ success: true, result: data[0] });
    } else {
      response.status(400).send({
        success: false,
        error: genericError,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.delete("/:id", async function (request, response) {
  try {
    const { id } = request.params;
    const [result] = await deleteEmployee(id);
    if (result.affectedRows > 0) {
      response.send({ success: true });
    } else {
      response.status(400).send({
        success: false,
        error: genericError,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.listen(8001);
