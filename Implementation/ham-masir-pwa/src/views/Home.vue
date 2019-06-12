<template>
<v-layout row wrap>
  <v-flex xs12>
    <template v-if="$store.state.tab === 'tab-0'">
      <template v-for="(r, i) in $store.state.requests">
        <v-list two-line>
          <v-list-tile v-for="(r, i) in $store.state.requests" :key="i">
            <v-list-tile-content>
              <v-list-tile-title>title</v-list-tile-title>
              <v-list-tile-sub-title>subTitle</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </template>
    </template>
    <template v-if="$store.state.tab === 'tab-1'">
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title style="font-size: 1.5rem;">ارسال درخواست</v-card-title>
            <v-card-text>
              آیا از ارسال درخواست خود اطمینان دارید؟
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" outline flat @click.native="sendRequest">تأیید</v-btn>
              <v-btn color="error" flat @click.native="dialog = false">انصراف</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      <template v-for="(s, i) in $store.state.suggestions">
        <v-flex xs12 sm6 md4 :key="j" v-for="(ss, j) in s">
          <v-card color="white" :key="i + j">
            <v-card-title primary-title d-flex justify-space-between>
              <v-flex xs6>
                <v-flex xs12 :style="{ color: $vuetify.theme.primary }">
                  <span style="font-size: 1.5rem;">{{ ss.username.firstName + ' ' + ss.username.lastName }}</span>
                </v-flex>
                <v-flex xs12 style="color: gray;">
                  {{ ss.username.username }}@
                </v-flex>
              </v-flex>
              <v-flex xs6 text-xs-center>
                <v-rating
                  dir="ltr"
                  readonly
                  :value="(ss.username.rating.driving + ss.username.rating.personality) > 0 ? (ss.username.rating.driving + ss.username.rating.personality) : 5"
                  background-color="grey"
                  :color="(ss.username.rating.driving + ss.username.rating.personality) > 0 ? 'warning' : 'grey'"
                  dense
                  half-increments
                  size="18"
                ></v-rating>
              </v-flex>
            </v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs6>
                  تاریخ: <span dir="ltr">{{ (new Date(ss.date)).toLocaleDateString('fa-IR') }}</span>
                </v-flex>
                <v-flex xs6>
                  ساعت: {{ ss.time }}
                </v-flex>
                <v-flex xs6>
                  نوع: {{ ss.isDriver ? 'راننده' : 'مسافر' }}
                </v-flex>
                <v-flex xs6>
                  تکرار: {{ ss.repeatPattern }}
                </v-flex>
              </v-layout>
              <v-flex xs12 pt-3>
                مسیر حرکت:
              </v-flex>
              <v-flex xs12>
                <v-chip :key="k" v-for="(p, k) in ss.path">
                  {{ p }}
                </v-chip>
              </v-flex>
            </v-card-text>
            <v-card-actions>
              <v-btn
                flat
                @click="dialog = true"
                color="info"
              >
                ارسال درخواست
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </template>
    </template>
  </v-flex>
</v-layout>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false
      }
    },
    methods: {
      async sendRequest () {
        this.dialog = false
      }
    }
  }
</script>
