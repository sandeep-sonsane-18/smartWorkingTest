<template>
    <div class="hello center">
      <h1>{{ msg }}</h1>
      <table border="1px solid black">
        <thead>
            <tr>
                <th>Property ID</th>
                <th>Property Name</th>
                <th>Description</th>
                <th>Country</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody v-if="propertyData.length > 0">
            <tr v-for="prop in propertyData" v-bind:key="prop.id">
                <td>{{ prop.id }}</td>
                <td>{{ prop.property_type }}</td>
                <td>{{ prop.description }}</td>
                <td>{{ prop.country }}</td>
                <td>
                    <button class="blue" @click="$emit('fetchPropertyDataToUpdate', prop.id, 'openForm')">Edit</button>
                    <button class="red" @click="$emit('deletePropertyData', prop.id)">Delete</button>
                </td>
            </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="5">No data found</td>
          </tr>
      </tbody>
    </table>
    </div>
  </template>
  
  <script>
  import axios from "axios"
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data () {
        return {
            propertyData:[]
        }
    },
    created () {
        axios.get("http://localhost:8000/api/fetchProperties")
                .then(response => {
                    this.propertyData = response.data.sort();
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

  .center{
    margin:auto;
    text-align: center;
  }

  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

  
.red {
    background-color:maroon;
    border-radius:5px;
}

.blue {
    background-color:aquamarine;
    border-radius:5px;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

  </style>
  