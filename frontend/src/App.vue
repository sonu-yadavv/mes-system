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
        <li @click="setActivePage('QCInspectionForm')">Quality Control Inspection Form</li>
        <li @click="setActivePage('QCInspectionList')">Quality Control Inspection List</li>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 30px;
  cursor: pointer;
}

.title h1 {
  font-size: 24px;
  font-weight: bold;
}

.hamburger {
  font-size: 30px;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0; /* Change from left to right */
  width: 200px;
  height: 100%;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: translateX(200px); /* Initially hide sidebar off-screen to the right */
  transition: transform 0.3s ease-in-out;
}

.sidebar-visible {
  transform: translateX(0); /* Show sidebar when active */
}

.sidebar ul {
  list-style-type: none;
  margin-top: 60px;
  padding: 0;
}

.sidebar li {
  margin-bottom: 20px;
  cursor: pointer;
}

.sidebar li:hover {
  color: #4caf50;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-top: 80px; /* Space for the fixed header */
  padding-bottom: 60px; /* Space for the fixed footer */
}

.qc-container {
  margin-top: 2rem;
  background-color: #e0f7fa;
  border-radius: 10px;
  padding: 2rem;
}

h2 {
  margin-bottom: 1rem;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: #f4f4f4;
  text-align: center;
  border-top: 1px solid #ccc;
}

/* Samsung S8 and iPhone XR */
@media (max-width: 414px) {  /* Targeting iPhone XR */
  /* Sidebar adjustments for iPhone XR and small devices */
  .sidebar {
    margin-top: 15px;
    width: 220px;
    transform: translateX(220px);
  }

  .sidebar-visible {
    transform: translateX(0);
  }

  .main-content {
    margin-top: 120px; /* More space for header */
    padding: 15px;
  }

  .footer {
    padding: 8px;
  }
}

@media (max-width: 375px) {  /* Targeting Samsung S8 */
  .hamburger {
    font-size: 25px;
  }

  /* Sidebar adjustments for Samsung S8 */
  .sidebar {
    margin-top: 15px;
    width: 200px;
    transform: translateX(200px);
  }

  .sidebar-visible {
    transform: translateX(0);
  }

  .main-content {
    margin-top: 130px; /* More space for header */
    padding: 12px;
  }

  .footer {
    padding: 8px;
  }
}

/* General Small Screens */
@media (max-width: 768px) { /* For tablets and smaller devices */

  .sidebar {
    margin-top: 15px;
    width: 220px;
    transform: translateX(220px);
  }

  .sidebar-visible {
    transform: translateX(0);
  }

  .main-content {
    margin-top: 120px; /* More space for header */
    padding: 15px;
  }

  .footer {
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .logo h1 {
    font-size: 24px;
  }

  .title h1 {
    font-size: 18px;
  }

  .hamburger {
    font-size: 20px;
  }

  .sidebar {
    margin-top: 15px;
    width: 180px;
    transform: translateX(180px);
  }

  .sidebar-visible {
    transform: translateX(0);
  }

  .main-content {
    margin-top: 140px; /* More space for header */
    padding: 10px;
  }

  .footer {
    padding: 8px;
  }
}
</style>