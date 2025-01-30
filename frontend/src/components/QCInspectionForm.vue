
<template>
  <div class="qc-form">
    <h2 class="title">📝 Quality Control Inspection</h2>

    <div class="form-container">
      <!-- Product Name Dropdown with Search -->
      <div class="autocomplete">
        <input 
          v-model="searchQuery" 
          placeholder="Search Product Name" 
          class="input"
          @input="filterProducts"
          @focus="showDropdown = true"
          @blur="hideDropdown"
        />
        <ul v-if="showDropdown" class="dropdown">
          <li v-for="product in filteredProducts" :key="product.id" @mousedown="selectProduct(product.product_name)">
            {{ product.product_name }}
          </li>
        </ul>
      </div>

      <input v-model="inspectionData.inspector" placeholder="Inspector Name" class="input" />
      <input v-model="inspectionData.defect_rate" type="number" placeholder="Defect Rate (%)" class="input" />
      <textarea v-model="inspectionData.comments" placeholder="Comments" class="textarea"></textarea>

      <button @click="addInspection" class="btn-add">➕ Schedule Inspection</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      inspectionData: {
        product_name: '',
        inspector: '',
        defect_rate: '',
        comments: ''
      },
      searchQuery: '', // For product search input
      products: [], // Store fetched products
      filteredProducts: [], // Filtered list for search
      showDropdown: false, // Toggle dropdown visibility
    };
  },
  async created() {
    await this.fetchProducts(); // Fetch product names on component load
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get("http://backend:5000/api/production");
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    filterProducts() {
      if (!this.searchQuery) {
        this.filteredProducts = [];
        return;
      }
      this.filteredProducts = this.products.filter(product =>
        product.product_name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.showDropdown = this.filteredProducts.length > 0;
    },
    selectProduct(productName) {
      this.inspectionData.product_name = productName;
      this.searchQuery = productName;
      this.showDropdown = false;
    },
    hideDropdown() {
      setTimeout(() => (this.showDropdown = false), 200);
    },
    async addInspection() {
      try {
        await axios.post("http://backend:5000/api/qc_inspections", this.inspectionData);
        this.inspectionData = { product_name: '', inspector: '', defect_rate: '', comments: '' };
        this.searchQuery = '';
        this.$emit('inspection-scheduled'); // Trigger refresh of the inspection list
      } catch (error) {
        console.error("Error scheduling inspection:", error);
      }
    }
  }
};
</script>

<style scoped>
/* Center the form */
.qc-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: auto;
}

.title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.input, .textarea {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

.textarea {
  min-height: 80px;
  resize: none;
}

/* Autocomplete dropdown styling */
.autocomplete {
  width: 100%;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  max-height: 150px;
  overflow-y: auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.dropdown li {
  padding: 0.5rem;
  cursor: pointer;
}

.dropdown li:hover {
  background-color: #f1f1f1;
}

.btn-add {
  background-color: #4caf50;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-add:hover {
  background-color: #388e3c;
}

/* Responsive Design */
@media (max-width: 600px) {
  .qc-form {
    width: 90%;
    padding: 1.5rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .input, .textarea {
    font-size: 0.9rem;
  }

  .btn-add {
    font-size: 0.9rem;
  }
}
</style>
