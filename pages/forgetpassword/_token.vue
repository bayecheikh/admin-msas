<template>
  <form-forget-password></form-forget-password>
</template>

<script>
import FormForgetPassword from '@/components/auth/FormForgetPassword'
  export default {
    layout: 'default',
    components: {
      FormForgetPassword
    },
    mounted() {
        let token = this.$route.params.token;
        console.log('token temporaire : **************** : ',token)
        this.$store.dispatch('forgetpassword/getToken',token)
    },
    data: () => ({
    }),

    methods: {
      
    }

  };
</script>
<style scoped lang="css">
  #login {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
  .custom-font-mark{
    font-family: "MarkProBook";
    font-size: 28px;
    color:#000;
    letter-spacing: -2px;
  }
  .v-btn {
    min-width: 0 !important;
  }
  .v-input .v-label {
    font-family: "MarkProBook";
    font-size: 8px !important;
  }
  .text-decoration-none{
    text-decoration: none !important;
    color: rgba(0, 0, 0, 0.6) !important;
  }
  .custom-text-small{
    font-size: 10px !important;
  }

</style>
