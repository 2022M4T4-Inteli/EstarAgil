const db = require("../database/db");

// View order
exports.servicesById = async (req, res) => {
  try {
    const { service_id } = req.params;
    const response = await db.query(
      "SELECT * FROM services WHERE service_id = $1 ",
      [service_id]
    );
    const data = response.rows;
    if (data.length === 0) {
      res.status(401).send({
        error: "Service not registered",
      });
    } else {
      res.status(200).send(data);
    }
  } catch {
    res.status(500).send({
      error: "Database error",
    });
  }
};

exports.addService = async (req, res) => {
  try {
    const { estimate_time, distance, prism, status, fk_rfid_code } = req.body;
    const response = await db.query(
      "INSERT INTO services (estimate_time, distance, prism, status, fk_rfid_code) VALUES ($1, $2, $3, $4, $5)",
      [estimate_time, distance, prism, status, fk_rfid_code]
    );
    res.status(200).send({
      message: "Service added sucessfully",
    });
  } catch (e) {
    res.status(500).send({
      error: e,
    });
  }
};

exports.updateStatus = async (req, res) => {
  const { service_id } = req.params;
  const { status } = req.body;
  try {
    const response = await db.query(
      "UPDATE services SET status = $1 WHERE service_id = $2",
      [status, service_id]
    );
    res.status(200).send({
      message: `The service status was updated to ${status}`,
    });
  } catch {
    res.status(500).send({
      error: "Database error",
    });
  }
};

exports.activeServices = async (req, res) => {
  try {
    const data = await db.query(
      "SELECT * FROM services INNER JOIN vallet V ON V.rfid_Code = services.fk_rfid_code WHERE status = 'ativo'"
    );
    const response = data.rows;
    // if(response.length === 0){
    //     console.log("there is no active services");
    //     res.status(401)({
    //         message: "There is no active service",
    //     });
    // } else {
    // }
    res.status(200).send(response);
  } catch (e) {
    res.status(500).send({
      error: "Database error",
    });
  }
};
