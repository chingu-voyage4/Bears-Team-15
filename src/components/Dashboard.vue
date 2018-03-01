<template>
<div>
  <h1>{{ greeting }}</h1>
  <div class="dashboard">
    <div class="spacer"></div>
    <div>
      <router-link :to="{ name: 'collection' }">
        <div class="lesson">
          <h3>{{ collection[0].name }}</h3>
        </div>
      </router-link>
    </div>
    <div class="spacer"></div>
  </div>
</div>
</template>

<script>
export default {
  name: "Dashboard",
  data: () => ({
    label: "Dashboard",
    greeting: 'Welcome to Bears-15 Cards!',
    collection: [
      { name: "Collection 1" },
      { name: "Collection 2" },
      { name: "Collection 3" }
    ]
  })
}
</script>
