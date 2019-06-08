<template>
<v-layout row wrap justify-center>
  <v-flex xs12 sm10 md8 lg6 xl4>
    <v-window v-model="step">
      <v-window-item :value="1">
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
                      hint="باید شامل حداقل ۳ کاراکتر و فقط حاوی حروف، اعداد و «_» باشد."
                      :rules="[requiredRule, usernameRule, v => !invalidUsername || 'نام کاربری قبلاً استفاده شده است.']"
                      validate-on-blur
                    ></v-text-field>
                  </v-flex>
                  <v-flex pl-2 pr-2 xs12 sm6>
                    <v-text-field
                      label="رمز عبور"
                      v-model="password"
                      hint="باید شامل حداقل ۶ کاراکتر باشد."
                      counter
                      :rules="[requiredRule, passwordRule]"
                      validate-on-blur
                      type="password"
                    ></v-text-field>
                  </v-flex>
                  <v-flex pl-2 pr-2 xs12 sm6>
                    <v-text-field
                      label="تکرار رمز عبور"
                      v-model="repeatPassword"
                      :rules="[requiredRule, v => v === password || 'تکرار رمز عبور با رمز عبور مطابقت ندارد.' ]"
                      validate-on-blur
                      type="password"
                    ></v-text-field>
                  </v-flex>
                  <v-flex pl-2 pr-2 xs12 sm6>
                    <v-text-field
                      label="نام"
                      v-model="firstName"
                      :rules="[requiredRule]"
                      validate-on-blur
                    ></v-text-field>
                  </v-flex>
                  <v-flex pl-2 pr-2 xs12 sm6>
                    <v-text-field
                      label="نام خانوادگی"
                      v-model="lastName"
                      :rules="[requiredRule]"
                      validate-on-blur
                    ></v-text-field>
                  </v-flex>
                  <v-flex pl-2 pr-2 xs12 sm6>
                    <v-text-field
                      label="شماره‌ی موبایل"
                      v-model="phoneNumber"
                      :rules="[requiredRule, phoneNumberRule, v => !invalidPhoneNumber || 'شماره‌ی موبایل قبلاً استفاده شده است.']"
                      validate-on-blur
                      type="number"
                    ></v-text-field>
                  </v-flex>
                  <v-flex pl-2 pr-2 xs12 sm6>
                    <v-text-field
                      label="پست الکترونیکی"
                      v-model="email"
                      :rules="[requiredRule, emailRule, v => !invalidEmail || 'پست الکترونیکی قبلاً استفاده شده است.']"
                      validate-on-blur
                    ></v-text-field>
                  </v-flex>
                  <v-flex pl-2 pr-2 xs12 sm6>
                    <v-autocomplete
                      label="کشور"
                      v-model="country"
                      :rules="[requiredRule]"
                      :items="['ایران']"
                      no-data-text="کشوری با این اسم یافت نشد."
                      validate-on-blur
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex pl-2 pr-2 xs12 sm6>
                    <v-autocomplete
                      label="شهر"
                      v-model="city"
                      :rules="[requiredRule]"
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
              :disabled="!valid || loading"
              color="success"
              outline
              :loading="loading"
            >
              ثبت نام
            </v-btn>
            <v-btn
              flat
              @click="clear"
              :disabled="loading"
              color="error"
            >پاک کردن</v-btn>
          </v-card-actions>
        </v-card>
      </v-window-item>
      <v-window-item :value="2">
        <v-card>
          <v-card-title primary-title>
            <v-flex xs12>
              <span style="font-size: 2rem;">تبریک!</span>
            </v-flex>
            <v-flex xs12>
              اکانت شما با موفقیت ساخته شد!
            </v-flex>
          </v-card-title>
          <v-card-actions>
            <v-btn
              flat
              @click="$router.push('login')"
              color="success"
              outline
            >
              صفحه‌ی ورود
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-window-item>
    </v-window>
  </v-flex>
</v-layout>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      step: 1,
      valid: true,
      loading: false,
      username: null,
      password: null,
      repeatPassword: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      email: null,
      country: null,
      city: null,
      usernameRule: v => /^[a-zA-Z0-9_]{3,}$/.test(v) || 'باید شامل حداقل ۳ کاراکتر و فقط حاوی حروف، اعداد و «_» باشد.',
      passwordRule: v => /^.{6,}$/.test(v) || 'باید شامل حداقل ۶ کاراکتر باشد.',
      phoneNumberRule: v => /^\d{10}$/.test(v) || 'شماره‌ی وارد شده معتبر نیست.',
      emailRule: v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'پست الکترونیکی وارد شده معتبر نیست.',
      requiredRule: v => !!v || 'این فیلد اجباری است.',
      invalidUsername: false,
      invalidPhoneNumber: false,
      invalidEmail: false
    }
  },
  methods: {
    async submit () {
      if (this.$refs.form.validate()) {
        this.loading = true

        const { data } = await axios.post('http://localhost:5000/user/signup', {
          username: this.username,
          password: this.password,
          repeatPassword: this.repeatPassword,
          firstName: this.firstName,
          lastName: this.lastName,
          phoneNumber: this.phoneNumber,
          email: this.email,
          country: this.country,
          city: this.city
        })

        this.loading = false
        
        if (data.isSuccessful) {
          this.step += 1
        } else if (data.statusCode === '200') {
          this.invalidUsername = true
          this.$refs.form.validate()
          this.invalidUsername = false
        }

      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
