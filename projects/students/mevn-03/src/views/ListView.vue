<template>
  <div>
    <ListComponent msg="This page lists database items"/>
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