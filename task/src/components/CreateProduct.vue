<template>
  <div class="container-fluid product-form-section">
    <div class="row justify-content-md-center">
      <h3 class="header">Products Information</h3>
    </div>

    <form v-on:submit.prevent="createProduct">
      <div class="row product-form">
        <div class=" col col-sm-4">
          <input
            type="text"
            placeholder="Title"
            class="form-control"
            name="title"
            v-model="title"
          />
        </div>
        <div class=" col col-sm-4">
          <input
            type="number"
            placeholder="Price"
            class="form-control"
            name="price"
            v-model="price"
          />
        </div>
        <div class=" col col-sm-4">
          <input
            type="file"
            placeholder="Image"
            class="form-control"
            name="image"
          />
        </div>
      </div>
      <div class="row  product-form">
        <div class="col">
          <textarea
            class="form-control"
            v-model="description"
            name="description"
            placeholder="Add product Description"
          >
          </textarea>
        </div>
      </div>

      <div class="row  product-form">
        <div class="col col-sm-12">
          <input type="submit" class="fadeIn fourth" value="Create" />
        </div>
      </div>
    </form>

    <ProductData v-bind:products="products"  v-on:deleteData="deleteDatas"></ProductData>
  </div>
</template>

<script>
import axios from "axios";
import ProductData from "./ProductData";

export default {
  name: "createProduct",
  components: {
    ProductData,
  },
  data() {
    return {
      title: "",
      description: "",
      price: "",
      image: "",

      products:{}
    };
  },

    mounted(){
        this.loadData()

    },
  methods: {

      deleteDatas(id){
           let token = localStorage.getItem("token");
          axios
            .delete("http://localhost:8000/api/product/" + id, {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            })
            .then((response) => {
            this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Product Deleted Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
               this.loadData();
            })
            .catch((e) => {});

      },

     loadData(){
        let token = localStorage.getItem("token");
          axios
            .get("http://localhost:8000/api/product", {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            })
            .then((response) => {
             
              this.products = response.data.data;
            })
            .catch((e) => {});

             console.log( this.products);
     } ,
    createProduct() {
      let token = localStorage.getItem("token");

      let formdata = new FormData();
      formdata.append("image", this.image);
      formdata.append("title", this.title);
      formdata.append("price", this.price);
      formdata.append("description", this.description);

      axios
        .post("http://localhost:8000/api/product", formdata, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          console.log(response);

          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Product has been saved",
            showConfirmButton: false,
            timer: 1500,
          });

          this.title = "";
          this.description = "";
          this.price = "";
          this.image = "";

          this.loadData();

     
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  margin-top: 30px;
  color: brown;
  font-family: nunito;
  font-size: 40px;
  text-align: center;
}
.product-form {
  margin: 20px;
}
.product-form-section {
  margin-top: 50px;
}
input[type="button"],
input[type="submit"],
input[type="reset"] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type="button"]:hover,
input[type="submit"]:hover,
input[type="reset"]:hover {
  background-color: #39ace7;
}

input[type="button"]:active,
input[type="submit"]:active,
input[type="reset"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}
</style>
