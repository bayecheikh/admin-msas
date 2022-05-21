<template>
<div>
  <v-form class="text-sm-center" v-model="valid" ref="form" enctype="multipart/form-data"
    >
    <!--<div >
      <div class="headline">
        <v-avatar v-if="imageData" size="100px">
          <img :src="imageData" alt="Avatar"/>
        </v-avatar>
        <v-avatar size="100px" v-else>
          <img src="@/static/avatar/default-structure.png" alt="Cheikh Gueye"/>
        </v-avatar>
      </div>
    </div>
    <div>
      <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            @click="$refs.file.click()"
          >
        <v-icon>mdi-upload-outline</v-icon>
      </v-btn>
      <input type="file" id="file" name="avatar" ref="file" v-on:change="handleFileUpload" style="display: none"/>
      <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            color="blue"
            @click="$refs.file.click()"
          >
        <v-icon>mdi-camera-outline</v-icon>
      </v-btn>
    </div>
    <span class="caption">Photo de profil png ou jpg max 2Mo</span>-->
    <v-row>
      <!-- <v-col md="12" lg="12" sm="12">
        <v-radio-group
          v-model="model.sexe"
          :rules="rules.sexeRules"
          row
        >
          Sexe : &nbsp; &nbsp;<v-radio
            label="Masculin"
            value="Masculin"
          ></v-radio>
          <v-radio
            label="Feminin"
            value="Feminin"
          ></v-radio>
        </v-radio-group> 
      </v-col>-->
      <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Dénomination"
          outlined dense
          v-model="model.nom_structure"
          :rules="rules.nom_structureRules"
        ></v-text-field>
      </v-col>
      <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Prénom et Nom responsable"
          outlined dense
          v-model="model.name"
          :rules="rules.firstnameRules"
        ></v-text-field>
      </v-col>
      <!--<v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Prénom"
          outlined dense
          v-model="model.firstname"
          :rules="rules.firstnameRules"
        ></v-text-field>
      </v-col>
      <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Nom"
          outlined dense
          v-model="model.lastname"
          :rules="rules.lastnameRules"
        ></v-text-field>
      </v-col>-->
      <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Adresse Email responsable"
          outlined dense
          v-model="model.email"
          :rules="rules.emailRules"
        ></v-text-field>
      </v-col>
      <!-- <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Login"
          outlined dense
          v-model="model.structurename"
          :rules="rules.structurenameRules"
        ></v-text-field>
      </v-col> -->
     <!-- <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Fonction"
          outlined dense
          v-model="model.fonction"
          :rules="rules.fonctionRules"
        ></v-text-field>
      </v-col>-->
      <!-- <v-col lg="6" sm="12" md="6">
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
              v-model="model.date_of_birth"
              label="Date de naissance"
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              outlined dense
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="model.date_of_birth"
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
      </v-col> -->
      <!-- <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Lieu de naissance"
          outlined dense
          v-model="model.place_of_birth"
          :rules="rules.place_of_birthRules"
        ></v-text-field>
      </v-col> -->
     <!--  <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Adresse"
          outlined dense
          v-model="model.adresse"
          :rules="rules.adresseRules"
        ></v-text-field>
      </v-col>-->
      <!-- <v-col md="6" lg="6" sm="12">
        <vue-tel-input-vuetify label="Téléphone"
          outlined dense
          v-model="model.telephone"
          :rules="rules.telephoneRules">

        </vue-tel-input-vuetify>
      </v-col>
      <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Indicatif"
          dense outlined
          v-model="model.country_code"
          :rules="rules.country_codeRules"
        ></v-text-field>
      </v-col> -->
      <!--<v-col md="2" lg="2" sm="12">
        <v-text-field
          label="Indicatif"
          dense outlined
          v-model="model.country_code"
          :rules="rules.country_codeRules"
        ></v-text-field>
      </v-col>
      <v-col md="4" lg="4" sm="12">
        <v-text-field
          label="Téléphone"
          outlined dense
          v-model="model.telephone"
          :rules="rules.telephoneRules"
        ></v-text-field>
      </v-col>-->
      <!--<v-col
        lg="6"
        md="6"
        sm="12"
      >
        <v-autocomplete
            v-model="model.roles"
            :items="listroles"
            :rules="rules.rolesRules"
            outlined
            dense
            multiple
            small-chips
            label="Role"
            item-text="description"
            item-value="id"
            clearable
            return-object
            @change="changeRole"
          >
        </v-autocomplete>
      </v-col>-->
      <!-- <v-col
        lg="6"
        md="6"
        sm="12"
      >
        <v-autocomplete
            v-model="model.structure_id"
            :rules="rules.structure_idRules"
            :items="liststructures"
            outlined
            dense
            small-chips
            label="Structure"
            item-text="libelle"
            item-value="id"
            clearable
          >
        </v-autocomplete>
      </v-col>
      <v-col
        lg="6"
        md="6"
        sm="12"
      >
        <v-autocomplete
            v-model="model.fournisseur_services_id"
            :items="listfournisseurs"
            :rules="this.showFournisseur==true?rules.fournisseur_services_idRules:null"
            outlined
            dense
            small-chips
            label="Fournisseur de service"
            item-text="libelle"
            item-value="id"
            clearable
            v-if="showFournisseur"
          >
        </v-autocomplete>
      </v-col> -->
    </v-row>

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
    },
    computed: {
      ...mapGetters({
      /* listroles: 'roles/selectlistroles', */
      /* listfournisseurs: 'fournisseurs/selectlistfournisseurs',
      liststructures: 'structures/selectliststructures', */
    })},
    data: () => ({
      loading: false,
      message:null,
      color:null,
      valid: true,
      showFournisseur: false,
      message:null,
      model: {
        avatar:'',
        nom_structure:'',
        name:'',
        firstname: 'Ababacar',
        lastname: 'Syll',
        email: 'syyl@msas.sn',
        roles: null,
        fournisseur_services_id:null,
        country_code:'+221',
        telephone: '',
        adresse: '',
        fonction: '',
        structure_id:null
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

      imageData:null,
    }),
    methods: {
      handleFileUpload(e){         
        //Recupère le fichier
        const input = this.$refs.file
        const files = input.files

        //Recupère l'extension
        let idxDot = files[0].name.lastIndexOf(".") + 1;
        let extFile = files[0].name.substr(idxDot, files[0].name.length).toLowerCase(); 
        let size = files[0].size/1024/1024 //La taille en Mbit
        console.log('Size-------------- ',size)

        if (size <= 2 && (extFile=="jpg" || extFile=="jpeg" || extFile=="png")){
          //Affecté le fichier image au model avatar
          this.model.avatar = e.target.files[0];

          //Prévisualise l'image
          if (files && files[0]) {
            const reader = new FileReader
            reader.onload = e => {
              this.imageData = e.target.result
            }
            reader.readAsDataURL(files[0])
            this.$emit('input', files[0])
          }
        }else{
          alert("Seul les images jpg/jpeg png et de taille inférieur à 2Mb sont acceptés!");
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

       validation && this.$msasFileApi.post('/structures',{...this.model})
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
        this.showFournisseur=true
        else
        this.showFournisseur=false
        console.log('************',checkRole)
      },
    },
    metaInfo () {
      return {
        items: this.items,
      }
    }
  }
</script>
