<template>
   <div class="container">
    <h3> Users:</h3>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">City</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" v-bind:key="user.id"> 
          <th scope="row">{{user.id}}</th>
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td>{{user.address.city}}</td>
          <td>
            <a href="javascript:;">View</a> | 
            <a href="javascript:;">Edit</a> | 
            <a href="javascript:;">Delete</a>
          </td>
        </tr>
      </tbody>
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
            users: null,
        }
    },
    created: function() {
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
          this.users = res.data;
        })
    }
}
</script>