<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div>
    <button @click="showForm()" class="submit right" id="propertyForm">Create</button>
  </div>
  <CreatePropertyData v-show="isCreate" v-bind:editFormData="formData" ref="createProperty" @renderComponent="renderComponent"/>
  <PropertyListing msg="Welcome Admin!" @fetchPropertyDataToUpdate="fetchPropertyDataToUpdate" @deletePropertyData="deletePropertyData"/>
</template>

<script>
import CreatePropertyData from './components/CreatePropertyData.vue'
import PropertyListing from './components/PropertyListing.vue'
import axios from "axios"

export default {
  name: 'App',
  components: {
    CreatePropertyData,
    PropertyListing,
  },
  data () {
        return {
            isCreate:false,
            formData:{},
            deleteForm: {
              id:''
            }
        }
  },
  methods: {
    showForm(flag) {
      if(flag == 'openForm'){
        this.isCreate = true;  
      } else {
        this.isCreate = !this.isCreate;
      }
      this.goto();
    },
    goto() {
      document.getElementById('propertyForm').scrollIntoView({
        behavior: "smooth"
      });
    },
    fetchPropertyDataToUpdate(id, openFlag) {
      axios.get("http://localhost:8000/api/fetchPropertyDetails/"+id)
            .then(response => {
              console.log(response)
                this.formData = response.data;
                this.showForm(openFlag);
            })
            .catch(err => {
                console.log(err)
            })
    },
    deletePropertyData(id) {
      if(confirm("Are you sure you want to delete this property ?")){
        // alert('Deleted '+id);
        this.deleteForm.id = id;
        axios.post('http://localhost:8000/api/deleteProperty',this.deleteForm,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => function(){
            console.log(response);
            })
            .catch(response => function(){
            console.log(response);
            });

            setTimeout(() => {
              window.location.reload();
            }, 1000);

      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center !important;
  color: #2c3e50;
  margin-top: 60px;
}
.submit {
  font-size: 15px;
  color: #fff;
  background: #222;
  padding: 6px 12px;
  border: none;
  margin-top: 8px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
