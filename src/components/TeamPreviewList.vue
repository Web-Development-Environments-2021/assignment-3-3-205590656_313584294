<template>
  <b-container>
    <h3 class="title">
      {{ title }}
      <slot></slot>
    </h3>
    <b-row>
      <div v-if="pageType === 'random'">
        <b-col v-for="t in teams" :key="t.id">
          <TeamPreview class="TeamPreview" :team="t" />
          <br />
        </b-col>
      </div>
      <div v-else-if="pageType === 'search'">
        <b-col v-for="t in teamsList" :key="t.id">
          <TeamPreview class="TeamPreview" :team="t" />
          <br />
        </b-col>
      </div>
      <div v-else>
        <b-col v-for="t in teams" :key="t.id">
          <TeamPreview class="TeamPreview" :team="t" />
          <br />
        </b-col>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import TeamPreview from "./TeamPreview.vue";
export default {
  name: "TeamPreviewList",
  components: {
    TeamPreview,
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
    teamsList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      teams: [],
    };
  },
  mounted() {
    this.updateTeams();
  },

  methods: {
    async updateTeams() {
      try {
        let globalTeams = [];
        if (this.pageType != "random" && this.pageType != "search") {
          var teams;
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
          if (globalTeams.length != 0) {
            teams = globalTeams;
            console.log("took from global storage");
          } else {
            const response = await this.axios.get(url, {
              withCredentials: true,
            });
            teams = response.data;

            if (this.pageType == "lastSeen") {
              this.$root.store.lastSeenTeams = teams;
           
          }

          if (this.$root.store.username) {
            const teams_ids = [];
            for (var i = 0; i < teams.length; i++) {
              teams_ids.push(teams[i].id);
            }
            //console.log(teams_ids);
            const responseTeamsInfo = await this.axios.get(
              this.$root.store.BASE_URL +
                "/teams/previewTeamInfo/ids/[" +
                teams_ids +
                "]",
              { withCredentials: true }
            );
            var teamInfo = responseTeamsInfo.data;
          }
          this.teams = [];
          for (var i = 0; i < teams.length; i++) {
            var currTeam = teams[i];
            this.teams.push(currTeam);
          }
          //console.log(teams);
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
