<template>
   <div class="container">
   <div style="position: relative;">
      <h3 class="mb-4">User Listing</h3>
      <router-link to="/add-user" class="btn btn-primary btn-sm" style="position: absolute; top: 5px; right: 10px;">Add New User</router-link>
   </div> 
    <table class="table table-bordered table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <!--<th scope="col">Address</th>-->
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody v-if="(users && users.length > 0)">
        <tr v-for="(user, index) in users" v-bind:key="index"> 
          <th scope="row">{{index + 1}}</th>
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td>{{user.phone}}</td>
          <!--<td>{{`${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}}</td>-->
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
        .get('http://localhost:3000/users')
        .then(res => res.data.slice(0, 10))
        .then(res => {
          this.users = res.sort((a, b) => a.name.localeCompare(b.name));
        })
    },
    methods: {
    deleteUser : function(user) {
        if(confirm('Are you sure you want to delete this user?')) {

          this.users = this.users.filter((u) => u.id != user.id);

          axios.delete(`http://localhost:3000/users/${user.id}`).then(res => {
            console.log(res);
            // alert("Deleted Successfully!!");
          }, error => {
            console.log(error);
          });
        }        
      }
    }
}
</script>