<template>
  <small v-if="!this.saved"
    ><button active @click="AddToFavorites" class="button" type="button">
      <b-icon-heart-fill style="color:#A9A9A9"></b-icon-heart-fill></button
  ></small>
  <small v-else
    ><button class="button" type="button">
      <b-icon-heart-fill style="color:#FF0000"></b-icon-heart-fill></button>
  </small>
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
        if(localStorage.ArrayOfFavorite){
          let favoriteGames = JSON.parse(localStorage.ArrayOfFavorite);
         for (var i = 0; i < favoriteGames.length; i++) {
            if(favoriteGames[i].game_id == this.gameID){
                 
                favoriteGames[i].saved = this.saved;        
              
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
