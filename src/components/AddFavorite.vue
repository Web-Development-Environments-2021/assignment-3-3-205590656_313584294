<template>
  <small v-if="!this.saved"
<<<<<<< HEAD
    ><button active @click="AddToFavorites" class="button" type="button">
      <b-icon-heart-fill style="color:#A9A9A9"></b-icon-heart-fill></button
  ></small>
  <small v-else
    ><button class="button" type="button">
      <b-icon-heart-fill style="color:#FF0000"></b-icon-heart-fill></button>
  </small>
=======
    ><button @click="addToFavorites" class="button" type="button">
      <b-icon-heart-fill style="color: #a9a9a9"></b-icon-heart-fill></button
  ></small>
  <small v-else><b-icon-heart-fill style="color: #ff0000"></b-icon-heart-fill></small>
>>>>>>> d5aa5a4e7e72dc52757991d8496b12446a60fd2f
</template>

<script>
export default {
  name: "AddFavorite",
  data() {
    return {
      saved: false,
    };
  },
  props: {
    gameID: {
      type: Number,
      required: true,
    },
    isSaved: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    //console.log(this.recipeID);
    //console.log(this.isSaved);
    this.saved = this.isSaved;
  },
  methods: {
    async AddToFavorites() {
      try {
        const post = await this.axios.post(
          "http://localhost:4000/users/addFavoriteGames",
          {
            gameID: this.gameID,
          }
        );

        this.saved = true;
<<<<<<< HEAD
        if(localStorage.ArrayOfFavorite){
          let favoriteGames = JSON.parse(localStorage.ArrayOfFavorite);
         for (var i = 0; i < favoriteGames.length; i++) {
            if(favoriteGames[i].game_id == this.gameID){
                 
                favoriteGames[i].saved = this.saved;        
              
=======
        if (localStorage.lastSearch) {
          var recipes = JSON.parse(localStorage.lastSearch);
          for (var i = 0; i < recipes.length; i++) {
            if (recipes[i].id == this.recipeID) {
              if (this.saved != recipes[i].saved) {
                recipes[i].saved = this.saved;
              }
>>>>>>> d5aa5a4e7e72dc52757991d8496b12446a60fd2f
            }
          }
          // localStorage.removeItem("lastSearch");

          // localStorage.setItem("lastSearch", JSON.stringify(recipes));
        }
      } catch (error) {
        console.log(error.response);
      }
    },
  },
};
</script>

<style scoped></style>
