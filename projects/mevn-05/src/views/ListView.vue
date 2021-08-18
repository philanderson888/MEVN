<template>
  <div>
    <ListComponent msg="Students"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ListComponent from '@/components/ListComponent.vue'; 

@Options({
  components: {
    ListComponent,
  },
})
export default class ListView extends Vue {}
</script>