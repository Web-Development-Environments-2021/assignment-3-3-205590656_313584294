<template>
  <small v-if="!this.saved"
    ><button @click="addToFavorites" class="button" type="button">
      <b-icon-heart-fill style="color:#A9A9A9"></b-icon-heart-fill></button
  ></small>
  <small v-else
    ><b-icon-heart-fill style="color:#FF0000"></b-icon-heart-fill
  ></small>
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
        // this.$root.store.favoriteRecipes = [];

        this.saved = true;
        if(localStorage.lastSearch){
          var recipes = JSON.parse(localStorage.lastSearch);
         for (var i = 0; i < recipes.length; i++) {
            if(recipes[i].id == this.recipeID){
              if(this.saved != recipes[i].saved){   
                recipes[i].saved = this.saved;        
              }
            }
          }
          localStorage.removeItem("lastSearch");

          localStorage.setItem("lastSearch", JSON.stringify(recipes));
        }
      } catch (error) {
        console.log(error.response);
      }
    },
   },
};
</script>

<style scoped></style>
