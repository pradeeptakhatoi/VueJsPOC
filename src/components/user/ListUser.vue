<template>
   <div class="container">
    <h3 class="mb-4">User Listing</h3>
    <table class="table table-bordered table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">City</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody v-if="(users && users.length > 0)">
        <tr v-for="user in users" v-bind:key="user.id"> 
          <th scope="row">{{user.id}}</th>
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td>{{user.address.city}}</td>
          <td>
            <router-link v-bind:to="{ name: 'ViewUser', params: {id: user.id } }" class="btn btn-primary btn-sm">View</router-link>&nbsp;&nbsp; 
            <router-link v-bind:to="{ name: 'EditUser', params: {id: user.id } }" class="btn btn-secondary btn-sm">Edit</router-link>&nbsp;&nbsp;
            <a href="javascript:;" @click="deleteUser(user)" class="btn btn-danger btn-sm">Delete</a>
          </td>
        </tr>
      </tbody>
      <tbody v-else><tr><td colspan="5">No User Found!!</td></tr></tbody>
    </table> 
  </div> 
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserList',
   data: function() {
      return {
        heading: "User List",
        users: [],
      }
    },
    created: function() {
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(res => res.data.slice(0, 5))
        .then(res => {
          this.users = res;
        })
    },
    methods: {
    deleteUser : function(user) {
        if(confirm('Are you sure you want to delete this user?')) {
          this.users = this.users.filter((u) => u.id != user.id);
        }        
      }
    }
}
</script>