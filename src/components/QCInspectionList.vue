<template>
    <div class="qc-inspection-list">
      <h2 class="text-3xl font-bold mb-4">🔍 Inspection List</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Inspector</th>
            <th>Defect Rate (%)</th>
            <th>Comments</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="inspection in inspections" :key="inspection.id">
            <td>{{ inspection.product_name }}</td>
            <td>{{ inspection.inspector }}</td>
            <td>{{ inspection.defect_rate }}</td>
            <td>{{ inspection.comments }}</td>
            <td>
              <span :class="inspection.defect_rate > 0 ? 'text-red-500' : 'text-green-500'">
                {{ inspection.defect_rate > 0 ? 'Defective' : 'Pass' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        inspections: []
      };
    },
    async created() {
      await this.fetchInspections();
    },
    methods: {
      async fetchInspections() {
        try {
          const response = await axios.get("http://backend:5000/api/qc_inspections");
          this.inspections = response.data;
        } catch (error) {
          console.error("Error fetching inspections:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  .table th, .table td {
    padding: 0.75rem;
    border: 1px solid #ddd;
    text-align: left;
  }
  </style>
  