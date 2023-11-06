<template>
  
</template>

<script>
export default {
  setup() {
    const tasks = ref([]);
    const q = query(collection(db, 'tasks'), where('userid', '==', uid))
      const unsub = onSnapshot(q,(snap)=>{
          const results= [];
          snap.forEach((doc)=>{
              results.push({ ...doc.data(), id: doc.id })
          })
          tasks.value=results
      })
      return{tasks}
  }
}
</script>

<style>

</style>