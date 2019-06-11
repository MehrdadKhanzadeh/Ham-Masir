<template>
<v-layout row wrap justify-center v-if="$store.state.plans.length > 0" style="padding-bottom: 4rem;">
  <v-btn
    fab
    color="success"
    bottom
    right
    fixed
    @click.native.stop="add"
  >
    <v-icon>add</v-icon>
  </v-btn>
  <v-dialog v-model="dialog" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="success">
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>
          برنامه‌ی جدید
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="savePlan">ذخیره</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-layout row wrap justify-center>
          <v-flex xs12 sm10 md8 lg6 xl4>
            <v-form ref="form">
              <v-layout row wrap justify-center align-center align-content-center>
                <v-flex xs12 pr-2 pl-2>
                  <v-autocomplete
                    v-model="path"
                    label="نقاط کلیدی سفر"
                    multiple
                    chips
                    :items="['دانشگاه صنعتی اصفهان', 'میدان جمهوری اسلامی', 'میدان آزادی', 'میدان بزرگمهر']"
                    :rules="[v => v.length >= 2 || 'حداقل ۲ مورد انتخاب کنید.']"
                    hint="حداقل ۲ مورد انتخاب کنید."
                    validate-on-blur
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12 sm6 text-xs-center pr-2 pl-2>
                  <v-menu
                    ref="dateMenu"
                    v-model="dateMenu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :value="date ? (new Date(date)).toLocaleDateString('fa-IR') : null"
                        :rules="[v => !!v || 'این فیلد اجباری است.']"
                        label="تاریخ حرکت"
                        readonly
                        v-on="on"
                        validate-on-blur
                      ></v-text-field>
                    </template>
                    <v-date-picker color="primary" :first-day-of-week="6" locale="fa-ir" v-model="date" no-title scrollable>
                      <v-btn flat color="success" outline @click="$refs.dateMenu.save(date)">تأیید</v-btn>
                      <v-btn flat color="error" @click="dateMenu = false">انصراف</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6 text-xs-center pr-2 pl-2>
                  <v-menu
                    ref="timeMenu"
                    v-model="timeMenu"
                    :close-on-content-click="false"
                    right
                    :return-value.sync="time"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="time"
                        :rules="[v => !!v || 'این فیلد اجباری است.']"
                        label="زمان حرکت"
                        readonly
                        v-on="on"
                        validate-on-blur
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="timeMenu"
                      v-model="time"
                      full-width
                      @click:minute="$refs.timeMenu.save(time)"
                      format="24hr"
                      dir="ltr"
                      no-title
                    ></v-time-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 pr-2 pl-2>
                  <v-autocomplete
                    v-model="repeatPattern"
                    :items="['هرگز', 'روزانه', 'هفتگی', 'ماهانه']"
                    label="تکرار"
                    no-data-text="الگوی تکرار پیدا نشد."
                  >
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12 pr-2 pl-2>
                  <v-checkbox label="راننده هستم." v-model="isDriver"></v-checkbox>
                </v-flex>
              </v-layout>
            </v-form>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-flex xs12>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 xl3 :key="i" v-for="(p, i) in $store.state.plans" pa-2>
        <v-card color="white">
          <v-card-title primary-title>
            <v-flex xs12 :style="{ color: $vuetify.theme.primary }">
              <span style="font-size: 1.5rem;">{{ (new Date(p.date)).toLocaleDateString('fa-IR') }}</span>
            </v-flex>
            <v-flex xs12 style="color: gray;">
              {{ p.time }}
            </v-flex>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs6>
                نوع: {{ p.isDriver ? 'راننده' : 'مسافر' }}
              </v-flex>
              <v-flex xs6>
                تکرار: {{ p.repeatPattern }}
              </v-flex>
              <v-flex xs12 pt-3>
                مسیر حرکت:
              </v-flex>
              <v-flex xs12>
                <v-chip :key="j" v-for="(pp, j) in p.path">
                  {{ pp }}
                </v-chip>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn
              flat
              @click="edit"
              color="warning"
            >
              ویرایش
            </v-btn>
            <v-btn
              flat
              @click="remove(i)"
              color="error"
            >حذف</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>
</v-layout>
<v-flex v-else text-xs-center>
  <v-btn
    fab
    color="success"
    bottom
    right
    fixed
    @click.native.stop="add"
  >
    <v-icon>add</v-icon>
  </v-btn>
  <v-dialog v-model="dialog" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="success">
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>
          برنامه‌ی جدید
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="savePlan">ذخیره</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-layout row wrap justify-center>
          <v-flex xs12 sm10 md8 lg6 xl4>
            <v-form ref="form">
              <v-layout row wrap justify-center align-center align-content-center>
                <v-flex xs12 pr-2 pl-2>
                  <v-autocomplete
                    v-model="path"
                    label="نقاط کلیدی سفر"
                    multiple
                    chips
                    :items="['دانشگاه صنعتی اصفهان', 'میدان جمهوری اسلامی', 'میدان آزادی', 'میدان بزرگمهر']"
                    :rules="[v => v.length >= 2 || 'حداقل ۲ مورد انتخاب کنید.']"
                    hint="حداقل ۲ مورد انتخاب کنید."
                    validate-on-blur
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12 sm6 text-xs-center pr-2 pl-2>
                  <v-menu
                    ref="dateMenu"
                    v-model="dateMenu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :value="date ? (new Date(date)).toLocaleDateString('fa-IR') : null"
                        :rules="[v => !!v || 'این فیلد اجباری است.']"
                        label="تاریخ حرکت"
                        readonly
                        v-on="on"
                        validate-on-blur
                      ></v-text-field>
                    </template>
                    <v-date-picker color="primary" :first-day-of-week="6" locale="fa-ir" v-model="date" no-title scrollable>
                      <v-btn flat color="success" outline @click="$refs.dateMenu.save(date)">تأیید</v-btn>
                      <v-btn flat color="error" @click="dateMenu = false">انصراف</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6 text-xs-center pr-2 pl-2>
                  <v-menu
                    ref="timeMenu"
                    v-model="timeMenu"
                    :close-on-content-click="false"
                    right
                    :return-value.sync="time"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="time"
                        :rules="[v => !!v || 'این فیلد اجباری است.']"
                        label="زمان حرکت"
                        readonly
                        v-on="on"
                        validate-on-blur
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="timeMenu"
                      v-model="time"
                      full-width
                      @click:minute="$refs.timeMenu.save(time)"
                      format="24hr"
                      dir="ltr"
                      no-title
                    ></v-time-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 pr-2 pl-2>
                  <v-autocomplete
                    v-model="repeatPattern"
                    :items="['هرگز', 'روزانه', 'هفتگی', 'ماهانه']"
                    label="تکرار"
                    no-data-text="الگوی تکرار پیدا نشد."
                  >
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12 pr-2 pl-2>
                  <v-checkbox label="راننده هستم." v-model="isDriver"></v-checkbox>
                </v-flex>
              </v-layout>
            </v-form>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
  هیچ برنامه‌ی سفری وجود ندارد. با فشردن دکمه‌ی «+» یکی ایجاد کنید.
</v-flex>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      dialog: false,
      path: [],
      dateMenu: null,
      date: null,
      timeMenu: null,
      time: null,
      repeatPattern: null,
      isDriver: false
    }
  },
  methods: {
    edit () {

    },
    remove (index) {

    },
    add () {
      this.dialog = true
    },
    async savePlan () {
      if (this.$refs.form.validate()) {
        const { data } = await axios.post('http://localhost:5000/plan/add', {
          username: this.$store.state.id,
          path: this.path,
          date: this.date,
          time: this.time,
          repeatPattern: this.repeatPattern,
          isDriver: this.isDriver
        })

        if (data.isSuccessful) {
          this.dialog = false
          
          this.$store.commit('addPlan', {
            path: this.path,
            date: this.date,
            time: this.time,
            repeatPattern: this.repeatPattern,
            isDriver: this.isDriver
          })
        }
      }
    }
  }
}
</script>
