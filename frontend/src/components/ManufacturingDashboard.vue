<template>
  <h1 class="dashboard-title">📊 Manufacturing Dashboard</h1>
  <div class="dashboard">
    <div class="grid-container">
      <!-- Production Status Chart -->
      <div class="card">
        <h2 class="card-title">Production Status</h2>
        <div class="chart-container">
          <Pie v-if="productionStatusChartData.datasets[0].data.length > 0" :data="productionStatusChartData" :options="pieChartOptions" />
        </div>
      </div>
      
      <!-- Machine Utilization Chart -->
      <div class="card">
        <h2 class="card-title">Machine Utilization</h2>
        <div class="chart-container">
          <Bar v-if="machineUtilizationChartData.datasets[0].data.length > 0" :data="machineUtilizationChartData" :options="barChartOptions" />
        </div>
      </div>
      
      <!-- Product Defect Rates Chart -->
      <div class="card">
        <h2 class="card-title">Product Defect Rates</h2>
        <div class="chart-container">
          <Bar v-if="productDefectsChartData.datasets[0].data.length > 0" :data="productDefectsChartData" :options="barChartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar, Pie } from 'vue-chartjs';
import axios from 'axios';

ChartJS.register(ChartDataLabels, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

export default {
  name: 'DashboardView',
  components: { Bar, Pie },
  data() {
    return {
      productionStatusChartData: { labels: [], datasets: [{ data: [], backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)'], borderColor: ['rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)'], borderWidth: 1 }] },
      machineUtilizationChartData: { labels: [], datasets: [{ label: 'Utilization (%)', data: [], backgroundColor: 'rgba(54, 162, 235, 0.6)', borderColor: 'rgba(54, 162, 235, 1)', borderWidth: 1 }] },
      productDefectsChartData: { labels: [], datasets: [{ label: 'Defect Rate (%)', data: [], backgroundColor: 'rgba(255, 99, 132, 0.6)', borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 1 }] },
      pieChartOptions: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' }, datalabels: {
            display: true,
            color: '#000',
            formatter: (value) => value, align: 'center',  // Center labels inside the pie slices
            font: {
              weight: 'bold',
              size: 14 // This will show the count
      }} } },
      barChartOptions: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' },
          datalabels: {
            display: true,
            color: '#000',  // Set label color to black for bar chart
            align: 'end',  // Position labels outside the bars
            formatter: (value) => value,  // Display count outside the bars
            font: {
              size: 10
            }
          } }, scales: { y: { beginAtZero: true, max: 100 } } }
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
          axios.get('http://mes-backend:5000/api/production'),
          axios.get('http://mes-backend:5000/api/machine_utilization'),
          axios.get('http://mes-backend:5000/api/product_defects')
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
      this.productionStatusChartData .datasets[0].data = Object.values(statusCounts);
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
.dashboard {
  padding: 20px;
  background-color: #f4f7fa;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  margin-right: 35px;
  justify-content: center;  /* Horizontally center the content */
}

.dashboard-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  margin-top: 10px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  width: 100%;
}

.card {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
}

.chart-container {
  height: 300px;
  position: relative;
}


/* 📱 Mobile Responsive Adjustments */
@media (max-width: 768px) {
  .dashboard {
    padding: 15px;
  }

  .dashboard-title {
    font-size: 1.8rem;
  }

  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }

  .card {
    padding: 1.2rem;
  }

  .card-title {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .dashboard {
    padding: 10px;
  }

  .dashboard-title {
    font-size: 1.5rem;
  }

  .grid-container {
    grid-template-columns: 1fr; /* Single column layout for smaller screens */
    gap: 10px;
  }

  .card {
    padding: 1rem;
  }

  .card-title {
    font-size: 1.2rem;
  }

  .chart-container {
    height: 250px;
  }
}
</style>