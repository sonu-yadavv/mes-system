<template>
  <div class="dashboard-container">
    <h1 class="text-4xl font-bold text-center mb-6 text-gray-800">📊 Manufacturing Dashboard</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Production Status Chart -->
      <div class="card">
        <h2 class="chart-title">Production Status</h2>
        <div class="chart-container">
          <Pie v-if="productionStatusChartData.datasets[0].data.length > 0" :data="productionStatusChartData" :options="pieChartOptions" />
        </div>
      </div>

      <!-- Machine Utilization Chart -->
      <div class="card">
        <h2 class="chart-title">Machine Utilization</h2>
        <div class="chart-container">
          <Bar v-if="machineUtilizationChartData.datasets[0].data.length > 0" :data="machineUtilizationChartData" :options="barChartOptions" />
        </div>
      </div>

      <!-- Product Defect Rates Chart -->
      <div class="card">
        <h2 class="chart-title">Product Defect Rates</h2>
        <div class="chart-container">
          <Bar v-if="productDefectsChartData.datasets[0].data.length > 0" :data="productDefectsChartData" :options="barChartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar, Pie } from 'vue-chartjs';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

export default {
  name: 'DashboardView',
  components: { Bar, Pie },
  data() {
    return {
      productionStatusChartData: { labels: [], datasets: [{ data: [], backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)'], borderColor: ['rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)'], borderWidth: 1 }] },
      machineUtilizationChartData: { labels: [], datasets: [{ label: 'Utilization (%)', data: [], backgroundColor: 'rgba(54, 162, 235, 0.6)', borderColor: 'rgba(54, 162, 235, 1)', borderWidth: 1 }] },
      productDefectsChartData: { labels: [], datasets: [{ label: 'Defect Rate (%)', data: [], backgroundColor: 'rgba(255, 99, 132, 0.6)', borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 1 }] },
      pieChartOptions: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } },
      barChartOptions: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true, max: 100 } } }
    };
  },
  async created() {
    await this.fetchDashboardData();
    setInterval(this.fetchDashboardData, 30000);
  },
  methods: {
    async fetchDashboardData() {
      try {
        const [productionRes, machineRes, defectRes] = await Promise.all([
          axios.get('http://backend:5000/api/production'),
          axios.get('http://backend:5000/api/machine_utilization'),
          axios.get('http://backend:5000/api/product_defects')
        ]);
        this.updateProductionStatusChartData(productionRes.data);
        this.updateMachineUtilizationChartData(machineRes.data);
        this.updateProductDefectChartData(defectRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    },
    updateProductionStatusChartData(data) {
      const statusCounts = { 'In Progress': 0, 'Completed': 0, 'Pending': 0 };
      data.forEach(item => { if (statusCounts[item.status] !== undefined) statusCounts[item.status]++; });
      this.productionStatusChartData.labels = Object.keys(statusCounts);
      this.productionStatusChartData.datasets[0].data = Object.values(statusCounts);
    },
    updateMachineUtilizationChartData(data) {
      this.machineUtilizationChartData.labels = data.map(m => `Machine ${m.machine_id}`);
      this.machineUtilizationChartData.datasets[0].data = data.map(m => m.utilization);
    },
    updateProductDefectChartData(data) {
      this.productDefectsChartData.labels = data.map(p => p.product_name);
      this.productDefectsChartData.datasets[0].data = data.map(p => parseFloat(p.defect_rate));
    }
  }
};
</script>

<style scoped>
/* Dashboard Container */
.dashboard-container {
  background-color: #f4f7fc; /* Soft Gray-Blue */
  min-height: 100vh;
  padding: 1rem;
}

/* Card Styles */
.card {
  background: linear-gradient(to right, #ffffff, #f9fafb);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* Chart Container */
.chart-container {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Chart Titles */
.chart-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
  color: #374151;
}

/* Responsive Grid */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>

