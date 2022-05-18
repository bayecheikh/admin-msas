<template>
  <div>
    <div class="d-flex border-bottom-solid">
      <div>
        <v-tabs v-model="tab">
          <v-tab class="text-normal" v-for="item in tabItems" :key="item.value"> {{item.title}}</v-tab>
        </v-tabs>
      </div>
      <div class="ml-auto p-2">
        <v-btn
        depressed
        rounded
        color="primary"
        @click="goToAddUsager"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Nouvelle demande
        </v-btn>
      </div>
    </div>
    
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems"  :key="item.value" >
          <table-demande :tab="item.value"></table-demande> 
      </v-tab-item>          
    </v-tabs-items>
  </div>
</template>
<script>
import TableDemande from '@/components/demandes/TableDemande'
  export default {
    components: {
      TableDemande
    },
    data: () => ({
      tab: null,
      tabItems: [
        {title:'Tout',value:'tout'},{title:'Brouillon',value:'brouillon'}, {title:'En cours',value:'encours'}, {title:'Livrés',value:'livre'}, {title:'Rejeté',value:'rejete'},
      ],
      selected: []
    }),
    methods:{
      goToAddUsager() {      
        this.$router.push('/demandes/addDemande');
      },
    }
  }
</script>
<style scoped>
.border-bottom-small{
  border-bottom: solid 1px #80808052;
}
</style>