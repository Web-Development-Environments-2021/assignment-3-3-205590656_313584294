<template>
  <div class="container">
    <h1 class="title"><b-icon icon="search"></b-icon>Search Page</h1>

    <b-form @reset.prevent="onReset">
      <b-form-group label="Do you want to look for a player or a team?">
        <b-form-radio-group
          id="radio-group-1"
          v-model="selected"
          :options="options"
          name="radio-options"
        ></b-form-radio-group>
      </b-form-group>
      <h4>What's your {{ selected }} name? <b-icon icon="chat-dots"></b-icon></h4>
      <b-form-input
        id="search"
        v-model="searchContent"
        placeholder="Search Query"
        type="search"
        list="search-options-list"
        style="width: 430px; padding: 5px"
      ></b-form-input>
      <b-form-group
        label="Do you want to search by game position or by group name?"
        :disabled="selected == 'team'"
      >
        <b-form-radio-group
          id="radio-group-2"
          v-model="selected2"
          :options="options2"
          name="radio-options2"
        ></b-form-radio-group>
      </b-form-group>
      <h10 :disabled="selected == 'team'"
        >What {{ selected2 }} would you like to looking for?</h10
      >
      <b-form-input
        :disabled="selected == 'team'"
        id="search2"
        v-model="searchContent2"
        placeholder="your answer"
        type="search"
        list="search-options-list"
        style="width: 430px; padding: 5px"
      ></b-form-input>
      <br />
   
      <center>
        <b-button
          type="button"
          class="btn"
          style="width: 230px; margin-left: auto; margin-right: auto"
          @click="search()"
          variant="primary"
          :disabled="!searchContent.length"
          >Search</b-button
        >
      </center>
      <br /><br />
      <b-form-group
        id="input-group-sort"
        label-cols-sm="3"
        label="Sort By:"
        label-for="Sort By"
      >
        <b-form-select
          v-model="sort"
          @change="sortby"
          :disabled="!ans || !ans.length"
          width="20px"
        >
          <b-form-select-option :value="null" disabled>--Sort By--</b-form-select-option>
          <b-form-select-option value="teamByNameTeam" :disabled="selected == 'player'"
            >Sort teams by name team</b-form-select-option
          >
          <b-form-select-option value="playerByNamePlayer" :disabled="selected == 'team'"
            >Sort players by name player</b-form-select-option
          >
          <b-form-select-option value="playerByNameTeam" :disabled="selected == 'team'"
            >Sort players by name team</b-form-select-option
          >
        </b-form-select>
      </b-form-group>
        <div v-if="this.lastSearchTerm && $root.store.username && this.lastSearcType=='player'">
            <h4>Your last search was: {{ this.lastSearchTerm }} {{ this.lastSearchTerm2 }}</h4>
          </div>
          <div v-else-if="this.lastSearchTerm && $root.store.username && this.lastSearcType=='team'">
            <h4>Your last search was: {{ this.lastSearchTerm }}</h4>
          </div>
<!-- 
          <div v-if="lastSearcType == 'player'">
            <div v-if="selected == 'player'">
                    <PlayerPreviewList
                      title="Results:"
                      pageType="search"
                      :playersList="ans"
                      class="SearchAns"
                    />
                  </div>
          </div>
          
          <div v-else-if ="lastSearcType == 'team'">
            <div v-if="selected == 'team'">
<TeamPreviewList
          title="Results:"
          pageType="search"
          :teamsList="ans"
          class="SearchAns"
        />
          </div>
          </div> -->
      <div v-if="selected == 'player' && lastSearcType == 'player'">
        <PlayerPreviewList
          title="Results:"
          pageType="search"
          :playersList="ans"
          class="SearchAns"
        />
      </div>
      <div v-else-if="selected == 'team' && lastSearcType == 'team'">
        <TeamPreviewList
          title="Results:"
          pageType="search"
          :teamsList="ans"
          class="SearchAns"
        />
      </div>
      <div v-else-if="selected == 'player' && lastSearcType == 'team'">
        <TeamPreviewList
          title="Results:"
          pageType="search"
          :teamsList="ans"
          class="SearchAns"
        />
      </div>
      <div v-else-if="selected == 'team' && lastSearcType == 'player'">
        <PlayerPreviewList
          title="Results:"
          pageType="search"
          :playersList="ans"
          class="SearchAns"
        />
      </div>

      <b-form-group v-if="noResults" class="empty">
        <h4>No results returned</h4>
      </b-form-group>
    </b-form>

    <br />
  </div>
</template>

<script>
import PlayerPreviewList from "../components/PlayerPreviewList";
import TeamPreviewList from "../components/TeamPreviewList";
export default {
  components: {
    PlayerPreviewList,
    TeamPreviewList,
  },
  data() {
    return {
      searchContent: "",
      searchContent2: "",
      noResults: false,
      erroMessage: "",
      ans: [],
      sort: null,
      selected: "player",
      options: [
        { text: "player", value: "player" },
        { text: "team", value: "team" },
      ],
      selected2: "Group Name",
      options2: [
        { text: "Group Name", value: "Group Name" },
        { text: "Game Position", value: "Game Position" },
      ],
      lastSearch: "",
      lastSearchTerm: "",
      lastSearchTerm2: "",
      lastSearcType:"",
    };
  },
  mounted() {
    this.lastSearchTerm = localStorage.getItem("lastSearchTerm");
    this.lastSearchTerm2 = localStorage.getItem("lastSearchTerm2");
    this.loadHistorySearch();
  },
  methods: {
    async loadHistorySearch() {
      try {
        if (this.$root.store.username) {
          if (localStorage.lastSearch) {
            this.ans = JSON.parse(localStorage.lastSearch);
            console.log(this.ans);
          }
        } else {
          if (localStorage.lastSearch) {
            localStorage.removeItem("lastSearch");
            this.lastSearcType="";
            
          }
        }
      } catch (err) {
        console.log(err.response);
      }
    },
    async search() {
      try {
        var searchAns;
        let response = "";
        if (this.selected == "player" && this.selected2 == "Group Name") {
          this.lastSearcType = this.selected;
          response = await this.axios.get(
            this.$root.store.BASE_URL +
              "/search/queryPlayer/namePlayer/" +
              this.searchContent +
              "/groupName/" +
              this.searchContent2,
            {
              params: {
                searchQuery: this.searchContent,
                name: this.searchContent2,
              },
            }
          );
          console.log(response);
        } else if (this.selected == "player" && this.selected2 == "Game Position") {
          this.lastSearcType = this.selected;
          response = await this.axios.get(
            this.$root.store.BASE_URL +
              "/search/queryPlayer/namePlayer/" +
              this.searchContent +
              "/gamePosition/" +
              this.searchContent2,
            {
              params: {
                searchQuery: this.searchContent,
                num: this.searchContent2,
              },
            }
          );
        } else if (this.selected == "team") {
          this.lastSearcType = this.selected;
         // this.lastSearchTerm2="";
          response = await this.axios.get(
            this.$root.store.BASE_URL +
              "/search/queryTeam/nameTeam/" +
              this.searchContent,
            {
                params: {
                searchQuery: this.searchContent,
              },
            }
          );
        }
        searchAns = response.data;
        console.log(searchAns);
        if (this.$root.store.username) {
          const ans_ids = [];
          for (var i = 0; i < searchAns.length; i++) {
            ans_ids.push(searchAns[i].id);
          }
          console.log(ans_ids);
          let responseAnsInfo = "";
          if (this.selected == "player") {
            responseAnsInfo = await this.axios.get(
              this.$root.store.BASE_URL +
                "/players/previewPlayerInfo/ids/[" +
                ans_ids +
                "]"
            );
          } else {
            responseAnsInfo = await this.axios.get(
              this.$root.store.BASE_URL + "/teams/previewTeamInfo/ids/[" + ans_ids + "]",
            );
          }
          var ansInfo = responseAnsInfo.data;
          console.log(ansInfo);
        }
        this.ans = [];
        for (var i = 0; i < searchAns.length; i++) {
          this.ans.push(searchAns[i]);
        }
        console.log(this.ans);

        localStorage.setItem("lastSearchTerm", this.searchContent);
        this.lastSearchTerm = this.searchContent;
      
        localStorage.setItem("lastSearch", JSON.stringify(this.ans));

        if (this.ans.length == 0) {
          this.noResults = true;
        } else {
          this.noResults = false;
        }
        this.onReset();
      } catch (err) {
        this.noResults = true;
        this.erroMessage = err.response.data;
        console.log(err.response.data);
      }
    
    },
    onReset() {
      this.searchContent="",
       this.searchContent2="",
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    sortby() {
      if (this.sort == "teamByNameTeam") {
        function compareAlphabet(a, b) {
          if (this.ans.length != 0) {
            this.ans.sort((a, b) => a.name.localeCompare(b.name));
          }
        }
        return this.ans.sort(compareAlphabet);
      } else if (this.sort == "playerByNamePlayer") {
        function compareAlphabet(a, b) {
          if (this.ans.length != 0) {
            this.ans.sort((a, b) => a.name.localeCompare(b.name));
          }
        }
        return this.ans.sort(compareAlphabet);
      } else if (this.sort == "playerByNameTeam") {
        function compareAlphabet(a, b) {
          if (this.ans.length != 0) {
            this.ans.sort((a, b) => a.team_name.localeCompare(b.team_name));
          }
        }
        return this.ans.sort(compareAlphabet);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px;
}
.empty {
  color: red;
}

#search {
  margin-left: 20px;
  width: 500px;
}
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
