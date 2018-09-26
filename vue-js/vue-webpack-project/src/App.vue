<template>
  <div>
    <h1>{{title}}</h1>
    <server-statuses>
      <h4 slot='header'>Inserting Slot from Parent</h4>
      <!-- <h6 slot='sub-header'>SUB_HEADER</h6> -->
      <p slot='paragraph'>SLOT</p>
    </server-statuses>
    
  </div>
</template>

<script>
export default { // behaves like a vue instance, basically an instance being exported
  data: function() {
    return{
      title: "Title",
    }
  },
  methods: {
    
  },
  template: '<p>Paragraph</p>'
}
</script>
