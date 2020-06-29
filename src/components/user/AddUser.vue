<template>
  <div class="container">
   <div style="position: relative;">
      <h3 class="mb-4">{{heading}}</h3>
      <router-link to="/users" class="btn btn-primary btn-sm" style="position: absolute; top: 5px; right: 10px;">Back</router-link>
   </div> 
    <form @submit="onSubmit" method="post">
    
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </p>

      <div class="form-group">
        <label for="name">Name:</label>
        <input type="name" class="form-control" placeholder="Enter name" id="name" v-model="user.name">
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" class="form-control" placeholder="Enter email" id="email" v-model="user.email">
      </div>

      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="text" class="form-control" placeholder="Enter phone" id="phone" v-model="user.phone">
      </div>   

      <div class="form-group">
        <label for="street">Street:</label>
        <input type="text" class="form-control" placeholder="Enter street" id="street" v-model="user.address.street">
      </div>   

      <div class="form-group">
        <label for="city">City:</label>
        <input type="text" class="form-control" placeholder="Enter city" id="city" v-model="user.address.city">
      </div>  

      <div class="form-group">
        <label for="phone">Zipcode:</label>
        <input type="text" class="form-control" placeholder="Enter zipcode" id="zipcode" v-model="user.address.zipcode">
      </div>   

      <div class="form-group" style="text-align: right;">
        <router-link to="/users" class="btn btn-danger" style="margin: 0 10px;">Cancel</router-link>
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>  

    </form>  
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'AddUser',
  data: function() {
    return {
        heading: "Add New User",
        errors: [],
        user: {
          name: 'Pradeepta Khatoi',
          email: null,
          phone: null,
          address: {
            street: null,       
            city: null,
            zipcode: null  
          }
        }        
    }
  },
  methods:{
    onSubmit: function (e) {
      e.preventDefault();

      this.errors = [];

      const {name, email, phone, address} = this.user;

      if (!name) {
        this.errors.push('Name required.');
      }
      if (!email) {
        this.errors.push('Email required.');
      }
      if (!phone) {
        this.errors.push('Phone required.');
      }
      if (!address.street) {
        this.errors.push('Street required.');
      }
      if (!address.city) {
        this.errors.push('City required.');
      }

      if (this.errors.length === 0) {
        axios.post(`http://localhost:3000/users/`, this.user).then((res) => {
          console.log(res);
          this.$router.push({ name: 'Users' });
          alert("New user added successfully!!");
        }, error => {
          console.log(error);
        });
      }      
      
    }
  }
}
</script>

<style scoped>
  .container {
    max-width: 500px;
  }
  .form-group label {
    display: block;
    text-align: left;
  }
</style>