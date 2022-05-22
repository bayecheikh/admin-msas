<template>
<div>
  <v-form class="" v-model="valid" ref="form" enctype="multipart/form-data"
    >
    <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
      <v-row >     
        <v-col md="4" lg="4" sm="12">
          <v-text-field
            label="Dénomination"
            outlined dense
            v-model="model.nom_structure"
            :rules="rules.nom_structureRules"
          ></v-text-field>
        </v-col>
        <v-col
          lg="4"
          md="4"
          sm="12"
        >
          <v-autocomplete
            v-model="model.source_financements"
            :items="listsources"
            :rules="rules.fournisseur_services_idRules"
            outlined
            dense
            label="Source de financement"
            item-text="libelle_source"
            item-value="id"
            return-object
            @change="changeSource"
            >
          </v-autocomplete>
        </v-col>
        <v-col
          lg="4"
          md="4"
          sm="12"
        >
          <v-autocomplete
              v-model="model.type_source"
              :items="model.type_sources"
              :rules="this.showTypeSource==true?rules.fournisseur_services_idRules:null"
              outlined
              dense
              label="Type"
              item-text="libelle_type_source"
              item-value="id"
              return-object
              v-if="showTypeSource"
            >
          </v-autocomplete>
        </v-col>
        <v-col md="4" lg="4" sm="12" v-if="showNumAutorisation">
          <v-text-field
            label="N° autorisation"
            outlined dense
            v-model="model.numero_autorisation"
            :rules="rules.firstnameRules"
          ></v-text-field>
        </v-col>
        <v-col md="4" lg="4" sm="12" v-if="showAccordSiege">
          <v-file-input
              v-model="files"
              color="deep-purple accent-4"
              counter
              label="Accord de siège"
              multiple
              placeholder=""
              prepend-icon="mdi-paperclip"
              outlined
              :show-size="1000"
              dense
              v-on:change="handleFileUpload"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip
                  v-if="index < 2"
                  color="black"
                  dark
                  label
                  small
                >
                  {{ text }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="text-overline grey--text text--darken-3 mx-2"
                >
                  +{{ files.length - 2 }} Fichier(s)
                </span>
              </template>
          </v-file-input>
        </v-col>
        <v-col md="4" lg="4" sm="12" v-if="showNumAgrement">
          <v-text-field
            label="N° agrément"
            outlined dense
            v-model="model.numero_agrement"
            :rules="rules.firstnameRules"
          ></v-text-field>
        </v-col>
        <v-col lg="4" sm="12" md="4" v-if="showDebutIntervention">
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="model.debut_intervention"
                label="Dèbut de l'intervention"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined dense
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="model.debut_intervention"
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col lg="4" sm="12" md="4" v-if="showFinIntervention">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="model.fin_intervention"
                label="Fin de l'intervention"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined dense
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="model.fin_intervention"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-col> 
      </v-row>
    </v-card> 
    <h2 class="mb-5">
        Coordonnées siège
    </h2>
    <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
      <v-row>
        <v-col md="4" lg="4" sm="12" v-if="showAdresseStructure">
          <v-text-field
            label="Adresse structure"
            outlined dense
            v-model="model.adresse_siege"
            :rules="rules.firstnameRules"
          ></v-text-field>
        </v-col>
        <v-col md="4" lg="4" sm="12">
          <v-text-field
            label="Téléphone structure"
            outlined dense
            v-model="model.telephone_structure"
            :rules="rules.telephoneRules"
          ></v-text-field>
        </v-col>
        <v-col md="4" lg="4" sm="12">
          <v-text-field
            label="Email structure"
            outlined dense
            v-model="model.email_structure"
            :rules="rules.emailRules"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
    <h2 class="mb-5">
        Zone d'intervention
    </h2>
    <v-card class="mx-auto mb-5 pl-10 pt-5 pr-10 pb-5">
      <v-row>
        <v-col md="12" lg="12" sm="12">
          <v-radio-group 
            :v-model="model.sexe"
            :rules="rules.sexeRules" v-on:change="changeTypeZone"
            row
          >
            <v-radio v-for="item in listtypezones" :key="item.id"
              :label="item.libelle_zone"
              :value="item"
            ></v-radio>
          </v-radio-group> 
        </v-col>
      </v-row>
      <v-row v-if="showRegion">
        <v-col md="12" lg="12" sm="12">
          <v-expansion-panels v-for="(item,i) in listregions"
              :key="i" class="mb-2">
            <v-expansion-panel   
            >
              <v-expansion-panel-header>
                <v-checkbox 
                    v-model="selectedRegion"
                    :label="item.nom_region"
                    :value="item.id"
                  ></v-checkbox>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-for="item in item.departements" :key="item.id">
                  <v-checkbox 
                    v-model="selectedDepartement"
                    :label="item.nom_departement"
                    :value="item.id"
                  ></v-checkbox> 
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-card>
    <h2 class="mb-5">
        Dimensions
    </h2>
    <v-card class="mx-auto mb-5 pl-10 pt-5 pr-10 pb-5">
      <v-row  class="d-flex justify-content-between">
        <v-col md="4" lg="4" sm="12" v-for="item in listdimensions" :key="item.id">
          <v-checkbox 
            v-model="selectedDimension"
            :label="item.libelle_dimension"
            :value="item.id"
          ></v-checkbox> 
        </v-col>     
      </v-row>
    </v-card>
    <h2 class="mb-5">
        Personne responsable
    </h2>
    <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
      <v-row>
        <v-col md="4" lg="4" sm="12">
          <v-text-field
            label="Fonction responsable"
            outlined dense
            v-model="model.fonction"
            :rules="rules.firstnameRules"
          ></v-text-field>
        </v-col>
        <v-col md="4" lg="4" sm="12">
          <v-text-field
            label="Prénom responsable"
            outlined dense
            v-model="model.firstname"
            :rules="rules.firstnameRules"
          ></v-text-field>
        </v-col>
        <v-col md="4" lg="4" sm="12">
          <v-text-field
            label="Nom responsable"
            outlined dense
            v-model="model.lastname"
            :rules="rules.firstnameRules"
          ></v-text-field>
        </v-col>
        <v-col md="4" lg="4" sm="12">
          <v-text-field
            label="Adresse Email responsable"
            outlined dense
            v-model="model.email"
            :rules="rules.emailRules"
          ></v-text-field>
        </v-col>
        <v-col md="4" lg="4" sm="12">
          <v-text-field
            label="Téléphone responsable"
            outlined dense
            v-model="model.telephone"
            :rules="rules.telephoneRules"
          ></v-text-field>
        </v-col>
      </v-row> 
    </v-card>

    <v-btn
      :loading="loading"
      :disabled="!valid"
      class="mr-4 text-white" color="#1B73E8"
      @click="submitForm"
    >
      Enregistrer
    </v-btn>
  </v-form>
</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
  export default {
    components: {
    },
    mounted: function() {
      /* this.$store.dispatch('roles/getList') */
      /* this.$store.dispatch('structures/getList')
      this.$store.dispatch('fournisseurs/getList') */

      this.model.type_zone_interventions = this.listtypezones
      this.model.dimensions = this.dimensions
      this.model.source_financements = this.listsources
      this.model.type_sources = this.listsources.type_sources
      this.model.regions = this.listregions
      this.model.departements = this.listdepartements
    },
    computed: {
      ...mapGetters({
      /* listroles: 'roles/selectlistroles', */
      /* listfournisseurs: 'fournisseurs/selectlistfournisseurs',
      liststructures: 'structures/selectliststructures', */
      listtypezones: 'type-zones/listtypezones', 
      //listtypesources: 'typesources/listtypesources', 
      listsources: 'sources/listsources', 
      listregions: 'regions/listregions', 
      listdepartements: 'departements/listdepartements', 
      listdimensions: 'dimensions/listdimensions', 
    })},
    data: () => ({
      loading: false,
      message:null,
      color:null,
      valid: true,
      showFournisseur: false,
      showTypeSource: false,
      showNumAutorisation: false,
      showAccordSiege: false,
      showNumAgrement: false,
      showAdresseStructure: false,
      showRegion: false,
      message:null,
      selectedDimension: [],
      selectedDepartement: [],
      selectedRegion: [],
      model: {
        type_zone_interventions:null,
        dimensions:null,
        source_financements:null,
        type_sources:null,
        regions:null,
        departements:null,
        numero_autorisation:'',
        accord_siege:'',
        numero_agrement:'',
        adresse_structure:'',
        debut_intervention:'',
        fin_intervention:'',
        telephone_structure:'',
        email_structure:'',
        avatar:'',
        nom_structure:'',
        name:'',
        firstname: '',
        lastname: '',
        email: '',
        roles: null,
        fournisseur_services_id:null,
        country_code:'+221',
        telephone: '',
        adresse: '',
        fonction: '',
        structure_id:null,
        sexe:1,
      },
      rules:{
        nom_structureRules: [
          v => !!v || 'Dénomination est obligatoire',
          v => (v && v.length <= 50) || 'Prénom doit etre inférieur à 20 caratères',
        ],
        nameRules: [
          v => !!v || 'Prénom est obligatoire',
          v => (v && v.length <= 50) || 'Prénom doit etre inférieur à 20 caratères',
        ],
        firstnameRules: [
          v => !!v || 'Prénom est obligatoire',
          v => (v && v.length <= 50) || 'Prénom doit etre inférieur à 20 caratères',
        ],
        lastnameRules: [
          v => !!v || 'Nom est obligatoire',
          v => (v && v.length <= 50) || 'Nom doit etre inférieur à 10 caratères',
        ],
        emailRules: [
          v => !!v || 'E-mail est obligatoire',
          v => /.+@.+\..+/.test(v) || 'E-mail mdoit etre valide',
        ],
        structurenameRules: [
          v => !!v || 'Login est obligatoire',
          v => (v && v.length <= 10) || 'Nom doit etre inférieur à 10 caratères',
        ],
        rolesRules: [
          v => (v && !!v.length) || 'Role est obligatoire',
        ],
        telephoneRules: [
          v => !!v || 'Téléphone est obligatoire',
        ],
        country_codeRules: [
          v => !!v || 'L\'indicatif du pays est obligatoire',
        ],
        fournisseur_services_idRules: [
          v => (!!v) || 'Fournisseur est obligatoire',
        ],
        structure_idRules: [
          v => (!!v) || 'Structure est obligatoire',
        ],
        adresseRules: [
          v => !!v || 'Adresse est obligatoire',
          v => (v && v.length <= 100) || 'Adresse doit etre inférieur à 50 caratères',
        ],
        nationalityRules: [
          v => !!v || 'Nationalité est obligatoire',
          v => (v && v.length <= 50) || 'Nationalité doit etre inférieur à 15 caratères',
        ],
        date_of_birthRules: [
          v => !!v || 'Date de naissance est obligatoire',
        ],
        place_of_birthRules: [
          v => !!v || 'Lieu de naissance est obligatoire',
          v => (v && v.length <= 50) || 'Lieu de naissance doit etre inférieur à 20 caratères',
        ],
        /* sexeRules: [
          v => !!v || 'Civilité est obligatoire',
        ], */
        type_identificationRules: [
          v => !!v || 'Type d\'identification est obligatoire',
        ],
        numero_identificationRules: [
          v => !!v || 'Numéro d\'identification est obligatoire'
        ],
        fonctionRules: [
          v => !!v || 'Fonction est obligatoire'
        ]
      },
      date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      imageData:null,
    }),
    methods: {
      handleFileUpload(e){         
        //Recupère le fichier
        //const input = this.$refs.file
        const files = this.files

        //Recupère l'extension
        let idxDot = files[0]?.name.lastIndexOf(".") + 1;
        let extFile = files[0]?.name.substr(idxDot, files[0].name.length).toLowerCase(); 
        let size = files[0]?.size/1024/1024 //La taille en Mbit
        console.log('Size-------------- ',size)
        if(files.length!=0){
          if (size <= 5 && (extFile=="jpg" || extFile=="jpeg" || extFile=="png")){
            this.model.accord_siege = files[0];
          }else{
            alert("Seul les images jpg/jpeg png et de taille inférieur à 2Mb sont acceptés!");
          } 
        } 
      },
      submitForm () {
        let validation = this.$refs.form.validate()
        /* let selectedRoles = this.model.roles.map((item)=>{return item.id})
        this.model.roles=selectedRoles */
        this.loading = true;
        //console.log('Donées formulaire++++++: ',{...this.model,roles:selectedRoles,...this.model.avatar})


        /* let formData = new FormData();
        formData.append("avatar", this.model.avatar);
        formData.append("name",this.model.name );
        formData.append("firstname",this.model.firstname );
        formData.append("lastname",this.model.lastname);
        formData.append("email",this.model.email);
        formData.append("roles",this.model.roles);

        if(this.model.fournisseur_services_id != null)
        {
          formData.append("fournisseur_services_id",this.model.fournisseur_services_id);
        }

        formData.append("country_code",this.model.country_code),
        formData.append("telephone",this.model.telephone),
        formData.append("adresse",this.model.adresse),
        formData.append("fonction",this.model.fonction),
        formData.append("structure_id",this.model.structure_id)

        console.log('Donées formulaire files ++++++: ',formData) */

        

       /* validation && this.$msasFileApi.post('/structures',{...this.model})
          .then((res) => {           
            console.log('Donées reçus ++++++: ',res.data)
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message || 'Ajout réussi'})
            this.$router.push('/structures');
          })
          .catch((error) => {
              console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
          }).finally(() => {
            this.loading = false;
            console.log('Requette envoyé ')
        }); */
      },
      resetForm () {
        this.$refs.form.reset()
      },
      resetValidationForm () {
        this.$refs.form.resetValidation()
      },
      async changeRole(role) {

        let checkRole = this.model.roles.filter(item => item.name === 'agent_structure').length;
        if(checkRole==1)
        this.showFournisseur=true
        else
        this.showFournisseur=false
        console.log('************',checkRole)
      },
      async changeSource(source) {
        this.showTypeSource=true
        this.model.type_sources = source.type_sources

        switch(source.libelle_source){
          case 'EPS' : {
            console.log('************',this.showNumAutorisation)
            this.showAdresseStructure=true

            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
          }
          break;
          case 'SPS' : {
            this.showNumAutorisation=true
            this.showAdresseStructure=true

            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
          }
          break;
          case 'PTF' : {
            this.showNumAgrement=true
            this.showAccordSiege=true
            this.showDebutIntervention=true
            this.showFinIntervention=true
            this.showAdresseStructure=true
          }
          break;
          case 'ONG' : {
            this.showNumAgrement=true
            this.showAdresseStructure=true

            this.showNumAutorisation=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
          }
          break;
          case 'RSE' : {
            this.showAdresseStructure=true

            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
          }
          break;
          case 'CT' : {
            this.showAdresseStructure=false

            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
          }
          break;
        }
        /* let checkSource = this.model.source_financements.filter(item => item.libelle_source === 'EPS').length;
        if(checkRole==1){
          this.showTypeSource=true
        }
        else
        this.showTypeSource=false */
        console.log('************',source)
      },
      async changeTypeZone(e) {
        console.log('************',e)
        switch(e.libelle_zone){
          case 'National' : {
            this.showRegion=false
            this.selectedDepartement = []
            this.selectedRegion = []
          }
          break;
          case 'Régional' : {
            this.showRegion=true
          }
          break;
        }
      },
    },
    metaInfo () {
      return {
        items: this.items,
      }
    }
  }
</script>
