<template>
  <div>
    <h1 class="title">Search Page</h1>
    <b-input-group prepend="Search Query:" id="search-input">
      <b-form-input v-model="searchQuery"></b-form-input>
      <b-input-group-append>
        <b-button variant="success">Search</b-button>
      </b-input-group-append>
    </b-input-group>
      <br/>
      Your search Query: {{ searchQuery }}
  </div>
</template>

<script>
export default {
 data() {
    return {
      searchQuery:""
    };
  },
}
</script>

<style lang="scss" scoped>

#search-input {
  margin-left: 20px; 
  width: 500px; 
}
.title{
    background: url("https://ae01.alicdn.com/kf/HTB1PlSmirorBKNjSZFjq6A_SpXa6/Laeacco.jpg_q50.jpg");
    color: white;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    text-align: center;
    font-family:"Trebuchet MS", Helvetica, sans-serif;
    font-size: 50px;
    font-weight: bold;
}
</style>