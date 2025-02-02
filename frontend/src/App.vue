<template>
  <div id="app" @click="closeSidebarOnClick">
    <!-- Header with logo, title, and hamburger -->
    <header class="header">
      <div class="logo" @click="setActivePage('ManufacturingDashboard')">
        <h1 class="text-4xl font-bold">🏭</h1>
      </div>
      <div class="title">
        <h1 class="text-3xl font-bold">Manufacturing Execution System</h1>
      </div>
      <!-- Hamburger icon that toggles sidebar visibility -->
      <button class="hamburger" @click.stop="toggleSidebar">
        {{ sidebarVisible ? '✖' : '☰' }}
      </button>
    </header>

    <!-- Sidebar for navigation -->
    <nav ref="sidebar" :class="['sidebar', { 'sidebar-visible': sidebarVisible }]">
      <ul>
        <li @click="setActivePage('ManufacturingDashboard')">Manufacturing Dashboard</li>
        <li @click="setActivePage('ProductionTracking')">Production Tracking</li>
        <li @click="setActivePage('QCInspectionForm')">Quality Inspection Form</li>
        <li @click="setActivePage('QCInspectionList')">Inspection List</li>
      </ul>
    </nav>

    <!-- Main content based on active page -->
    <div class="main-content">
      <ManufacturingDashboard v-if="activePage === 'ManufacturingDashboard'" />
      <ProductionTracking v-if="activePage === 'ProductionTracking'" />
      <div v-if="activePage === 'QCInspectionForm'">
        <QCInspectionForm @inspection-scheduled="fetchInspections" />
      </div>
      <QCInspectionList v-if="activePage === 'QCInspectionList'" />
    </div>

    <!-- Footer -->
    <footer class="footer">
      <p>Created by Sonu Yadav @ 2025</p>
    </footer>
  </div>
</template>

<script>
import ManufacturingDashboard from './components/ManufacturingDashboard.vue';
import ProductionTracking from './components/ProductionTracking.vue';
import QCInspectionForm from './components/QCInspectionForm.vue';
import QCInspectionList from './components/QCInspectionList.vue';

export default {
  name: 'App',
  components: {
    ManufacturingDashboard,
    ProductionTracking,
    QCInspectionForm,
    QCInspectionList,
  },
  data() {
    return {
      activePage: 'ManufacturingDashboard', // Default page
      sidebarVisible: false, // Sidebar toggle state
    };
  },
  methods: {
    setActivePage(page) {
      this.activePage = page;
      this.sidebarVisible = false; // Hide sidebar when a page is selected
    },
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    closeSidebarOnClick(event) {
      // Close sidebar if the click happens outside of it
      if (this.sidebarVisible && this.$refs.sidebar && !this.$refs.sidebar.contains(event.target)) {
        this.sidebarVisible = false;
      }
    },
    fetchInspections() {
      // Fetch logic for QC inspections (if needed)
    },
  },
};
</script>

<style scoped>
#app {
  font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  background-color: #f8f9fa;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  color: #2c3e50;
  padding: 10px 15px;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.logo:hover {
  transform: scale(1.1);
}

.title h1 {
  font-size: 35px;
  font-weight: 600;
  color: #2c3e50;
}

.hamburger {
  font-size: 30px;
  background: none;
  border: none;
  cursor: pointer;
  color: #2c3e50;
  transition: color 0.2s ease;
  margin-right: 25px;
  z-index: 1001;
}

.hamburger:hover {
  color: #4caf50;
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 70px;
  right: 0;
  width: 250px;
  height: 100%;
  background-color: #ffffff;
  color: #2c3e50;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transform: translateX(250px);
  transition: transform 0.3s ease-in-out;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
}

.sidebar-visible {
  transform: translateX(0);
}

.sidebar ul {
  list-style-type: none;
  margin-top: 20px;
  padding: 0;
}

.sidebar li {
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.2s ease;
  text-align: left;
  margin-left: 12px;
}

.sidebar li:hover {
  color: #4caf50;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-top: 70px; /* Space for the fixed header */
  padding-bottom: 50px; /* Space for the fixed footer */
  background-color: #ffffff;
  width: 100%;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
  text-align: center;
  border-top: 1px solid #e0e0e0;
  font-size: 14px;
  color: #666;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .header {
    height: 55px;
    padding: 8px 10px;
  }

  .logo {
    font-size: 1.2rem;
  }

  .hamburger {
    font-size: 1.5rem;
    margin-right: 15px;
  }

  .sidebar {
    width: 200px;
  }

  .sidebar li {
    font-size: 0.9rem;
    padding: 8px 12px;
  }

  .main-content {
    padding: 15px;
    margin-top: 60px;
  }
}

@media (max-width: 480px) {
  .header {
    height: 50px;
    padding: 6px 8px;
  }

  .logo {
    font-size: 1rem;
  }

  .hamburger {
    font-size: 1.3rem;
    margin-right: 10px;
  }

  .sidebar {
    width: 180px;
  }

  .sidebar li {
    font-size: 0.85rem;
    padding: 6px 10px;
  }

  .main-content {
    padding: 10px;
    margin-top: 55px;
  }
}

</style>