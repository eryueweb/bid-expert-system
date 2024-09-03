export default [
  function storagePlugin(store) {
    store.subscribe((mutation, state) => {
      console.log('mutation, state:',mutation, state);
    })
  }
]