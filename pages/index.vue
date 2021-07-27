<template> </template>

<script>
export default {
  layout: "AuthLayout",
  middleware({ store, redirect }) {
    // If the user is not authenticated

    return redirect("/dashboard");
  }
};
</script>
