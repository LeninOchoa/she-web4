<template>
  <v-card>
    <v-navigation-drawer
      ref="drawer"
      v-model="drawerR"
      app
      clipped
      permanent
      :mini-variant.sync="mini"
      right
      bottom
      width="30%"
    >
      <v-row class="fill-height" no-gutters>
        <v-col md="auto">
          <v-navigation-drawer mini-variant mini-variant-width="60" permanent>
            <v-list-item class="px-2 py-2">
              <v-btn v-if="!mini" icon @click.stop="mini = !mini">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
              <v-btn v-else icon @click.stop="mini = !mini">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
              <v-list-item v-for="item in items" :key="item.title">
                <v-btn icon @click="tabsEvent(item)">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-btn>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-col>
        <v-col v-show="!mini" style="max-width: 100%">
          <Infos v-show="info"></Infos>
          <Archiv v-show="!info"></Archiv>
        </v-col>
      </v-row>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  props: {
    drawerR: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    drawer: true,
    items: [
      { title: 'Information', icon: 'mdi-information-outline' },
      { title: 'Archiv', icon: 'mdi-archive' },
    ],
    mini: true,
    info: true,
    navigation: {
      width: 365,
      borderSize: 1,
    },
  }),
  mounted() {
    this.setBorderWidth()
    this.setEvents()
  },
  methods: {
    setBorderWidth() {
      const i = this.$refs.drawer.$el.querySelector(
        '.v-navigation-drawer__border'
      )
      i.style.width = this.navigation.borderSize + 'px'
      i.style.cursor = 'ew-resize'
      i.style.backgroundColor = 'blue'
    },
    setEvents() {
      const minSize = this.navigation.borderSize
      const el = this.$refs.drawer.$el
      const drawerBorder = el.querySelector('.v-navigation-drawer__border')
      const direction = el.classList.contains('v-navigation-drawer--right')
        ? 'right'
        : 'left'

      function resize(e) {
        document.body.style.cursor = 'ew-resize'
        const f =
          direction === 'right'
            ? document.body.scrollWidth - e.clientX
            : e.clientX
        el.style.width = f + 'px'
      }

      drawerBorder.addEventListener(
        'mousedown',
        (e) => {
          if (e.offsetX < minSize) {
            el.style.transition = 'initial'
            document.addEventListener('mousemove', resize, false)
          }
        },
        false
      )

      document.addEventListener(
        'mouseup',
        () => {
          el.style.transition = ''
          this.navigation.width = el.style.width
          document.body.style.cursor = ''
          document.removeEventListener('mousemove', resize, false)
        },
        false
      )
    },
    tabsEvent(item) {
      this.info = item.title === 'Information'
    },
  },
}
</script>
