<template>
    <div>
   <div class="custom-container bg-title-grey">
       <page-header :items="headerItems" class=""></page-header>  
   </div> 
   <v-form class="" v-model="valid" ref="form" enctype="multipart/form-data">
   <div class="custom-container mt-5">
    
       <form-add-infos-generales ></form-add-infos-generales>
       <form-add-coordonnees-siege></form-add-coordonnees-siege> 
       <form-add-zone-intervention ></form-add-zone-intervention> 
       <form-add-dimensions></form-add-dimensions> 
       <form-add-personne-responsable></form-add-personne-responsable> 
       <v-btn class="mr-4 text-white" color="primary" @click="handleSubmit" depressed>
        Enregistrer
      </v-btn>
   </div>
  
    </v-form>
 </div>
 </template>
 
 <script>
 import { mapMutations, mapGetters } from 'vuex'
 import LeftMenu from '@/components/LeftMenu';
 import PageHeader from '@/components/PageHeader';
 import FormAddInfosGenerales from '@/components/structures/formaddstructure/FormAddInfosGenerales';
 import FormAddCoordonneesSiege from '@/components/structures/formaddstructure/FormAddCoordonneesSiege';
 import FormAddZoneIntervention from '@/components/structures/formaddstructure/FormAddZoneIntervention';
 import FormAddDimensions from '@/components/structures/formaddstructure/FormAddDimensions';
 import FormAddPersonneResponsable from '@/components/structures/formaddstructure/FormAddPersonneResponsable';

 
 import { required } from 'vuelidate/lib/validators';
  import { validationMixin } from 'vuelidate';
   export default {
    mixins: [validationMixin],
     layout: "dashboard",
     components: {
       LeftMenu,
       PageHeader,
       FormAddInfosGenerales,
       FormAddCoordonneesSiege,
       FormAddZoneIntervention,
       FormAddDimensions,
       FormAddPersonneResponsable
     },
   /*  middleware: function ({redirect,$hasPermission}) {
       if(!$hasPermission('gerer-structures')){
         return redirect('/')
       }
     },*/
     mounted: function() {
       /* this.$store.dispatch('roles/getList')
       this.$store.dispatch('structures/getList')
       this.$store.dispatch('fournisseurs/getList') */
       this.$store.dispatch('type-zones/getList')
       this.$store.dispatch('typesources/getList')
       this.$store.dispatch('sources/getList')
       this.$store.dispatch('regions/getList')
       this.$store.dispatch('departements/getList')
       this.$store.dispatch('dimensions/getList')
       this.model.type_zone_interventions = this.listtypezones
        this.model.dimensions = this.dimensions
        this.model.source_financements = this.listsources
        this.model.type_sources = this.listsources.type_sources
        this.model.regions = this.listregions
        this.model.departements = this.listdepartements
     },
      computed: {
          validateForm() {
            return this.$store.state.structures.validation
        },
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
     data () {
       return {
           itemsNatureStructure:[{id:'Donneur',libelle:'Bailleur'},{id:'Receveur',libelle:'Récipiendaire'},{id:'Mixte',libelle:'Mixte'}],
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
          v => (v && v.length <= 100) || 'L\'adresse doit etre inférieure à 100 caractères',
        ],
        nationalityRules: [
          v => !!v || 'Nationalité est obligatoire',
          v => (v && v.length <= 50) || 'Nationalité doit etre inférieur à 15 caractères',
        ],
        date_of_birthRules: [
          v => !!v || 'Date de naissance est obligatoire',
        ],
        place_of_birthRules: [
          v => !!v || 'Lieu de naissance est obligatoire',
          v => (v && v.length <= 50) || 'Lieu de naissance doit etre inférieur à 20 caractères',
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
         headerItems: [
         {
           text: 'Structures',
           disabled: false,
           to: '/structures',
           exact: true
         },
         {
           text: 'Nouvelle structure',
           disabled: false,
           to: '/structures/addStructure',
           exact: true
         }
         
         ]
 
       }
     },
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
      async handleSubmit() {
        // Call the submitForm action using Vuex store's dispatch method
        await this.$store.dispatch('structures/submitForm');
        this.submitForm()
      },
      submitForm () {
        this.loading = true

        let validation = this.$refs.form.validate()

        let formData = this.$store.state.structures.setformdata
       console.log("fjfhjdhf",   !this.validateForm.$invalid)
      !this.validateForm.$invalid && validation && this.$msasFileApi.post('/structures',formData)
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
        this.listTypesSources = source.type_sources
        this.selectedType_sources = []

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
            this.showNumAutorisation=false
           
            this.showAccordSiege=true
            this.showZoneIntervention=true
           
            this.showDebutIntervention=true
            this.showFinIntervention=true
            this.showAdresseStructure=true

            this.showRegionMedical=false
            this.showDistrict=false
            this.showNumAgrement=true
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
 
 </style>
 