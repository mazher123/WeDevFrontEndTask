<template>
  <div class="container-fluid">
    <div class="col">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, i) in products" :key="i">
            <td>
              {{ product.id }}
            </td>
            <td>
              {{ product.title }}
            </td>
            <td>
              {{ product.description }}
            </td>
            <td></td>

            <td>
              <button
                class="btn btn-danger"
                v-on:Click="deleteData(product.id)"
              >
                Delete
              </button>
              <button class="btn btn-info" v-on:Click="editData(product)">
                edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="modal fade"
      id="product"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLabel">Edit Product</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form v-on:submit.prevent="editContent">
            <div class="modal-body">
              <div class="row">
                <!-- main product -->
                <div class="col-md-8">
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Product Name"
                      v-model="productItem.title"
                      name="title"
                      class="form-control"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <textarea
                      class="form-control"
                      v-model="productItem.description"
                      name="description"
                      required
                    >
                    </textarea>
                  </div>
                  <div class="form-group">
                    <input
                      type="number"
                      placeholder="Product Name"
                      v-model="productItem.price"
                      name="price"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <div class="form-group">
                      <label for="product_image">Product Images</label>
                      <input type="file" name="image" class="form-control" />
                    </div>
                  </div>
                </div>
                <!-- product sidebar -->
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit">Save changes</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  props: ["products"],

  data() {
    return {
      productItem: {},
    };
  },

  methods: {
    editContent() {
      let token = localStorage.getItem("token");

      let formdata = new FormData();
      formdata.append("image", this.productItem.image);
      formdata.append("title", this.productItem.title);
      formdata.append("price", this.productItem.price);
      formdata.append("description", this.productItem.description);

      axios
        .put(
          "http://localhost:8000/api/product/" + this.productItem.id,
          formdata,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.$router("/home");
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Product has been saved",
            showConfirmButton: false,
            timer: 1500,
          });

          this.loadData();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    editData(product) {
      this.productItem = product;
      $("#product").modal("show");
    },
    uploadImage(e) {
      let file = e.target.files[0];
      this.productItem.image = file;
    },

    deleteData(id) {
      this.$emit("deleteData", id);
    },
  },

  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
