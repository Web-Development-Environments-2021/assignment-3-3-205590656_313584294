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
         <h4>What's your {{selected}} name? <b-icon icon="chat-dots"></b-icon></h4>
        <b-form-input
          id="search"
          v-model="searchContent"
          placeholder="Search Query"
          type="search"
          list="search-options-list"
          style="width: 430px; padding: 5px;"
        ></b-form-input>
        <b-form-group label="Do you want to search by game position or by group name?" :disabled="selected=='team'">
          <b-form-radio-group
            id="radio-group-2"
            v-model="selected2"
            :options="options2"
            name="radio-options2"
          ></b-form-radio-group>
        </b-form-group>
        <h10 :disabled="selected=='team'">What {{selected2}} would you like to looking for?</h10>
        <b-form-input :disabled="selected=='team'"
          id="search2"
          v-model="searchContent2" 
          placeholder="your answer"
          type="search"
          list="search-options-list"
          style="width: 430px; padding: 5px;"
        ></b-form-input>
        <br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <center>
        <b-button
          type="button"
          class="btn"
          style="width:230px;  margin-left: auto;
    margin-right: auto;"
          @click="search()"
          variant="primary"
          :disabled="!searchContent.length"
          >Search</b-button>
        </center>
        <br><br>
        <b-form-group
          id="input-group-sort"
          label-cols-sm="3"
          label="Sort By:"
          label-for="Sort By"
        >
          <b-form-select
            v-model="sort"
            @change="sortby"
            :disabled="!recipes || !recipes.length"
            width="20px"
          >
            <b-form-select-option :value="null" disabled
              >--Sort By--</b-form-select-option
            >
            <b-form-select-option value="timeHigh"
              >Sort by time high to low</b-form-select-option
            >
            <b-form-select-option value="timeLow"
              >Sort by time low to high</b-form-select-option
            >
            <b-form-select-option value="likeHigh"
              >Sort by popularity high to low</b-form-select-option
            >
            <b-form-select-option value="likeLow"
              >Sort by popularity low to how</b-form-select-option
            >
          </b-form-select>
        </b-form-group>

        <div v-if="selected=='player'">
           <PlayerPreviewList
            title="Results:"
            pageType="search"
            :playersList="recipes"
            class="SearchRecipes" 
          />
            </div>
            <div v-else-if="selected=='team'" >
              <TeamPreviewList
              title="Results:"
              pageType="search"
              :teamsList="recipes"
              class="SearchRecipes"
            />
            </div>


        

        <b-form-group v-if="noResults" class="empty">
          <h4>No results returned: {{erroMessage}}</h4>
        </b-form-group>
    </b-form>
    
      <br/>


  </div>
</template>

<script>
import PlayerPreviewList from "../components/PlayerPreviewList";
import TeamPreviewList from "../components/TeamPreviewList";
export default {
   components: {
    PlayerPreviewList,
    TeamPreviewList
  },
  
 data() {
    return {
      searchContent: "",
      searchContent2: "",
      intolerancesInput: "",
      noResults: false,
      erroMessage: "",
      recipes: [],
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
    };
  },
   mounted() {
    this.lastSearchTerm = localStorage.getItem("lastSearchTerm");
    this.loadHistorySearch();
  },
   methods: {
     async loadHistorySearch() {
      try {
        if (this.$root.store.username) {
          if (localStorage.lastSearch) {
            this.recipes = JSON.parse(localStorage.lastSearch);
            console.log(this.recipes);
           //
          }
        } else {
          if (localStorage.lastSearch) {
            localStorage.removeItem("lastSearch");
          }
        }
        //console.log(localStorage.lastSearch);
      } catch (err) {
        console.log(err.response);
      }
    },
     async search() {
      try {
        var searchRecipes;
        let response="";
        if(this.selected== "player" && this.selected2== "Group Name"){
          console.log(this.searchContent);
          console.log(this.searchContent2);
          response = await this.axios.get(
            this.$root.store.BASE_URL + "/search/queryPlayer/namePlayer/" + this.searchContent + "/groupName/"+ this.searchContent2,{
            params: {
              searchQuery: this.searchContent,
              name: this.searchContent2,
            },
          }
        );
        console.log(response);
        }
        else if(this.selected=="player" && this.selected2=="Game Position"){
          console.log(this.searchContent);
          console.log(this.searchContent2);
          response = await this.axios.get(
            this.$root.store.BASE_URL + "/search/queryPlayer/namePlayer/" + this.searchContent + "/gamePosition/"+ this.searchContent2,{
            params: {
              searchQuery: this.searchContent,
              num: this.searchContent2,
            },
          }
        );
        }
        else if(this.selected=="team"){
           response = await this.axios.get(
            this.$root.store.BASE_URL + "/search/queryTeam/nameTeam/" + this.searchContent,{
            //"http://localhost:3000/search/queryPlayer/namePlayer/" + this.searchContent + "/groupName/"+ this.selected,{
            params: {
              searchQuery: this.searchContent,
            },
          }
        );
        }
        console.log("nicoleeeeeeee3");
        searchRecipes = response.data;
        console.log(searchRecipes);
        if (this.$root.store.username) {
          const recipe_ids = [];
          for (var i = 0; i < searchRecipes.length; i++) {
            recipe_ids.push(searchRecipes[i].id);
          }
          console.log(recipe_ids);
          let responseRecipeInfo="";
          if(this.selected=="player"){
            responseRecipeInfo = await this.axios.get(
            this.$root.store.BASE_URL + "/players/previewPlayerInfo/ids/[" + recipe_ids + "]",
            { withCredentials: true }
          );
          }
          else{ //team
            responseRecipeInfo = await this.axios.get(
            this.$root.store.BASE_URL + "/teams/previewTeamInfo/ids/[" + recipe_ids + "]",
            { withCredentials: true }
            );
          }
          var recipeInfo = responseRecipeInfo.data;
          console.log(recipeInfo);      
        }
        this.recipes = [];
        for (var i = 0; i < searchRecipes.length; i++) {
          var currRecipe = searchRecipes[i];
          // if (recipeInfo) {
          //   currRecipe.watched = recipeInfo[currRecipe.id].watched;
          //   currRecipe.saved = recipeInfo[currRecipe.id].saved;
          // }
          this.recipes.push(currRecipe);
        }
        console.log("dddddddddddddddddddddddd");
        console.log(this.recipes);

        localStorage.setItem("lastSearchTerm", this.searchContent);
        this.lastSearchTerm = this.searchContent;
      
        localStorage.setItem("lastSearch", JSON.stringify(this.recipes));
        
        if (this.recipes.length == 0) {
          this.noResults = true;
        }
        else{
          this.noResults = false;
        }
      } catch (err) {
        this.noResults = true;
        this.erroMessage = err.response.data;
        console.log(err.response.data);
        //this.form.submitError = err.response.data.message;
      }
    },
    sortby() {
      if (this.sort == "timeLow") {
        function compareTime(a, b) {
          if (a.readyInMinutes < b.readyInMinutes) return -1;
          if (a.readyInMinutes > b.readyInMinutes) return 1;
          return 0;
        }
        return this.recipes.sort(compareTime);
      } else if (this.sort == "timeHigh") {
        function compareTime(a, b) {
          if (a.readyInMinutes < b.readyInMinutes) return 1;
          if (a.readyInMinutes > b.readyInMinutes) return -1;
          return 0;
        }
        return this.recipes.sort(compareTime);
      } else if (this.sort == "likeHigh") {
        function compareLikes(a, b) {
          if (a.aggregateLikes < b.aggregateLikes) return 1;
          if (a.aggregateLikes > b.aggregateLikes) return -1;
          return 0;
        }
        return this.recipes.sort(compareLikes);
      } else if (this.sort == "likeLow") {
        function compareLikes(a, b) {
          if (a.aggregateLikes < b.aggregateLikes) return -1;
          if (a.aggregateLikes > b.aggregateLikes) return 1;
          return 0;
        }
        return this.recipes.sort(compareLikes);
      }
      //console.log("changed");
      //console.log(this.num_of_recipes);
    },
  },
  
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px;
}
.empty {
  color: red;
} 

#search{
  margin-left: 20px; 
  width: 500px; 
}
.title{
    background: url("https://ae01.alicdn.com/kf/HTB1PlSmirorBKNjSZFjq6A_SpXa6/Laeacco.jpg_q50.jpg");
    color: white;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    text-align: center;
    font-family:"Trebuchet MS", Helvetica, sans-serif;
    font-size: 50px;
    font-weight: bold;
}
</style>