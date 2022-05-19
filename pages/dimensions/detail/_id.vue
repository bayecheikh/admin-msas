<template>
  <div p-6 class="bg-title">
    <v-row>
      <v-col md="2" lg="2" sm="12" >
        <v-container pl-0>
          <left-menu :items="leftmenuItems"></left-menu>
        </v-container>
      </v-col>

      <v-col md="10" lg="10" sm="12" class="full-height">
          <page-header :items="headerItems"></page-header>
          <v-row align="center"
            justify="center">
            <v-col cols="12" md="12" lg="12" sm="12">
              <info-dimension></info-dimension>
            </v-col>
            <v-col cols="12" md="12" lg="12" sm="12">
              <actions-dimension></actions-dimension>
            </v-col>
          </v-row>
      </v-col>
    </v-row>
  </div>
  
</template>

<script>
import PageHeader from '@/components/PageHeader';
import InfoDimension from '@/components/dimensions/detail/InfoDimension';
import ActionsDimension from '@/components/dimensions/detail/ActionsDimension';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      InfoDimension,
      ActionsDimension
    },
    middleware: function ({redirect,$hasermission}) {
      if(!$hasermission('gerer-dimensions')){
        return redirect('/')
      }
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'Roles', icon: 'mdi-lock',link:'/roles',position:1  },
          { text: 'dimensions', icon: 'mdi-lock',link:'/dimensions',position:2  }
        ],
        headerItems: [
        {
          text: 'dimensions',
          disabled: false,
          to: '/dimensions',
          exact: true
        },
        {
          text: 'Detail dimension',
          disabled: true,
          to: '/dimensions/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
