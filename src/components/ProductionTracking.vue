   <template>
    <div class="production-tracking">
      <h2 class="text-3xl font-bold mb-4">📦 Production Tracking</h2>
  
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
            <td>{{ record.quantity }}</td> <!-- Display the quantity -->
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
        const response = await axios.get("http://backend:5000/api/production");
        this.productionData = response.data;
      } catch (error) {
        console.error("Error fetching production data:", error);
      }
    },
      async addProduction() {
        try {
          await axios.post("http://backend:5000/api/production", this.newRecord);
          this.newRecord = { product_name: "", quantity: "", status: "Pending" };
          await this.fetchProductionData(); // Refresh production data after adding
        } catch (error) {
          console.error("Error adding production record:", error);
        }
      },
      async updateProduction(record) {
        try {
          await axios.put(`http://backend:5000/api/production/${record.id}`, record);
        } catch (error) {
          console.error("Error updating production record:", error);
        }
      },
      async deleteProduction(id) {
        try {
          await axios.delete(`http://backend:5000/api/production/${id}`);
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
    padding: 1rem;
    background-color: #f9fafb;
    border-radius: 10px;
  }
  .input {
    padding: 0.5rem;
    margin: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  .btn-add {
    background-color: #4caf50;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
  }
  .btn-delete {
    background-color: #000000;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
  }
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  .table th,
  .table td {
    padding: 0.75rem;
    border: 1px solid #ddd;
    text-align: left;
  }
  </style>
  