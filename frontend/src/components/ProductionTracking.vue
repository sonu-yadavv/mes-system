<template>
  <h2 class="title">📦 Production Tracking</h2>
  <div class="production-tracking">
    <!-- Add New Production Record -->
    <div class="add-production">
      <input v-model="newRecord.product_name" placeholder="Product Name" class="input" />
      <input v-model="newRecord.quantity" type="number" placeholder="Quantity" class="input" />
      <select v-model="newRecord.status" class="input">
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button @click="addProduction" class="btn-add">➕ Add</button>
    </div>

    <!-- Production Table -->
    <table class="table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in productionData" :key="record.id">
          <td>{{ record.product_name }}</td>
          <td>{{ record.quantity }}</td>
          <td>
            <select v-model="record.status" @change="updateProduction(record)">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </td>
          <td>
            <button @click="deleteProduction(record.id)" class="btn-delete">❌ Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ProductionTracking",
  data() {
    return {
      productionData: [],
      newRecord: { product_name: "", quantity: "", status: "Pending" },
    };
  },
  async created() {
    await this.fetchProductionData();
  },
  methods: {
    async fetchProductionData() {
      try {
        const response = await axios.get("http://mes-backend:5000/api/production");
        this.productionData = response.data;
      } catch (error) {
        console.error("Error fetching production data:", error);
      }
    },
    async addProduction() {
      try {
        await axios.post("http://mes-backend:5000/api/production", this.newRecord);
        this.newRecord = { product_name: "", quantity: "", status: "Pending" };
        await this.fetchProductionData(); // Refresh production data after adding
      } catch (error) {
        console.error("Error adding production record:", error);
      }
    },
    async updateProduction(record) {
      try {
        await axios.put(`http://mes-backend:5000/api/production/${record.id}`, record);
      } catch (error) {
        console.error("Error updating production record:", error);
      }
    },
    async deleteProduction(id) {
      try {
        await axios.delete(`http://mes-backend:5000/api/production/${id}`);
        await this.fetchProductionData(); // Refresh production data after deleting
      } catch (error) {
        console.error("Error deleting production record:", error);
      }
    },
  },
};
</script>

<style scoped>
.production-tracking {
  padding: .5rem;
  background-color: #f9fafb;
  border-radius: 10px;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-right: 35px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  margin-top: 10px;
}

.add-production {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.input {
  padding: 0.75rem;
  margin: 0.4rem 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.select {
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.btn-add {
  background-color: #4caf50;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s;
}

.btn-add:hover {
  background-color: #45a049;
}

.btn-delete {
  background-color: #463535;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-delete:hover {
  background-color: #000000;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
}

.table th,
.table td {
  padding: 1rem;
  border: 1px solid #ddd;
  text-align: left;
}

.table-container {
  overflow-x: auto; /* Enables horizontal scrolling on small screens */
}

.table th {
  background-color: #f4f4f4;
}

.table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.table td select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .production-tracking {
    padding: 1.5rem;
  }

  .title {
    font-size: 2rem;
  }

  .add-production {
    max-width: 100%;
  }

  .input {
    font-size: 1rem;
    padding: 0.5rem;
  }

  .btn-add {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }

  .btn-delete {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }

  .table th, .table td {
    padding: 0.75rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.5rem;
  }

  .add-production {
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .input,
  .select {
    font-size: 0.9rem;
    padding: 0.5rem;
  }

  .btn-add {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }

  .btn-delete {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }

  .table th, .table td {
    padding: 0.5rem;
  }

  .table-container {
    overflow-x: auto;
  }

  .table {
    min-width: 500px;
  }

}
</style>
