<template>
  <div>
    <div class="custom-container mt-5">
      <v-row  class="d-flex align-item-center bg-white justify-content-between pt-6 mb-2 mt-4 pl-5">
        <v-col lg="4" md="4" sm="12">
          <v-autocomplete
            ref="inputRef"
            v-model="region"
            :items="listregions"
            outlined
            dense
            label="Région"
            item-text="nom_region"
            item-value="id"
            @change="changeRegion"
          >
          </v-autocomplete>
        </v-col>
        <v-col lg="4" md="4" sm="12">
          <v-autocomplete
            ref="inputRef"
            v-model="dimension"
            :items="listdimensions"
            outlined
            dense
            label="Dimension"
            item-text="libelle_dimension"
            item-value="id"
            @change="changeDimension"
          >
          </v-autocomplete>
        </v-col>
        <v-col lg="2" md="2" sm="12">
          <v-btn text @click="onClearClicked" rounded color="green"
            >Afficher tout</v-btn
          >
        </v-col>
      </v-row>
      <v-row class="d-flex justify-content-between">
        <v-col md="3" sm="12" lg="3" class="">
          <div class="bg-marron mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center">
            <h4 class="">MONTANT TOTAL DE FINANCEMENT PRÉVU</h4>
            <h1 class="">
              {{
                (
                  montantBienServicePrevus + montantInvestissementPrevus
                ).toLocaleString()
              }}
            </h1>
          </div>
        </v-col>
        <v-col md="3" sm="12" lg="3" class="">
          <div class="bg-marron mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center">
            <h4 class="">MONTANT TOTAL DE FINANCEMENT MOBILISÉ</h4>
            <h1 class="">
              {{
                (
                  montantBienServiceMobilises + montantInvestissementMobilises
                ).toLocaleString()
              }}
            </h1>
          </div>
        </v-col>
        <v-col md="3" sm="12" lg="3" class="">
          <div class="bg-marron mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center">
            <h4 class="">MONTANT TOTAL DE FINANCEMENT EXECUTÉ</h4>
            <h1 class="">
              {{
                (
                  montantBienServiceExecutes + montantInvestissementExecutes
                ).toLocaleString()
              }}
            </h1>
          </div>
        </v-col>
        <v-col md="3" sm="12" lg="3" class="">
          <div class="bg-marron pl-4 pr-5 pt-5 pb-5 text-sm-center">
            <h4 class="color-yellow">NOMBRE TOTAL DE FINANCEMENT</h4>
            <h1 class="color-yellow">{{ nombreFinancement }}</h1>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="custom-container mt-5 mr-8 ml-8 pl-4 pr-1 pt-5 pb-5">
      <list-chart></list-chart>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import ListChart from "@/components/statistiques/charts/ListChart";
import LeftMenu from "@/components/LeftMenu";
import StatBox from "@/components/dashboard/admin/StatBox";

export default {
  layout: "dashboard",
  components: {
    StatBox,
    LeftMenu,
    ListChart,
  },
  computed: {
      ...mapGetters({
      listdimensions: 'dimensions/listdimensions',
      listregions: 'regions/listregions',
    })},
  mounted: function () {
    this.$store.dispatch('dimensions/getList')
      this.$store.dispatch('regions/getList')
    this.getFinancement();
    //!this.$hasRole('admin') && this.getDashboardData()
  },
  data() {
    return {
      listfinancements : [],
      montantBienServiceExecutes: 0,
      montantBienServiceMobilises: 0,
      montantBienServicePrevus: 0,
      montantInvestissementExecutes: 0,
      montantInvestissementMobilises: 0,
      montantInvestissementPrevus: 0,
      montantInvestissementPrevus: 0,
      nombreFinancement: 0,
      dimension: '',
      region: '',
      leftmenuItems: [
        {
          text: "Accueil",
          icon: "mdi-home-outline",
          link: "/dashboard",
          name: "voir_dashboard",
        },
        {
          text: "Mon activite",
          icon: "mdi-clock-outline",
          link: "/dashboard/monactivite",
          name: "voir_mon_activite",
        },
      ],
    };
  },
  methods: {
    getFinancement() {
      this.$msasApi
        .$get("/all_ligne_financements")
        .then(async (response) => {
          console.log(
            "Données reçu financement par activité  +++++++++++",
            response.data
          );
          this.listfinancements = response.data.data

          this.updateStat(response.data.data)
        })
        .catch((error) => {
          console.log("Code error ++++++: ", error?.response?.data?.message);
          this.$toast.error(error?.response?.data?.message).goAway(3000);
        })
        .finally(() => {
          console.log("Requette envoyé ");
        });
    },
    async changeRegion(value) {
      console.log(value)
      this.updateFinancement(value,'region')
      //this.updateAttenduActivite(value)
    },
    async changeDimension(value) {
      console.log(value)
      this.updateFinancement(value,'dimension')
      //this.updateAttenduActivite(value)
    },
    async updateFinancement(value,type) {
        var list = []

        if(type=='region'){
          this.region = value
          if(this.dimension!=''){
            list = this.listfinancements.filter((item) =>(parseInt(item.id_dimension)==this.dimension && parseInt(item.id_region)==value))
          }
          else{
            list = this.listfinancements.filter((item) =>(parseInt(item.id_region)==value))
          }
        }
        if(type=='dimension'){
          this.dimension = value
          if(this.region!=''){
            list = this.listfinancements.filter((item) =>(parseInt(item.id_region)==this.annee && parseInt(item.id_dimension)==value))
          }
          else{
            list = this.listfinancements.filter((item) =>(parseInt(item.id_dimension)==value))
          }
        }
        console.log(list)
        await this.updateStat(list)
    },
    async updateStat(newlist){
      console.log('Change list ++++ ',newlist)
      this.nombreFinancement = newlist?.length;

          //Montant bien et service executé
          let total1 = 0;
          newlist.map((item) => {
            total1 += parseInt(item.montantBienServicePrevus || 0);
          });
          this.montantBienServicePrevus = total1;

          //Montant bien et service mobilisé
          let total2 = 0;
          newlist.map((item) => {
            total2 += parseInt(item.montantBienServiceMobilises || 0);
          });
          this.montantBienServiceMobilises = total2;

          //Montant bien et service executé
          let total3 = 0;
          newlist.map((item) => {
            total3 += parseInt(item.montantBienServiceExecutes || 0);
          });
          this.montantBienServiceExecutes = total3;

          //Montant bien et service executé
          let total4 = 0;
          newlist.map((item) => {
            total4 += parseInt(item.montantInvestissementPrevus || 0);
          });
          this.montantInvestissementPrevus = total4;

          //Montant bien et service executé
          let total5 = 0;
          newlist.map((item) => {
            total5 += parseInt(item.montantInvestissementExecutes || 0);
          });
          this.montantInvestissementExecutes = total5;

          //Montant bien et service executé
          let total6 = 0;
          newlist.map((item) => {
            total6 += parseInt(item.montantInvestissementMobilises || 0);
          });
          this.montantInvestissementMobilises = total6;
    },
    onClearClicked () {
       this.region = ''
       this.dimension = ''
       this.getFinancement()
      }
  },
};
</script>

<style scoped>
.bg-marron {
  background-color: #047486;
  border-radius: 5px;
  padding: 30px;
  color: rgba(255, 255, 255, 0.941);
  min-height: 110px;
}
.bg-marron:hover {
  background-color: #fff;
  color: #045d86 !important;
}
.color-white {
  color: #fff;
}
.border-right-solid {
  border-right: solid 1px #ffffff59;
  padding: 20px;
}
.bg-white{
  border-radius: 5px;
  background-color: #fff;
  margin-left: 0.3px;
margin-right: 0.3px;
}
</style>
