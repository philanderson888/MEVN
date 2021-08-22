<template>
  <div>
    <ListComponent2 msg="Students"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ListComponent2 from '@/components/ListComponent2.vue'; 

@Options({
  components: {
    ListComponent2,
  },
})
export default class ListView extends Vue {}
</script>