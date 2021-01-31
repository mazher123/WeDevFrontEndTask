<template>
  <div class="container">
    <ProductInformation />
  </div>
</template>

<script>
import ProductInformation from "@/components/CreateProduct";

export default {
  name: "home",
  components: {
    ProductInformation,
  },
  data() {
    return {
      data: "cvxcv",
    };
  },
  methiods: {
    toggleFavouriteStatus(value) {
      console.log(value);
    },
  },
};
</script>
