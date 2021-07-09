<template>
  <div class="container">
       <h1 class="title">{{ player.name }}</h1> 
       <PlayerPreviewList
            pageType="search"
            :playersList="player"
            class="SearchRecipes" 
          />
    <div v-if="player">
      <div class="header">
        <h1 class="title">{{ player.name }}</h1> 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <img :src="player.image" class="center" />
        <br />
      </div>
      <div class="player-body">
 
       
      </div>
    </div>
  </div>
</template>

<script>
import PlayerPreviewList from '../components/PlayerPreviewList.vue';
export default {
    name: PlayerViewPage,
  components: {
    PlayerPreviewList,
  },
  data() {
    return {
      player: null,
    };
  },

  async created() {
    this.created();
  },

  methods: {
    async created() {
      try {
        let _player;
          const response = await this.axios.get(
            this.$root.store.BASE_URL +
              "/players/fullPlayerInfo/ids/" +
              this.$route.params.playerId,
            { withCredentials: true }
          );
          _player = response.data[0];
        console.log("eeeeeeeeeeeeeeeee");
        console.log(_player);
        //update local storage
        if (localStorage.lastSearch) {
          var players = JSON.parse(localStorage.lastSearch);
          //console.log(players);
          localStorage.removeItem("lastSearch");
          //console.log(localStorage.lastSearch);
          // console.log(players);
          localStorage.setItem("lastSearch", JSON.stringify(players));
          //console.log(localStorage.lastSearch);
        }
        this.player = _player;
   
      } catch (error) {
        //console.log("error.response.status", error.response.status);
        console.log(error);
        this.$router.replace("/NotFound");
        return;
      }
    },
  },
};
</script>

<style scoped>
.header {
  font-family: Impact, Charcoal, sans-serif;
}
.wrapper {
  display: flex;
  background-color: gainsboro;
  border-style: groove;
  border-radius: 5px;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.table {
  background-color: gainsboro;
  border-style: groove;
  border-radius: 5px;
  padding: 2px;
}
.vegetarian {
  width: 52px;
}
.vegan {
  width: 50px;
}
.gluten {
  width: 54px;
}
</style>
