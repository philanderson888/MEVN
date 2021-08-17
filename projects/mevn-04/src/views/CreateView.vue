<template>
  <div>
    <CreateComponent msg="Create Student"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CreateComponent from '@/components/CreateComponent.vue'; // @ is an alias to /src

@Options({
  components: {
    CreateComponent,
  },
})
export default class CreateView extends Vue {}
</script>