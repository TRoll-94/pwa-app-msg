<template>
  <q-avatar :size="size" :color="avatarColor.color" :text-color="avatarColor.text">
    {{ defaultTitle }}
  </q-avatar>
</template>

<script>


const namesCounterMap = {
  "1": ["A", "С", "Э", "М", "K", "T", "Х", 1, "1"],
  "2": ["Ж", "L", "N", "Б", "В", "Ф", "Ш", 2, "2"],
  "3": ["Ю", "R", "H", "О", "Й", "P", "ь", 3, "3"],
  "4": ["S", "З", "К", "Р", "B", "Y", "Н", 4, "4"],
  "5": ["J", "G", "П", "I", "И", "Z", "Q", 5, "5"],
  "6": ["U", "Я", "V", "D", "Ц", "W", "Ы", 6, "6"],
  "7": ["E", "O", "А", "Е", "C", "Ъ", "У", 7, "7"],
  "8": ["Д", "F", "Т", "X", "Л", "Ё", "Ч", 8, "8"],
  "9": ["Г", "M", "Щ", 9, "9"],
}


const colors = [
  {color: 'blue-11', text: 'white'},
  {color: 'light-blue-11', text: 'white'},
  {color: 'cyan-2', text: 'white'},
  {color: 'teal-4', text: 'white'},
  {color: 'green-3', text: 'white'},
  {color: 'light-green-4', text: 'white'},
  {color: 'blue-grey-4', text: 'white'},
]

export default {
  name: "avatarComponent",
  props: {
    size: {
      type: String,
      default: "lg"
    },
    light: {
      type: Boolean,
      default: false
    },
    // code - JK
    code: {
      type: String,
      default: '',
    },
    // text Jan Kovalsky
    text: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      index: 0,
    }
  },
  computed: {
    avatarColor() {
      const index = this.countIndex || 1
      const colorsLength = colors.length
      const normalizedIndex = ((index % colorsLength) + colorsLength) % colorsLength
      return colors[normalizedIndex]
    },
    defaultTitle() {
      if (this.code) return this.code.toUpperCase()
      if (this.text) {
        let words = this.text.split(" ");
        if (words.length === 1) {
          return words[0].charAt(0).toUpperCase();
        } else if (words.length > 1) {
          words = [words[0], words[words.length - 1]];
        } else {
          return '00'
        }
        const initials = words.map(word => word.charAt(0));
        return initials.join("").toUpperCase();
      }
      return '00'
    },
    countIndex() {
      const code = this.defaultTitle
      if (!code) return
      let innerIndex = 0
      for (let x in code) {
        switch (true) {
          case namesCounterMap[1].includes(code[x]):
            innerIndex += 1
            break
          case namesCounterMap[2].includes(code[x]):
            innerIndex += 2
            break
          case namesCounterMap[3].includes(code[x]):
            innerIndex += 3
            break
          case namesCounterMap[4].includes(code[x]):
            innerIndex += 4
            break
          case namesCounterMap[5].includes(code[x]):
            innerIndex += 5
            break
          case namesCounterMap[6].includes(code[x]):
            innerIndex += 6
            break
          case namesCounterMap[7].includes(code[x]):
            innerIndex += 7
            break
          case namesCounterMap[8].includes(code[x]):
            innerIndex += 8
            break
          case namesCounterMap[9].includes(code[x]):
            innerIndex += 9
            break
        }
      }
      return innerIndex
    },
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
