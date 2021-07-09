<template>
  <div class="container">
    <div v-if="teamName">
      <!-- <h1 class="title">Team Name: {{ teamName }}</h1> -->
    </div>
    <div>
      <b-card>
        <b-card-text>
      
            <div class="center">
              <h3 align="center">Players:</h3>
              <b-carousel
                id="carousel-1"
                :interval="4000"
                controls
                indicators
                background="grey"
                img-width="1800"
                img-height="480"
                style="text-shadow: 1px 1px 2px #555"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
              >
                <!-- Text slides with image -->
                <b-carousel-slide v-for="(p, index) in players" img-blank :key="index">
                  <template>
                    <PlayerPreview class="PlayerPreview" :player="p"/>
                  </template>
                </b-carousel-slide>
              </b-carousel>
            </div>
            <br />
            <br />

        </b-card-text>
      </b-card>
    </div>
    <div>
      <h3 align="center">Past Matches:</h3>
      <b-table :items="past_matches" :fields="fields_past" striped responsive="sm">
        <template #cell(event)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? "Hide" : "Show" }} Events
          </b-button>
        </template>

        <template v-slot:row-details="row">
          <b-card>
            <b-table
              :items="row.item.event"
              :fields="fields_events"
              striped
              responsive="sm"
            >
              <b-button size="sm" @click="row.toggleDetails">Hide Events</b-button>
            </b-table>
          </b-card>
        </template>
      </b-table>
    </div>
    <div>
      <h3 align="center">Future Matches</h3>
      <b-table :items="future_matches" :fields="fields_future" striped responsive="sm">
        <template #cell(event)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? "Hide" : "Show" }} Events
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import PlayerPreview from "../components/PlayerPreview.vue";
export default {
  components: {
    PlayerPreview,
  },
  data() {
    return {
      teamName: null,
      players: [],
      past_matches: [],
      future_matches: [],
      historyGames: [],
      FutureGames: [],
      fields_past: [
        "game_id",
        "date",
        "time",
        "home_team",
        "away_team",
        "stage",
        "result",
        "referee",
        "event",
      ],
      fields_future: [
        "game_id",
        "date",
        "time",
        "home_team",
        "away_team",
        "stage",
        "referee",
      ],
      fields_events: ["event_id", "game_id", "date", "time", "minute", "description"],
      sliding: null,
    };
  },

  mounted(){
    this.created(); 
  },

  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    async created() {
      try {
        let _players;
        let _historyGames;
        let _FutureGames;
        const response = await this.axios.get(
          this.$root.store.BASE_URL +
            "/teams/fullTeamInfo/id/" +
            this.$route.params.teamId
        );
        _players = response.data[0];
        console.log("eeeeeeeeeeeeeeeee");
        console.log(_players[0]);
        _historyGames = response.data[1];
        console.log("eeeeeeeeeeeeeeeee");
        console.log(_historyGames);
        _FutureGames = response.data[2];
        console.log("eeeeeeeeeeeeeeeee");
        console.log(_FutureGames);
        // this.teamName = _players[0].team_name;
        // console.log( this.teamName);
        this.players = _players;
        this.historyGames = _historyGames;
        this.FutureGames = _FutureGames;
        //console.log(team);
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
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
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
.header {
  background-color: gainsboro;
  border-style: groove;
  border-radius: 5px;
  padding: 2px;
}
h1 {
  text-align: center;
}
</style>
