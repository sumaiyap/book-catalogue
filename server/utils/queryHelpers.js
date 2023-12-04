const getConnection = require("./db");

const addEmployee = async (name, department, address) => {
  const connection = await getConnection();
  return connection.execute(
    "INSERT INTO employee (name,department,address) values (?,?,?)",
    [name, department, address]
  );
};

const getAllEmployees = async () => {
  const connection = await getConnection();
  return connection.execute(
    "select e.id,e.name,d.name department,e.address from employee e,department d where e.department=d.id order by e.id"
  );
};

const getEmployee = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "select e.id,e.name,d.name department,e.address from employee e,department d where e.department=d.id and e.id=?",
    [id]
  );
};

const updateAddress = async (id, address) => {
  const connection = await getConnection();
  return connection.execute("update employee set address=? where id=?", [
    address,
    id,
  ]);
};

const deleteEmployee = async (id) => {
  const connection = await getConnection();
  return connection.execute("delete from employee where id=?", [id]);
};

const getAllDepartments = async () => {
  const connection = await getConnection();
  return connection.execute("select id,name from department");
};

module.exports = {
  addEmployee,
  getAllEmployees,
  getEmployee,
  updateAddress,
  deleteEmployee,
  getAllDepartments,
};
