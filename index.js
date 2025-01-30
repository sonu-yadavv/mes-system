const express = require('express');
const cors = require('cors');  
const pool = require('./db');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// GET - Fetch all production records
app.get('/api/production', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM production ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching production records' });
  }
});

// GET - Fetch all machine utilization records
app.get('/api/machine_utilization', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM machine_utilization');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching machine utilization records' });
  }
});

// GET - Fetch all defect rates records
app.get('/api/product_defects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM product_defects');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching defect rates records' });
  }
});

// POST - Add a new production record
app.post("/api/production", async (req, res) => {
  const { product_name, quantity, status } = req.body;

  if (!product_name || !quantity) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const query = `
      INSERT INTO production (product_name, quantity, status, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *;
    `;
    const values = [product_name, quantity, status || 'Pending'];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding production record:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT - Update an existing production record
app.put('/api/production/:id', async (req, res) => {
  const { id } = req.params;
  const { product_name, quantity, status } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE production SET product_name = $1, quantity = $2, status = $3 WHERE id = $4 RETURNING *',
      [product_name, quantity, status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating production record' });
  }
});

// DELETE - Delete a production record
app.delete('/api/production/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM production WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting production record' });
  }
});

// Test database connection and start server
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  } else {
    console.log('Connected to database');
    app.listen(port, () => {
      console.log(`Server is running on http://backend:${port}`);
    });
  }
});

// Handle cleanup on server shutdown
process.on('SIGINT', async () => {
  try {
    await pool.end();
    console.log('Pool has ended');
    process.exit(0);
  } catch (err) {
    console.error('Error during cleanup:', err);
    process.exit(1);
  }
});

// POST - Add a new QC inspection
app.post("/api/qc_inspections", async (req, res) => {
  const { product_name, inspector, defect_rate, comments } = req.body;

  if (!product_name || !inspector || defect_rate === undefined) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const query = `
      INSERT INTO qc_inspections (product_name, inspector, defect_rate, comments, created_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *;
    `;
    const values = [product_name, inspector, defect_rate, comments];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding QC inspection:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET - Fetch all QC inspections
app.get("/api/qc_inspections", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM qc_inspections ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching QC inspections:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


