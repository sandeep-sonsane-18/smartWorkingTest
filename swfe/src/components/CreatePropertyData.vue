<template>
    <div>
      <form @submit.prevent="submitForm" v-if="!formSubmitted">
        <span>County: </span>
        <input 
          v-model="form.county"
          type="text"
          placeholder="Enter your county" 
          @keyup="removeErrorMessage('county')"
        /><sub class="red-text">{{ formErrors.county }}</sub><br>
        <span>Country: </span>
        <input 
          v-model="form.country"
          type="text"
          placeholder="Enter your country" 
          @keyup="removeErrorMessage('country')"
        /><sub class="red-text">{{ formErrors.country }}</sub><br>
        <span>Town: </span>
        <input 
          v-model="form.town"
          type="text"
          placeholder="Enter your town"
          @keyup="removeErrorMessage('town')"
        /><sub class="red-text">{{ formErrors.town }}</sub><br>
        <span>Postcode: </span>
        <input 
          v-model="form.postcode"
          type="number"
          placeholder="Enter your postcode"
          @keyup="removeErrorMessage('postcode')"
        /><sub class="red-text">{{ formErrors.postcode }}</sub><br>
        <span>Description: </span>
        <input 
          v-model="form.description"
          type="textarea"
          placeholder="Enter your description"
          @keyup="removeErrorMessage('description')"
        /><sub class="red-text">{{ formErrors.description }}</sub ><br>
        <span>Displayable Address: </span>
        <input 
          v-model="form.displayable_name"
          type="text"
          placeholder="Enter your displayable address"
          @keyup="removeErrorMessage('displayable_name')"
        /><sub class="red-text">{{ formErrors.displayable_name }}</sub><br>
        <span v-show="setImage">
          <span>Uploaded Image: </span>
          <img v-bind:src="setImage" :width="120" :height="120" alt="" > 
        </span><br>
        <span>
          <span>Image upload: </span>
          <input 
          type="file" id="file" ref="file" @change="handleFileUpload( $event ), removeErrorMessage('image_url')" accept=".jpg"
          /><sub class="red-text">{{ formErrors.image_url }}</sub><br>
        </span>
        <span>Number of bedrooms: </span>
        <select name="no_of_bedrooms" id="no_of_bedrooms" v-model="form.no_of_bedrooms">
            <option v-for="i in 100" :key="i" :value="i">{{ i }}</option>
        </select><br>
        <span>Number of bathrooms: </span>
        <select name="no_of_bathrooms" id="no_of_bathrooms" v-model="form.no_of_bathrooms">
            <option v-for="j in 100" :key="j" :value="j">{{ j }}</option>
        </select><br>
        <span>Price: </span>
        <input 
          v-model="form.price"
          type="number"
          placeholder="Enter your price"
          @keyup="removeErrorMessage('price')" 
        /><sub class="red-text">{{ formErrors.price }}</sub><br>
        <span>Property Type: </span>
        <select name="property_type" id="property_type" v-model="form.property_type" @change="removeErrorMessage('property_type')">
            <option v-for="v, index in property_types" :key="index" :value="v">{{ v }}</option>
        </select><sub class="red-text">{{ formErrors.property_type }}</sub><br>
        <span>For Sale / For Rent: </span>
        <input 
          type="radio" 
          v-model="form.for_sale_rent" 
          value="For Rent"
        />
        <label>For Rent</label>
        <input 
          type="radio" 
          v-model="form.for_sale_rent" 
          value="For Sale" 
        />
        <label>For Sale</label><br>
        <input 
          class="submit" 
          type="submit" 
          value="Submit"
        >
      </form>
      <div v-if="formSubmitted">
        <h3>Form Submitted</h3>
        <p>Name: {{ name }}</p>
        <p>Email: {{ email }}</p>
        <p>Gender: {{ gender }}</p>
        <small>Click on run to launch the app again.</small>
      </div>
    </div>
  </template>
  <script>
    import axios from 'axios'
    export default {
      props: {editFormData : Object},
      watch: {
          editFormData:  {
            // the callback will be called immediately after the start of the observation
            immediate: true, 
            handler (val, oldVal) {
              // do your stuff
              this.form = val;
              this.form.isUpdate = true;
              this.setImage = val.image_url;
                console.log('Prop changed: ', val, ' | was: ', oldVal)
            }
          }
          // function(newVal, oldVal) { // watch it
          //   this.form = newVal;
          //   console.log('Prop changed: ', newVal, ' | was: ', oldVal)
          // }
      },  
      data() {
        return {
          name: "",
          email: "",
          gender: "",
          formSubmitted: false,
          setImage: '',
          image_url:'',
          property_types: ['Terraced','Flat','Semi-detached','Cottage','End of Terrace','Bungalow','Detatched'],
          form: {
            county:'',
            country:'',
            town:'',
            postcode:'',
            description:'',
            displayable_name:'',
            image_url:'',
            no_of_bedrooms:1,
            no_of_bathrooms:1,
            price:0,
            property_type:'',
            for_sale_rent:'For Rent',
            isUpdate:false,
          },
          formErrors: {
            county:'',
            country:'',
            town:'',
            postcode:'',
            description:'',
            displayable_name:'',
            image_url:'',
            no_of_bedrooms:'',
            no_of_bathrooms:'',
            price:'',
            property_type:'',
            for_sale_rent:''
          },
          errorsMessages: {
            county:{
                required:'This field is required',
            },
            country:{
                required:'This field is required',
            },
            town:{
                required:'This field is required',
            },
            postcode:{
                required:'This field is required',
            },
            description:{
                required:'This field is required',
            },
            displayable_name:{
                required:'This field is required',
            },
            image_url:{
                required:'This field is required',
                allowed:'Only Jpg files allowed'
            },
            no_of_bedrooms:{
                required:'This field is required',
            },
            no_of_bathrooms:{
                required:'This field is required',
            },
            price:{
                required:'Invalid amount',
            },
            property_type:{
                required:'This field is required',
            },
            for_sale_rent:{
                required:'This field is required',
            }
          }
        };
      },
      methods: {
        submitForm: function () {
            
          this.form.image_url = this.image_url;

          if(!this.validateForm(this.form)){
            return false;
          } else {
            axios.post('http://localhost:8000/api/savePropertyDetails',this.form,
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
        },
        handleFileUpload( event ){
            this.image_url = event.target.files[0];
        },
        removeErrorMessage(tag) {
            this.formErrors[tag] = '';
        },
        validateForm(data) {
            var errorCount = 0;
            if(data.county == ''){
                this.formErrors.county = this.errorsMessages.county.required;
                errorCount + 1;
            }

            if(data.country == ''){
                this.formErrors.country = this.errorsMessages.country.required;
                errorCount + 1;
            }

            if(data.postcode == ''){
                this.formErrors.postcode = this.errorsMessages.postcode.required;
                errorCount + 1;
            }

            if(data.description == ''){
                this.formErrors.description = this.errorsMessages.description.required;
                errorCount + 1;
            }

            if(data.displayable_name == ''){
                this.formErrors.displayable_name = this.errorsMessages.displayable_name.required;
                errorCount + 1;
            }

            if(data.property_type == ''){
                this.formErrors.property_type = this.errorsMessages.property_type.required;
                errorCount + 1;
            }

            if(this.image_url.length == 0 && this.setImage == ''){
                this.formErrors.image_url = this.errorsMessages.image_url.required;
                errorCount + 1;
            }

            if(this.image_url != '' && this.image_url['type'] != 'image/jpeg'){
                this.formErrors.image_url = this.errorsMessages.image_url.allowed;
                document.getElementById('file').value = '';
                errorCount + 1;
            }
            
            if(data.price <= 0){
                this.formErrors.price = this.errorsMessages.price.required;
                errorCount + 1;
            }

            if(errorCount > 0) {
                return false;
            } else {
                return true;
            }
        }
      },
      created () {
        axios.get("http://localhost:8000/api/fetchPropertyTypes")
                .then(response => {
                    if(response.data.length > 0){
                      this.property_types = response.data;
                    }
                })
                .catch(err => {
                    console.log(err)
                })
    }
    };
  </script>
  <style>
    form {
      padding: 10px;
      border: 2px solid black;
      border-radius: 5px;
    }
  
    input {
      padding: 4px 8px;
      margin: 4px;
    }
  
    span {
      font-size: 18px;
      margin: 4px;
      font-weight: 500;
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
    
    .red-text {
        color:red;
    }
  
  </style>