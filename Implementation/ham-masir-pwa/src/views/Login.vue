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
                  :rules="[requiredRule, v => !invalidUsername || 'کاربری با این نام کاربری وجود ندارد.']"
                  validate-on-blur
                ></v-text-field>
              </v-flex>
              <v-flex pl-2 pr-2 xs12 sm6>
                <v-text-field
                  label="رمز عبور"
                  v-model="password"
                  :rules="[requiredRule, v => !invalidPassword || 'رمز عبور ورودی اشتباه است.']"
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
          :disabled="!valid || loading"
          color="success"
          outline
          :loading="loading"
        >
          ورود
        </v-btn>
        <v-btn
          flat
          @click="clear"
          :disabled="loading"
          color="error"
        >پاک کردن</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</v-layout>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      valid: true,
      loading: false,
      username: null,
      password: null,
      requiredRule: v => !!v || 'این فیلد اجباری است.',
      invalidUsername: false,
      invalidPassword: false
    }
  },
  methods: {
    async submit () {
      if (this.$refs.form.validate()) {
        this.loading = true

        const { data } = await axios.post('http://localhost:5000/user/login', {
          username: this.username,
          password: this.password
        })

        this.loading = false

        if (data.isSuccessful) {
          this.$router.push('home')
        } else if (data.statusCode === '111') {
          this.invalidUsername = true
          this.$refs.form.validate()
          this.invalidUsername = false
        } else if (data.statusCode === '112') {
          this.invalidPassword = true
          this.$refs.form.validate()
          this.invalidPassword = false
        }
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
