<template>
  <v-form
    class="searchfield animated bounceIn fast"
    color="accent"
    @submit.prevent="onSave"
    @keyup.native.enter="onSave"
  >
    <v-container>
      <v-btn
        type="submit"
        block
        class="p-2 white--text"
        color="grey lighten-1"
        dark
      >
        <v-icon left> mdi-magnify </v-icon>
        Suchen
      </v-btn>
      <v-row v-for="(element, index) in fields" :key="index" class="ml-2 mr-2">
        <v-col v-if="element.SuchfeldTyp === 0 && element.SuchfeldTyp !== 1">
          <v-text-field
            v-model="element.SearchValue"
            :label="element.Alias"
          ></v-text-field>
        </v-col>
        <v-col v-if="element.SuchfeldTyp === 1">
          <v-select
            v-model="element.SearchValue"
            :items="Object.values(element.DataSource)"
            :label="element.Alias"
            single-line
          ></v-select>
        </v-col>
        <v-col v-if="element.SuchfeldTyp === 2">
          <v-menu
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :label="element.Alias"
                append-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker no-title @input="menu1 = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col v-if="element.SuchfeldTyp === 3">
          <v-text-field :label="element.Alias"></v-text-field>
        </v-col>
        <v-col v-if="element.SuchfeldTyp === 4">
          <v-text-field :label="element.Alias"></v-text-field>
        </v-col>
        <v-col v-if="element.SuchfeldTyp === 5">
          <v-text-field :label="element.Alias"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Search',
  computed: {
    fields() {
      return JSON.parse(
        JSON.stringify(this.$store.state.viewer.selectedSearchFields)
      )
    },
  },
  methods: {
    onSave() {
      const parameter = []
      if (this.fields === null || this.fields.length === 0) return

      for (const item in this.fields) {
        const obj = this.fields[item]
        if (obj.SearchValue === null) continue

        parameter.push({
          EbeneID: obj.EbeneID,
          EbeneSpalteID: obj.EbeneSpalteID,
          SearchValue: obj.SearchValue,
        })
      }
      const searchParameter = {
        treeId: 0,
        data: parameter,
      }
      this.$emit('search', searchParameter)
    },
  },
}
</script>

<style scoped></style>
