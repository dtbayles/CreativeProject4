<template>
  <div class="cart">
    <!-- <h1>This is the shopping cart page</h1> -->
	  <section v-if="photos.length > 0" class="container">

    <div v-if="photos.length > 0" class="row justify-content-center">
      <div class="player col-sm-4" v-for="photo in photos" :key="photo.id">

        <div class="card mx-auto mb-4 bg-dark text-white">
          <img class="card-img-top" :src="photo.path" :alt="photo.title">
          <div class="card-body text-left">
            <h5 class="card-title text-center">{{photo.title}}</h5>

              <!-- <div class="row text-left"> -->
                <!-- <div class="col"> -->
                  <p class="card-text">{{photo.description}}</p>
                  <p class="card-text">Location: {{photo.location}}</p>
                  <p class="card-text">Price: ${{photo.price}}</p>
                  <!-- <p class="card-text">Age:</p> -->
                <!-- </div> -->
                
                <!-- <div class="col"> -->
                <!-- <p class="card-text">FG%: </p> -->
                <!-- <p class="card-text">FT%: </p> -->
                <!-- <p class="card-text">Str: </p> -->
                <!-- <p class="card-text">Spd: </p> -->
                <!-- </div> -->
              <!-- </div> -->

                <button @click="removeFromCart(photo)" class="btn btn-warning mt-5"><a>Remove</a></button>

          </div>
        </div>

      </div>
    </div>
<h1 class="text-right">Grand Total: ${{totalPrice}}</h1>
	  </section>

	  <section v-else class="my-5">
	  	<h1>Shopping cart empty, please continue shopping!</h1>
	  </section>
  </div>
</template>

<script>
//import axios from 'axios';
export default {
  name: "Cart",
  components: {
    
  },
  data() {
  	return {
  		photos: [],
      totalPrice: Number,
  	}
  },
  created() {
  	this.getCart()
  },
  methods: {
  	getCart() {
      this.photos = this.$root.$data.cart;
      let sum = this.photos.reduce(function(a, b){
        return a + b.price;
      }, 0);
      this.totalPrice = sum;
      /*
  		try {
	        let response = await axios.get("/api/cart");
	        this.photos = response.data[0].cart;
          //console.log(response.data);
	        return true;
  		} catch(error) {
  			console.log(error);
  		} */
  	},
    removeFromCart(photo) {
      var index = this.$root.$data.cart.map(x => {
        return x._id;
      }).indexOf(photo._id);
      console.log(index);
      if (index !== -1) {
        this.$root.$data.cart.splice(index, 1);
      }
      this.getCart();
      /*
      try {
        //console.log(photo._id);
        await axios.delete("api/cart/" + photo._id)
        this.getCart();
        return true;
      } catch (error) {
        console.log(error);
      } */
    } 
  },
  computed: {
  	cart() {
  		return this.$root.$data.cart;
  	},
  }
};
</script>
