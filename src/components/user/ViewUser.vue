<template>
  <div class="container">
    <div class="card text-center" v-if="user">
      <div class="card-header">
        <strong>{{ user.name }}</strong>
        <router-link to="/users" class="btn btn-primary btn-sm" style="position: absolute; top: 8px; right: 15px;">Back</router-link>
      </div>
      <div class="card-body">
        <h5 class="card-title"></h5>
        <div class="card-text">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td><strong>Name</strong></td>
                <td>{{ user.name }}</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>{{ user.email }}</td>
              </tr>
              <tr>
                <td><strong>Phone</strong></td>
                <td>{{ user.phone }}</td>
              </tr>             
              <tr>
                <td><strong>Address</strong></td>
                <td>
                  {{
                    `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ViewUser",
  data: function() {
    return {
      heading: "View User",
      user: null,
    };
  },
  created: function() {
    const id = this.$route.params.id;
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((res) => {
        this.user = res.data;
      });
  },
};
</script>
