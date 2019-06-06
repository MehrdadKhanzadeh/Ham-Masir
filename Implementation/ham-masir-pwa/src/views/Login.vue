<template>
<v-layout row wrap justify-center>
  <v-flex xs12 sm10 md8 lg6 xl4>
    <v-card color="white">
      <v-card-title primary-title>
        <v-flex xs12>
          <span style="font-size: 2rem;">ورود</span>
        </v-flex>
        <v-flex xs12>
          اکانت ندارید؟
          <a @click="$router.push('signup')">همین الان ثبت نام کنید!</a>
        </v-flex>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex pl-2 pr-2 xs12 sm6>
                <v-text-field
                  label="نام کاربری"
                  v-model="username"
                  :rules="requiredRule"
                  validate-on-blur
                ></v-text-field>
              </v-flex>
              <v-flex pl-2 pr-2 xs12 sm6>
                <v-text-field
                  label="رمز عبور"
                  v-model="password"
                  :rules="requiredRule"
                  validate-on-blur
                  type="password"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-btn
          flat
          @click="submit"
          :disabled="!valid"
          color="success"
          outline
        >
          ورود
        </v-btn>
        <v-btn
          flat
          @click="clear"
          color="error"
        >پاک کردن</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</v-layout>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      username: null,
      password: null,
      requiredRule: [v => !!v || 'این فیلد اجباری است.']
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // axios.post("/api/submit", {
        //   name: this.name,
        //   email: this.email,
        //   select: this.select,
        //   checkbox: this.checkbox
        // });
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
