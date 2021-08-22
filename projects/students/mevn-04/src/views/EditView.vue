<template>
  <div>
    <EditComponent />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import EditComponent from '@/components/EditComponent.vue'; 

@Options({
  components: {
    EditComponent,
  },
})
export default class EditView extends Vue {}
</script>