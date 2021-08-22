<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h1>{{ msg }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    msg: String
  }
})
export default class ListComponent extends Vue {
  msg!: string;
  data() {
    return {
      
    }
  }
}
</script>