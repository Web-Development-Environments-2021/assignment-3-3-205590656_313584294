<template>
  <div class="container">
    <h1 class="title">Manage League</h1>
     <b-container class="bv-example-row">
      <b-row>
        <b-col>
            <AllLeagueGames>
                
            </AllLeagueGames>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import AllLeagueGames from "../components/AllLeagueGames"
  export default {
    components: {AllLeagueGames}
  };

</script>

<style lang="scss" scoped>

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