  <template>

<div class="game-preview">
    <div :title="id" class="game-title">
      <b>Game Id:</b> {{ id }}
      <AddFavorite>
        v-if="this.$root.store.username >= 0"
        :gameID="this.id"
        :isSaved="this.saved"
      </AddFavorite>
    </div>
        <ul class="game-content">
          <li> host: {{ hostTeam }}</li>
          <li> guest: {{ guestTeam }}</li>
          <li> date: {{ date }}</li>
          <li> time: {{ time }}</li>
        </ul>
       

  </div>
  
</template>

<script>
import AddFavorite from "./AddFavorite.vue"

export default {
  name: "GamePreview",
  components: {
    AddFavorite
      },
  props: {
      id: {
        type: Number,
        required: true
      },
      hostTeam: {
        type: String,
        required: true
      },
      guestTeam: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      },

  }, 

  mounted(){
    console.log("game preview mounted")
  } 
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
 


   font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
   font-weight: bold;
  background-color: rgba(0, 0, 0, 0.15);

}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  darkcyan;
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}



</style>
