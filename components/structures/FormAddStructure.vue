<template>
  <div>
    <v-form class="" v-model="valid" ref="form" enctype="multipart/form-data">
      <v-card flat class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
        <v-row>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Dénomination"
              outlined
              dense
              v-model="model.nom_structure"
              :rules="rules.nom_structureRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-select
              :items="itemsNatureStructure"
              v-model="model.donneur_receveur_mixte"
              :rules="rules.nature_structureRules"
              label="Nature structure"
              item-text="libelle"
              item-value="id"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col lg="4" md="4" sm="12">
            <v-autocomplete
              v-model="SelectedSource_financements"
              :items="listsources"
              :rules="rules.typeStructureRules"
              outlined
              dense
              label="Type de structure"
              item-text="libelle_source"
              item-value="id"
              return-object
              @change="changeSource_financement"
            >
            </v-autocomplete>
          </v-col>
          <v-col lg="4" md="4" sm="12" v-if="showTypeSource">
            <v-autocomplete
              v-model="selectedType_sources"
              :items="listType_sources"
              :rules="this.showTypeSource==true?rules.Structure_services_idRules:null"
              outlined
              dense
              label="Sous-type"
              item-text="libelle_type_source"
              item-value="id"
              return-object
              @change="changeType_source"

            >
            </v-autocomplete>

          </v-col>
          <v-col lg="4" md="4" sm="12" v-if="showRegionMedical">
            <v-autocomplete
              :rules="showRegionMedical?rules.regionRules:null"
              :items="listregions"
              outlined
              dense
              label="Région"
              item-text="nom_region"
              item-value="id"
              return-object
              @change="changeRegion"
            >
            </v-autocomplete>
          </v-col>
          <v-col lg="4" md="4" sm="12" v-if="showDistrict">
            <v-autocomplete
              v-model="SelectedDepartements"
              :rules="showDistrict?rules.districtRules:null"
              :items="listDepartements"
              outlined
              dense
              label="District"
              item-text="nom_departement"
              item-value="id"
            >
            </v-autocomplete>
          </v-col>
          <v-col md="6" lg="6" sm="12" v-if="showNumAutorisation">
            <v-text-field
              label="N° autorisation"
              outlined
              dense
              v-model="model.numero_autorisation"
              :rules="showNumAutorisation?rules.autorisationRules:null"
            ></v-text-field>
          </v-col>
          <v-col md="6" lg="6" sm="12" v-if="showNumAgrement">
            <v-text-field
              label="N° agrément"
              outlined
              dense
              v-model="model.numero_agrement"
              :rules="showNumAgrement?rules.agrementRules:null"
            ></v-text-field>
          </v-col>
          <v-col md="6" lg="6" sm="12" v-if="showAccordSiege">
            <v-flex>
              <v-btn
                color="grey"
                class="white--text"
                @click="$refs.file.click()"
                depressed
              >
                Accord de siège
                <v-icon right dark> mdi-cloud-upload </v-icon>
              </v-btn>
            </v-flex>
            <v-flex>{{filename}}</v-flex>
            <input
              type="file"
              id="file"
              name="accord_siege"
              ref="file"
              v-on:change="handleFileUpload"
              style="display: none"
            />
          </v-col>
          <v-col lg="6" sm="12" md="6" v-if="showDebutIntervention">
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
                  label="Début de l'intervention"
                  :rules="showDebutIntervention?rules.debutInterventionRules:null"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="model.debut_intervention"
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col lg="6" sm="12" md="6" v-if="showFinIntervention">
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
                  :rules="showFinIntervention?rules.finInterventionRules:null"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
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
      <h2 class="mb-5 primary custom-title-h2">Coordonnées siège</h2>
      <v-card flat class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
        <v-row>
          <v-col md="4" lg="4" sm="12" v-if="showAdresseStructure">
            <v-text-field
              label="Adresse structure"
              outlined
              dense
              v-model="model.adresse_structure"
              :rules="showAdresseStructure?rules.adresseRules:null"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Téléphone structure"
              outlined
              dense
              v-model="model.telephone_structure"
              :rules="rules.telephoneRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="E-mail structure"
              outlined
              dense
              v-model="model.email_structure"
              :rules="rules.emailRules"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <h2 class="mb-5 primary custom-title-h2" v-if="showZoneIntervention">Zone d'intervention</h2>
      <v-card flat class="mx-auto mb-5 pl-10 pt-5 pr-10 pb-5" v-if="showZoneIntervention">
        <v-row>
          <v-col md="12" lg="12" sm="12">
            <v-radio-group
              :v-model="selectedType_zone_interventions"
              :rules="showZoneIntervention?rules.zoneInterventionRules:null"
              @change="changeType_zone_intervention"
              row
            >
              <v-radio
                v-for="item in listtypezones"
                :key="item.id"
                :label="item.libelle_zone"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row v-if="showRegion">
          <v-col md="13" lg="12" sm="12">
            <v-expansion-panels
              v-for="(item,i) in listregions"
              :key="i"
              class="mb-2"
            >
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <v-checkbox
                    v-model="selectedRegions"
                    :label="item.nom_region"
                    :value="item.id"
                  ></v-checkbox>
                </v-expansion-panel-header>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
        <div v-if="selectedType_zone_interventions && selectedType_zone_interventions === 2 && !$v.selectedRegions.required">
          <span class="errorcustom">La région est obligatoire</span>
        </div>

      </v-card>
      <h2 class="mb-5 primary custom-title-h2">Dimensions</h2>
      <v-card flat class="mx-auto mb-5 pl-10 pt-5 pr-10 pb-5">
        <v-row class="d-flex justify-content-between">
          <v-col
            md="4"
            lg="4"
            sm="12"
            v-for="item in listdimensions"
            :key="item.id"
          >
            <v-checkbox
              v-model="selectedDimensions"
              :rules="rules.dimensionsRules"
              :label="item.libelle_dimension"
              :value="item.id"
            ></v-checkbox>
          </v-col>
        </v-row>
        <div v-if="$v.selectedDimensions.$error">
          <span class="errorcustom">La dimension est obligatoire</span>
        </div>
      </v-card>
      <h2 class="mb-5 primary custom-title-h2">Personne responsable</h2>
      <v-card flat class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
        <v-row>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Fonction du responsable"
              outlined
              dense
              v-model="model.fonction_responsable"
              :rules="rules.fonctionResponsableRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Prénom du responsable"
              outlined
              dense
              v-model="model.firstname_responsable"
              :rules="rules.firstnameResponsableRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Nom du responsable"
              outlined
              dense
              v-model="model.lastname_responsable"
              :rules="rules.lastnameResponsableRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Adresse e-mail du responsable"
              outlined
              dense
              v-model="model.email_responsable"
              :rules="rules.emailRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Téléphone du responsable"
              outlined
              dense
              v-model="model.telephone_responsable"
              :rules="rules.telephoneRules"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>

      <v-btn class="mr-4 text-white" color="primary" @click="submitForm" depressed>
        Enregistrer
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

  export default {
    mixins: [validationMixin],
    components: {
    },
    mounted: function() {
      /* this.$store.dispatch('roles/getList') */
      /* this.$store.dispatch('structures/getList')
      this.$store.dispatch('Structures/getList') */

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
      /* listStructures: 'Structures/selectlistStructures',
      liststructures: 'structures/selectliststructures', */
      listtypezones: 'type-zones/listtypezones',
      //listtypesources: 'typesources/listtypesources',
      listsources: 'sources/listsources',
      listregions: 'regions/listregions',
      listdepartements: 'departements/listdepartements',
      listdimensions: 'dimensions/listdimensions',
    })},
    validations: {
      selectedRegions: {
    required: function(value) {
      if (this.selectedType_zone_interventions === 2) {
        return required(value)
      } else {
        return true
      }
    }
  },
    selectedDimensions: {
      required,
    },

  },
    data: () => ({
      itemsNatureStructure:[{id:'Donneur',libelle:'Pourvoyeur de ressource'},{id:'Receveur',libelle:'Récipiendaire'},{id:'Mixte',libelle:'Mixte'}],
      listDepartements:[],
      filename : '',
      loading: false,
      message:null,
      color:null,
      valid: true,
      showStructure: false,
      showTypeSource: false,
      showNumAutorisation: false,
      showAccordSiege: false,
      showNumAgrement: false,
      showAdresseStructure: false,
      showRegionMedical: false,
      showDistrict: false,
      showZoneIntervention: false,
      showRegion: false,
      message:null,
      selectedSource_financements: [],
      selectedType_sources: [],
      listType_sources: [],
      selectedRegions: [],
      selectedDepartements: [],
      selectedDimensions: [],
      selectedType_zone_interventions: [],
      model: {
        nom_structure:'',
        donneur_receveur_mixte:[],
        numero_autorisation:'',
        accord_siege:'',
        numero_agrement:'',
        adresse_structure:'',
        debut_intervention:'',
        fin_intervention:'',
        telephone_structure:'',
        email_structure:'',
        firstname_responsable:'',
        lastname_responsable:'',
        email_responsable:'',
        telephone_responsable:'',
        fonction_responsable:'',
      },

      rules:{
        debutInterventionRules: [
          v => !!v || 'La date de début de l\'intervention est obligatoire'
        ],

        finInterventionRules: [
          v => !!v || 'La date de fin de l\'intervention est obligatoire'
        ],
        zoneInterventionRules: [
        v => !!v || 'La zone d\'intervention est obligatoire'
        ],
        dimensionsRules: [
        v => !!v || 'La dimension est dobligatoire'
        ],
        nom_structureRules: [
          v => !!v || 'La dénomination est obligatoire',
          (v) => (v && v.length <= 100) || "La dénomination ne doit pas dépasser 100 caractères",
          (v) => (v && v.length >= 2) || "La dénomination doit contenir au moins 2 caractères"
        ],
        typeStructureRules : [
        v => !!v || 'Le type de structure est obligatoire'
        ],
        nature_structureRules : [
        v => (v && !!v.length)|| 'La nature de la structure est obligatoire'
        ],
        sousTypeRules: [
        v => !!v || 'Le sous-type est obligatoire'
        ],
        agrementRules: [
          v => !!v || 'Le numéro d\'agrément est obligatoire'
        ],
        firstnameResponsableRules: [
          (v) => !!v || 'Le prénom du responsable est obligatoire',
          (v) => /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/.test(v) || "Le prénom ne doit contenir que des caractères alphabétiques et des caractères spéciaux tels que des espaces, des tirets et des apostrophes",
          (v) => (v && v.length <= 50) || "Le prénom ne doit pas dépasser 50 caractères",
          (v) => (v && v.length >= 2) || "Le prénom doit contenir au moins 2 caractères"
        ],
        lastnameResponsableRules: [
          (v) => !!v || 'Le nom du responsable est obligatoire',
          (v) => /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/.test(v) || "Le nom ne doit contenir que des caractères alphabétiques et des caractères spéciaux tels que des espaces, des tirets et des apostrophes",
          (v) => (v && v.length <= 50) || "Le nom ne doit pas dépasser 50 caractères",
          (v) => (v && v.length >= 2) || "Le nom doit contenir au moins 2 caractères"
        ],
        fonctionResponsableRules: [
          (v) => !!v || 'La fonction du responsable est obligatoire',
          (v) => (v && v.length >= 2) || "La fonction doit contenir au moins 2 caractères"
        ],
        emailRules: [
          v => !!v || 'L\'adresse e-mail est obligatoire',
          v => /.+@.+\..+/.test(v) || 'L\'adresse e-mail doit être valide',
        ],
        rolesRules: [
          v => (v && !!v.length) || 'Le rôle est obligatoire',
        ],

        districtRules: [
        v => !!v || 'Le district est obligatoire',
        ],
        regionRules: [
        v => !!v || 'La région est obligatoire',
        ],
        autorisationRules: [
        v => !!v || 'Le numéro d\'autorisation est obligatoire',
        ],
        telephoneRules: [
        v => !!v || 'Le numéro de téléphone est obligatoire',
        (v) => /^[0-9+ ]+$/.test(v) || "Le numéro de téléphone ne doit contenir que des chiffres, des espaces et des +",
        (v) => (v && v.length >= 8 && v.length <= 20) || "Le numéro de téléphone doit contenir entre 8 et 20 chiffres"
        ],
        country_codeRules: [
          v => !!v || 'L\'indicatif du pays est obligatoire',
        ],
        Structure_services_idRules: [
          v => (!!v) || 'Structure est obligatoire',
        ],
        structure_idRules: [
          v => (!!v) || 'Structure est obligatoire',
        ],
        adresseRules: [
          v => !!v || 'L\'adresse est obligatoire',
          v => (v && v.length <= 100) || 'L\'adresse doit etre inférieure à 100 caratères',
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
        const input = this.$refs.file
        const files = input.files

        //Recupère l'extension
        let idxDot = files[0]?.name.lastIndexOf(".") + 1;
        let extFile = files[0]?.name.substr(idxDot, files[0].name.length).toLowerCase();
        let size = files[0]?.size/1024/1024 //La taille en Mbit
        console.log('Size-------------- ',size)
        if(files.length!=0){
          if (size <= 5 && (extFile=="jpg" || extFile=="jpeg" || extFile=="png" || extFile=="pdf" || extFile=="doc" || extFile=="docx")){
            this.model.accord_siege = files[0];
            this.filename = files[0].name
          }else{
            alert("Seul les fichiers jpg/jpeg/png/pdf/doc/docx et de taille inférieur à 5Mb sont acceptés!");
          }
        }
      },
      submitForm () {
        this.loading = true

        let validation = this.$refs.form.validate()

        let source_financements = this.selectedSource_financements?.id
        let type_sources = this.selectedType_sources?.id
        let departements = this.selectedDepartements
        let regions = this.selectedRegions
        let dimensions = this.selectedDimensions
        let type_zone_interventions = this.selectedType_zone_interventions

        let formData = new FormData();

        formData.append("nom_structure", this.model.nom_structure);
        formData.append("donneur_receveur_mixte", this.model.donneur_receveur_mixte);
        formData.append("numero_autorisation",this.model.numero_autorisation);
        formData.append("accord_siege",this.model.accord_siege);
        formData.append("numero_agrement",this.model.numero_agrement);
        formData.append("adresse_structure",this.model.adresse_structure);
        formData.append("debut_intervention",this.model.debut_intervention);
        formData.append("fin_intervention",this.model.fin_intervention);
        formData.append("telephone_structure",this.model.telephone_structure);
        formData.append("email_structure",this.model.email_structure);

        formData.append("source_financements",source_financements);
        formData.append("type_sources",type_sources);
        formData.append("departements",departements);
        formData.append("regions",regions);
        formData.append("dimensions",dimensions);
        formData.append("type_zone_interventions",type_zone_interventions);

        formData.append("firstname_responsable",this.model.firstname_responsable)
        formData.append("lastname_responsable",this.model.lastname_responsable)
        formData.append("email_responsable",this.model.email_responsable)
        formData.append("telephone_responsable",this.model.telephone_responsable)
        formData.append("fonction_responsable",this.model.fonction_responsable)

        let data = {
          ...this.model,
          source_financements : source_financements,
          type_sources : type_sources,
          departements : departements,
          regions : regions,
          dimensions : dimensions,
          type_zone_interventions : type_zone_interventions
        }

        console.log('Donées formulaire source financements ++++++: ',data)

        console.log('FormData ++++++ : ',formData)

        this.$v.$touch();

      !this.$v.$invalid && validation && this.$msasFileApi.post('/structures',formData)
          .then((res) => {
            console.log('Donées reçus ++++++: ',res)
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message})
            this.$router.push('/structures');
          })
          .catch((error) => {
              console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
          }).finally(() => {
            this.loading = false;
            console.log('Requette envoyé ')
        });
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
        this.showStructure=true
        else
        this.showStructure=false
        console.log('************',checkRole)
      },
      async changeRegion(value) {
        //this.selectedRegions= []
        console.log('region id +++++ ',value)
        console.log(' departements +++++ ',this.listdepartements)
        //this.listdepartements = this.listdepartements.filter(item => item.region[0] === value);
        this.listDepartements = value?.departements
        this.selectedRegions=[value.id]
        //this.selectedRegions.push(value.id)

      },
      async changeDepartement(value) {


      },
      async changeSource_financement(source) {
        this.showTypeSource=true
        this.selectedSource_financements = source
        this.listType_sources = source.type_sources

        switch(source.libelle_source){
          case 'EPS' : {
            console.log('************',this.showNumAutorisation)
            this.showAdresseStructure=true
            this.showRegionMedical=true
            this.showDistrict=true

            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
            this.showZoneIntervention=false
          }
          break;
          case 'SPS' : {
            this.showNumAgrement=false

            this.showAdresseStructure=true
            this.showZoneIntervention=true


            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showNumAutorisation=true
          }
          break;
          case 'PTF' : {
            //this.showNumAgrement=true
            this.showAccordSiege=true
            this.showZoneIntervention=true

            this.showDebutIntervention=true
            this.showFinIntervention=true
            this.showAdresseStructure=true

            this.showRegionMedical=false
            this.showDistrict=false
            this.showNumAgrement=false
          }
          break;
          case 'ONG' : {
            this.showNumAutorisation=false

            this.showAdresseStructure=true
            this.showZoneIntervention=true


            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
            this.showRegionMedical=false
            this.showDistrict=false
            this.showNumAgrement=true
          }
          break;
          case 'RSE' : {
            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAdresseStructure=true
            this.showZoneIntervention=true


            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
            this.showRegionMedical=false
            this.showDistrict=false
          }
          break;
          case 'CT' : {
            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAdresseStructure=false
            this.showZoneIntervention=true


            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
            this.showRegionMedical=false
            this.showDistrict=false
          }
          break;
          case 'RM' : {
            console.log('************',this.showNumAutorisation)
            this.showAdresseStructure=true
            this.showRegionMedical=true
            //this.showDistrict=true

            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
            this.showZoneIntervention=false
            this.showTypeSource=false
          }
          break;
          case 'DISTRICT' : {
            console.log('************',this.showNumAutorisation)
            this.showAdresseStructure=true
            this.showRegionMedical=true
            //this.showDistrict=true

            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
            this.showZoneIntervention=false
            this.showTypeSource=false
          }
          break;
          case 'POSTE DE SANTE' : {
            console.log('************',this.showNumAutorisation)
            this.showAdresseStructure=true
            this.showRegionMedical=true
            this.showDistrict=true

            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
            this.showZoneIntervention=false
            this.showTypeSource=false
          }
          break;
          case 'CENTRE DE SANTE' : {
            console.log('************',this.showNumAutorisation)
            this.showAdresseStructure=true
            this.showRegionMedical=true
            this.showDistrict=true

            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
            this.showZoneIntervention=false
            this.showTypeSource=false
          }
          break;
          case 'PROTECTION SOCIALE' : {
            console.log('************',this.showNumAutorisation)
            this.showAdresseStructure=true
            this.showRegionMedical=true
            //this.showDistrict=true

            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
            this.showZoneIntervention=false
            this.showDistrict=false
            //this.showTypeSource=false
          }
          break;
          case 'SERVICE' : {
            console.log('************',this.showNumAutorisation)
            this.showAdresseStructure=true
            this.showRegionMedical=true
            this.showDistrict=true

            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
            this.showZoneIntervention=false
            //this.showTypeSource=false
            //this.showTypeSource=false
          }
          break;
          case 'DIRECTION' : {
            console.log('************',this.showNumAutorisation)
            this.showAdresseStructure=true
            this.showRegionMedical=true
            //this.showDistrict=true

            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
            this.showZoneIntervention=false
            //this.showTypeSource=false
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
      async changeType_source(type_source) {
        this.selectedType_sources = type_source
        console.log('************',type_source)
      },
      async changeType_zone_intervention(e) {
        console.log('************',e)
        this.selectedType_zone_interventions = e.id

        switch(e.libelle_zone){
          case 'National' : {
            this.showRegion=false
            this.selectedDepartement = []
            this.selectedRegion = []
          }
          break;
          case 'Régional' : {
            this.showRegion=true
            this.showZoneIntervention=true
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

<style scoped>
.errorcustom{
  color:#dd2c00 !important;
  background-color: white !important;
}
</style>
