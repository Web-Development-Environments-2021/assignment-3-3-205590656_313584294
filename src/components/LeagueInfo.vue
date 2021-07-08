<template>
    <div class="league-preview">
      <b-card
      img-alt="Image"
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-title> {{ leagueName }}</b-card-title>
      <b-card-text>
        Season: {{ season }}
        <br/>
        Stage: {{ stage }}
        <br/>
        <br/>        
        Next Game:
        <br/>
        Home team id: {{ next[0].home_team }}
        <br/>        
        Away team id: {{ next[0].away_team }}
        <br/>
        Date: {{ next[0].date }}
        <br/>
        Time: {{ next[0].time }}
        <br/>
        Stage: {{ next[0].stage }}
        
      <!-- <GamePreview
        v-for="g in next"
        :homeTeam="g.home_team" 
        :awayTeam="g.away_team" 
        :date="g.date" 
        :time="g.time"
        :stage="g.stage" 
        :key="g.id"></GamePreview> -->

      </b-card-text>
      <!-- <b-button href="#" v:on-click variant="CurreGames">All Games In Stage</b-button> -->
        <b-button :to="{ name: 'currentGames' }">All Games In Stage</b-button>
      </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leagueName:'', 
      season:'', 
      stage:'',
      next:'',
    };
  },
  methods: {
    async leagueDetails() {
      console.log("response");
      try {
        const response = await this.axios.get(
        //this.$root.store.BASE_URL + "/league/getDetails",
        "http://localhost:4000/league/getDetails",
        );
          
        let info = response.data;
        this.leagueName = info.league_name;
        this.season = info.current_season_name;
        this.stage = info.current_stage_name;
        this.next = info.next_game;        
        
        console.log(response);
      } catch (error) {
          console.log("error in update league");
          console.log(error);
        }
      }
  },
  mounted(){
    console.log("league details mounted");
    this.leagueDetails();
  },
}
</script>

<style>
.league-preview {
  display: inline-block;
  width: 300px;
  height: 385px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(44, 89, 116);
}

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 155, 197);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}

</style>