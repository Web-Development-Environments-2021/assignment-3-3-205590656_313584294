<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
     <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <!-- <RandomRecipes :recipesArray="recipesList" class="RandomRecipes" />
          <ButtonRandomRecipes v-on:represhRandom="updateNewRandomRecipes"/> -->
            <LeagueInfo></LeagueInfo>
        </b-col>
        <b-col>
          <div v-if="!$root.store.username" to="/login">
            <Login />
          </div>
          <div v-else>
            <FavoriteGames></FavoriteGames>
            <!-- <RecipePreviewList title="Last Watched Recipes:" pageType="lastSeen"
              :class="{
                RandomRecipes: true,
                blur: !$root.store.username,
                center: true,
              }"
              disabled
            /> -->
          </div>
        </b-col>
      </b-row>
    </b-container>
    <!-- <Login v-if="!$root.store.username"></Login>
    <FavoriteGames v-else></FavoriteGames>
    <LeagueInfo></LeagueInfo> -->
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGames from "../components/FavoriteGames";
//import LoginPage from "../pages/LoginPage";
import Login from "../components/Login"
export default {
  components: {
    LeagueInfo,
    Login, 
    FavoriteGames
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
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
