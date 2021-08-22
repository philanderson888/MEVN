<template>
  <div>
    <ListComponent msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ListComponent from '@/components/ListComponent.vue'; // @ is an alias to /src

@Options({
  components: {
    ListComponent,
  },
})
export default class Home extends Vue {}
</script>
