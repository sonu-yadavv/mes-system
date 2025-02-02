<template>
    <h2 class="title">📋 Quality Control Inspection List</h2>
    <div class="qc-list">
      
      <input 
        v-model="searchQuery" 
        placeholder="Search by Product or Inspector 🔍" 
        class="search-input" 
      />
      
      <div class="chart-container">
        <canvas ref="qcChart"></canvas>
      </div>
      
      <table class="qc-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Inspector</th>
            <th>Defect Rate (%)</th>
            <th>Comments</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(inspection, index) in filteredInspections" :key="inspection.id">
            <td>{{ index + 1 }}</td>
            <td>{{ inspection.product_name }}</td>
            <td>{{ inspection.inspector }}</td>
            <td>{{ inspection.defect_rate }}</td>
            <td>{{ inspection.comments || 'N/A' }}</td>
            <td>{{ formatDate(inspection.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  export default {
    data() {
      return {
        inspections: [],
        searchQuery: "",
      };
    },
    computed: {
      filteredInspections() {
        return this.inspections.filter(inspection =>
          inspection.product_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          inspection.inspector.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    async created() {
      await this.fetchInspections();
      this.renderChart();
    },
    methods: {
      async fetchInspections() {
        try {
          const response = await axios.get("http://mes-backend:5000/api/qc_inspections");
          this.inspections = response.data;
        } catch (error) {
          console.error("Error fetching inspections:", error);
        }
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
      },
      renderChart() {
        if (!this.$refs.qcChart) return;
        const ctx = this.$refs.qcChart.getContext("2d");
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: this.inspections.map(i => i.product_name),
            datasets: [{
              label: "Defect Rate (%)",
              data: this.inspections.map(i => i.defect_rate),
              backgroundColor: "rgb(230, 153, 153)",
              borderColor: "rgb(249, 134, 134)",
              borderWidth: 1,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true },
            },
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .qc-list {
    max-width: 900px;
    margin: auto;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    margin-right: 35px;
  }
  
  .title {
    margin-top: 10px;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .search-input {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    outline: none;
    display: block;
    max-width: 100%;
  }
  
  .chart-container {
    width: 100%;
    max-width: 900px;
    height: 300px;
    margin: 20px auto;
  }
  
  .qc-table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .qc-table th, .qc-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .qc-table th {
    background-color: #4caf50;
    color: white;
    font-size: 1rem;
  }
  
  .qc-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .qc-table tr:hover {
    background-color: #f1f1f1;
    transition: background 0.3s ease-in-out;
  }

  @media (max-width: 768px) {
  .qc-list {
    padding: 1.5rem;
  }

  .title {
    font-size: 1.8rem;
  }

  .search-input {
    font-size: 0.95rem;
  }

  .qc-table th, .qc-table td {
    padding: 10px;
    font-size: 0.9rem;
  }

  .chart-container {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.5rem;
  }

  .qc-list {
    padding: 1rem;
  }

  .search-input {
    font-size: 0.9rem;
    padding: 0.65rem;
  }

  .qc-table th, .qc-table td {
    padding: 8px;
    font-size: 0.85rem;
  }

  .chart-container {
    height: 200px;
  }
}
  </style>
  