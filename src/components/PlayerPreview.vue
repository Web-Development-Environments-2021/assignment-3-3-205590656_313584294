<template>
  <div>
    <!--<b-card-group deck>-->
    <b-card class="card">
      <router-link
        :to="{
          name: 'player',
          params: { playerId: player.player_id },
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
        <b-card-title :title="player.name" class="player-title" style="font-size: 20px">
          {{ player.name }}
        </b-card-title>
      </router-link>
      <b-card-body class="body">
        <b-card-text>
            Player ID : {{ player.player_id }} </b-card-text>
        <b-card-text>
            Team : {{ player.team_name }} </b-card-text>
            <b-card-text>
            Position : {{ player.position }} </b-card-text>
        
      </b-card-body>
    </b-card>
    <!-- </b-card-group>-->
  </div>
</template>

<script>
export default {
  name: "PlayerPreview",
  components: {

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

.player-preview  {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.player-preview  .player-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.player-preview ul.player-overview {
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

.player-preview  ul.player-overview li {
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
