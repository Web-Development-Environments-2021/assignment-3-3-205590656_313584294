<template>
  <div class="container">
    <h1 class="title">Manage League</h1>
    <div>
      <b-table
        :items="items"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        striped responsive="sm"
      >
      <template #cell(event)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Events
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <b-table
        :items="row.item.event"
        :fields="fields_events"
        responsive="sm"
      >
            <b-button size="sm" @click="row.toggleDetails">Hide Events</b-button>
          </b-table>
        </b-card>
      </template>

      </b-table>

      <div>
        Sorting By: <b>{{ sortBy }}</b
        >, Sort Direction:
        <b>{{ sortDesc ? "Descending" : "Ascending" }}</b>
      </div>

      <div>
      <b-form @reset.prevent="onReset" inline>
     
      <h4> To add a game, fill in the following details: </h4>
      <b-form-group>
      <b-form-input
        id="date"
        v-model="date"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter a date"
     
        list="date-options-list"
        style="width: 230px; padding: 5px"
      ></b-form-input>
       <b-form-input
        id="time"
        v-model="time"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter a time"
     
        list="time-options-list"
        style="width: 230px; padding: 5px"
      ></b-form-input>
      <b-form-input
        id="home_team"
        v-model="home_team"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter a home_team"
      
        list="home_team-options-list"
        style="width: 230px; padding: 5px"
      ></b-form-input>
      <br><br>
      <b-form-input
        id="away_team"
        v-model="away_team"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter a away_team"
       
        list="away_team-options-list"
        style="away_team: 230px; padding: 5px"
      ></b-form-input>
      <b-form-input
        id="stage"
        v-model="stage"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter a stage"
        
        list="stage-options-list"
        style="width: 230px; padding: 5px"
      ></b-form-input>
      <b-form-input
        id="referee"
        v-model="referee"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter a referee"
      
        list="referee-options-list"
        style="width: 230px; padding: 5px"
      ></b-form-input>
      </b-form-group>
      <br>
        <b-button
          type="button"
          class="btn"
          style="width: 1000px; margin-left: auto; margin-right: auto"
          @click="addGame()"
          variant="primary"
          :disabled="!date.length || !time.length || !home_team.length || !away_team.length || !stage.length || !referee.length"
          >Add Game</b-button
        >
        <br><br>

   

      <b-form-group v-if="noResults" class="empty">
        <h4>No results returned: {{ erroMessage }}</h4>
      </b-form-group>
    </b-form>
      </div>
    </div>
    <!-- <b-container class="bv-example-row">
      <b-row>
        <b-col>
            <AllLeagueGames>
                
            </AllLeagueGames>
        </b-col>
      </b-row>
    </b-container> -->
  </div>
</template>

<script>
// import AllLeagueGames from "../components/AllLeagueGames"
export default {
  // components: {AllLeagueGames},
  data() {
    return {
      sortBy: "age",
      sortDesc: false,
      fields: [
        { key: "game_id", sortable: false },
        { key: "home_team", sortable: true },
        { key: "away_team", sortable: true },
        { key: "date", sortable: true },
        { key: "time", sortable: false },
         { key: "stage", sortable: false },
        { key: "referee", sortable: false },
        { key: "result", sortable: false },
        { key: "event", sortable: false },
      ],
      fields_events: ["event_id", "game_id", "date", "time", "minute", "description"],
      items: [],
      noResults: false,
      date:"",
      time: "",
      home_team:"",
      away_team:"",
      stage:"",
      referee:"",
    };
  },
 
  mounted() {
    this.showTable();
  },
  methods: {
    async showTable() {
      try {
        var manageAns;
        const response = await this.axios.get(
          this.$root.store.BASE_URL + "/league/getLeagueGames"
        );
        manageAns = response.data[0];
        this.items = [];
        for (var i = 0; i < manageAns.length; i++) {
          this.items.push(manageAns[i]);
        }
      } catch (err) {
        this.noResults = true;
        this.erroMessage = err.response.data;
        console.log(err.response.data);
      }
    },
  },
  async addGame() {
      try {
        var manageAns;
        comsole.log("hhhhhhhhhhhhhhhhhhhhhhh");
        const response = await this.axios.post(
          this.$root.store.BASE_URL + "/league/addGameToLeague",{
            date: this.date,
            time: this.time,
            home_team: this.home_team,
            away_team: this.away_team,
            stage: this.stage,
            referee: this.referee,
          }
        );
        comsole.log("hhhhhhhhhhhhhhhhhhhhhhh");
        comsole.log(response);
        manageAns = response.data[0];
        comsole.log(manageAns);
        for (var i = 0; i < manageAns.length; i++) {
          this.items.push(manageAns[i]);
        }
      } catch (err) {
        this.noResults = true;
        this.erroMessage = err.response.data;
        console.log(err.response.data);
      }
    },
};
</script>

<style lang="scss" scoped>
.title {
  background: url("https://ae01.alicdn.com/kf/HTB1PlSmirorBKNjSZFjq6A_SpXa6/Laeacco.jpg_q50.jpg");
  color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  text-align: center;
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  font-size: 50px;
  font-weight: bold;
}
</style>
