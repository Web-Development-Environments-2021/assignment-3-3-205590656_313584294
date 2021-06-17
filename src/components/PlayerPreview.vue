<template>
  <div>
    <!--<b-card-group deck>-->
    <b-card class="card">
      <router-link
        :to="{
          name: 'player',
          params: { playerId: player.id, likes: player.aggregateLikes },
        }"
        class="player-preview"
      >
        <b-card-img
          :src="player.image"
          img-top
          img-width="180"
          img-height="240"
          class="image"
        />
        <br />
        <br />
        <br />
        <b-card-title :title="player.title" class="player-title" style="font-size: 20px">
          {{ player.title }}
        </b-card-title>
      </router-link>
      <b-card-body class="body">
        <b-card-text>
          <b-icon-clock-history></b-icon-clock-history>
          {{ player.readyInMinutes }} min
          <b-icon-hand-thumbs-up v-if="player.aggregateLikes >= 0"></b-icon-hand-thumbs-up
          >{{ player.aggregateLikes }}
        </b-card-text>
        <!-- <b-card-text>
            <small v-if="recipe.vegetarian"
              ><b-card-img
                src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594558862/Vegetarian-2-512_jzy0lc.png"
                class="vegetarian"
              ></b-card-img>
            </small>
            <small v-if="recipe.vegan"
              ><b-card-img
                src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594558435/100-vegan-2-512_rscngh.png"
                class="vegan"
              ></b-card-img>
            </small>
            <small v-if="recipe.glutenFree"
              ><b-card-img
                src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594490038/glutenfree_l1cde5.webp"
                class="gluten"
              ></b-card-img>
            </small>
          </b-card-text> -->
        <b-card-text v-if="this.$root.store.username && player.aggregateLikes >= 0">
          <small v-if="player.watched" class="h4 mb-2"><b-icon-eye></b-icon-eye></small>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <!-- <AddToFavorites
              v-if="this.$root.store.username && player.aggregateLikes >= 0"
              :playerID="player.id"
              :isSaved="player.saved"
            ></AddToFavorites> -->
        </b-card-text>
      </b-card-body>
    </b-card>
    <!-- </b-card-group>-->
  </div>
</template>

<script>
// import AddToFavorites from "../components/AddToFavorites";

import { BIconClockHistory, BIconHandThumbsUp, BIconEye } from "bootstrap-vue";

export default {
  name: "PlayerPreview",
  components: {
    BIconClockHistory,
    BIconHandThumbsUp,
    BIconEye,
    // AddToFavorites,
  },
  props: {
    player: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.player-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.player-preview > .player-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.player-preview .player-body .player-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.player-preview .player-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.player-preview .player-footer .player-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.player-preview .player-footer ul.player-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.player-preview .player-footer ul.player-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
.body {
  font-size: 17px;
  color: black;
}
.vegan {
  width: 45px;
}
.vegetarian {
  width: 45px;
}
.gluten {
  width: 50px;
}
.button {
  font-size: 16px;
}
.image:hover {
  transform: scale(1.2);
}
.card {
  background-color: rgba(0, 0, 0, 0.2);
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
}
.player-title {
  color: black;
  font-weight: bold;
}
</style>
