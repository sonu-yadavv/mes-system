import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,  // Register PointElement for line/scatter charts
  LineElement,   // Register LineElement for line charts
  Title,
  Tooltip,
  Legend
);

createApp(App).mount('#app')
