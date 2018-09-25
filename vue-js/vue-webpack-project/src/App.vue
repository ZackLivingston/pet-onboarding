<template>
  <div>
    <h1>{{title}}</h1>
    <server-statuses></server-statuses>
    
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
