<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
    <div class="container">
      <router-link class="nav-link pr-3" to="/">
        <a class="navbar-brand float-left">MEVN Stack Example</a>
      </router-link>
      <ul class="nav navbar-nav flex-row float-right">
        <li class="nav-item">
          <router-link class="nav-link pr-3" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link pr-3" to="/about">About</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/list">View Students</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/create">Add New Student</router-link>
        </li>
      </ul>
    </div>
  </nav>
  <div class="container mt-5">
    <router-view></router-view>
  </div>
</template>

<style>
.nav-item {
  padding: 0 1vw;
}
.form-group{
  padding: 1vh 0;
}
.btn-primary {
  margin-right: 1.5vw;
}
</style>