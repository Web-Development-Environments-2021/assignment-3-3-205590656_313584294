<template>
    <div class="container">
        <h1 class="title">Add Game</h1>
        <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
        <!--username-->
        <b-form-group
            id="input-group-date"
            label-cols-sm="3"
            label="date:"
            label-for="date"
        >
            <b-form-input
            id="date"
            v-model="$v.form.date.$model"
            type="text"
            :state="validateState('date')"
            ></b-form-input>
      </b-form-group>
        <b-form-group
            id="input-group-time"
            label-cols-sm="3"
            label="time:"
            label-for="time"
        >
            <b-form-input
            id="time"
            v-model="$v.form.time.$model"
            type="text"
            :state="validateState('time')"
            ></b-form-input>
      </b-form-group>
              <b-form-group
            id="input-group-home_team"
            label-cols-sm="3"
            label="home team:"
            label-for="home_team"
        >
            <b-form-input
            id="home_team"
            v-model="$v.form.home_team.$model"
            type="text"
            :state="validateState('home_team')"
            ></b-form-input>
      </b-form-group>
    </div>
</template>

<script>
export default {
    name: "AddGame",
    data() {
    return {
        date:'',
        time: '',
        home_team : '',
        // away_team :'',
        // stage :'',
        // referee :''
    };
  },
  methods: {
    async updateGames(){
      console.log("response");
      try {
        const response = await this.axios.post(
            this.$root.store.BASE_URL + "/league/addGameToLeague",
        );
        const games = response.data;
        this.games = [];
        this.games.push(...games);
        console.log(response);
      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.updateGames(); 
  }
};

</script>

<style scoped>

</style>	