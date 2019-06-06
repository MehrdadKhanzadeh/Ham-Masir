<template>
<v-layout row wrap justify-center>
  <v-flex xs12 sm10 md8 lg6 xl4>
    <v-card>
      <v-card-title primary-title>
        <v-flex xs12>
          <span style="font-size: 2rem;">ثبت نام</span>
        </v-flex>
        <v-flex xs12>
          اکانت دارید؟
          <a @click="$router.push('login')">وارد شوید!</a>
        </v-flex>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex pl-2 pr-2 xs12>
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
              <v-flex pl-2 pr-2 xs12 sm6>
                <v-text-field
                  label="تکرار رمز عبور"
                  v-model="repeatPassword"
                  :rules="[v => !!v || 'این فیلد اجباری است.', v => v == password || 'تکرار رمز عبور با رمز عبور مطابقت ندارد.' ]"
                  validate-on-blur
                  type="password"
                ></v-text-field>
              </v-flex>
              <v-flex pl-2 pr-2 xs12 sm6>
                <v-text-field
                  label="نام"
                  v-model="firstName"
                  :rules="requiredRule"
                  validate-on-blur
                ></v-text-field>
              </v-flex>
              <v-flex pl-2 pr-2 xs12 sm6>
                <v-text-field
                  label="نام خانوادگی"
                  v-model="lastName"
                  :rules="requiredRule"
                  validate-on-blur
                ></v-text-field>
              </v-flex>
              <v-flex pl-2 pr-2 xs12 sm6>
                <v-text-field
                  label="شماره‌ی موبایل"
                  v-model="phoneNumber"
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-flex pl-2 pr-2 xs12 sm6>
                <v-text-field
                  label="پست الکترونیکی"
                  v-model="email"
                  :rules="emailRule"
                  validate-on-blur
                ></v-text-field>
              </v-flex>
              <v-flex pl-2 pr-2 xs12 sm6>
                <v-autocomplete
                  label="کشور"
                  v-model="country"
                  :rules="requiredRule"
                  :items="['ایران']"
                  no-data-text="کشوری با این اسم یافت نشد."
                  validate-on-blur
                ></v-autocomplete>
              </v-flex>
              <v-flex pl-2 pr-2 xs12 sm6>
                <v-autocomplete
                  label="شهر"
                  v-model="city"
                  :rules="requiredRule"
                  :items="['اصفهان', 'تهران']"
                  no-data-text="شهری با این اسم یافت نشد."
                  validate-on-blur
                ></v-autocomplete>
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
          ثبت نام
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
      repeatPassword: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      email: null,
      country: null,
      city: null,
      emailRule: [v => (v ? /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) : true) || 'ایمیل وارد شده معتبر نیست.'],
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
