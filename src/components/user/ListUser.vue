<template>
   <div class="container">
   <div class="formheader">
      <h3>User Listing</h3>
      <router-link to="/add-user" class="btn btn-primary btn-sm" style="position: absolute; top: 15px; right: 15px;">Add New User</router-link>
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
import { mapState } from 'vuex'

export default {
  name: 'UserList',
  data: function() {
    return {
      heading: "User List",
    }
  },
  computed: {
    ...mapState(['users', 'usersFetched']),
  },    
  created() {
    // Call [getUserList] action so that vuex can update [users] by fetching data from API.
    if(this.usersFetched === false) {
      this.$store.dispatch('getUserList');
    }      
  },
  methods: {
    deleteUser : function(user) {
      if(confirm('Are you sure you want to delete this user?')) {
        this.$store.dispatch('deleteUser', user);
      }        
    }
  }
}
</script>

<style scoped>
  .formheader {
    position: relative;
    background-color: #CCC;
    padding: 10px;
  }
</style>
