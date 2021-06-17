<template>
  <b-container>
    <h3 class="title">
      {{ title }}
      <slot></slot>
    </h3>
    <b-row>
      <!-- <div v-if="pageType === 'family'">
        <b-col v-for="r in recipes" :key="r.id">
          <FamilyRecipePreview class="recipePreview" :recipe="r" />
          <br />
        </b-col>
      </div> -->
      <div v-if="pageType === 'random'">
        <b-col v-for="p in playersList" :key="p.id">
          <PlayerPreview class="PlayerPreview" :player="p" />
          <br />
        </b-col>
      </div>
      <div v-else-if="pageType === 'search'">
        <b-col v-for="p in playersList" :key="p.id">
          <PlayerPreview class="PlayerPreview" :player="p" />
          <br />
        </b-col>
      </div>
      <div v-else>
        <b-col v-for="p in players" :key="p.id">
          <PlayerPreview class="PlayerPreview" :player="p" />
          <br />
        </b-col>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import PlayerPreview from "./PlayerPreview.vue";
export default {
  name: "PlayerPreviewList",
  components: {
    PlayerPreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    pageType: {
      type: String,
      required: true,
    },
    playersList: {
      type: Array,
    },
  },

  data() {
    return {
      players: [],
    };
  },
  mounted() {
    this.updatePlayers();
  },

  methods: {
    async updatePlayers() {
      try {
        let globalPlayers = [];
        if (this.pageType != "random" && this.pageType != "search") {
          var players;
          let url = "http://localhost:3004/";
        //   if (this.pageType == "lastSeen") {
        //     url += "user/last3SeenRecipes";
        //     if (this.$root.store.lastSeenRecipes.length != 0) {
        //       globalRecipes = this.$root.store.lastSeenRecipes;
        //     }
        //   } else if (this.pageType == "myrecipes") {
        //     url += "user/myPersonalRecipesPreview";
        //     if (this.$root.store.myRecipes.length != 0) {
        //       globalRecipes = this.$root.store.myRecipes;
        //     }
        //   } else if (this.pageType == "family") {
        //     url += "user/myFamilyRecipesPreview";
        //     if (this.$root.store.familyRecipes.length != 0) {
        //       globalRecipes = this.$root.store.familyRecipes;
        //     }
        //   } else if (this.pageType == "favorite") {
        //     url += "user/myFavRecipes";
        //     if (this.$root.store.favoriteRecipes.length != 0) {
        //       globalRecipes = this.$root.store.favoriteRecipes;
        //     }
          }
          if (globalPlayers.length != 0) {
            players = globalPlayers;
            console.log("took from global storage");
          } else {
            const response = await this.axios.get(url, {
              withCredentials: true,
            });
            players = response.data;

            if (this.pageType == "lastSeen") {
              this.$root.store.lastSeenPlayers = players;
            // } else if (this.pageType == "myrecipes") {
            //   this.$root.store.myRecipes = recipes;
            // } else if (this.pageType == "family") {
            //   this.$root.store.familyRecipes = players;
            // } else if (this.pageType == "favorite") {
            //   this.$root.store.favoriteRecipes = players;
            // }
          }

          if (this.$root.store.username) {
            const players_ids = [];
            for (var i = 0; i < players.length; i++) {
              players_ids.push(players[i].id);
            }
            //console.log(players_ids);
            const responsePlayersInfo = await this.axios.get(
              this.$root.store.BASE_URL +
                "/players/previewPlayerInfo/ids/[" +
                players_ids +
                "]",
              { withCredentials: true }
            );
            var playerInfo = responsePlayersInfo.data;
          }
          this.players = [];
          for (var i = 0; i < players.length; i++) {
            var currPlayer = players[i];
            if (playerInfo) {
              currPlayer.watched = playerInfo[currPlayer.id].watched;
              currPlayer.saved = playerInfo[currPlayer.id].saved;
            }
            this.players.push(currPlayer);
          }
          //console.log(players);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
.title {
  color: #2c3e50;
  -webkit-text-stroke-width: 1px;
  text-align: center;
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  font-size: 30px;
  font-weight: bold;
}
</style>
