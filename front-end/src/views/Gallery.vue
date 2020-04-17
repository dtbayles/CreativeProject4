<template>
  <div class="gallery">
    <h1 class="my-5">Bayles Art Gallery</h1>


    <div class="container">

      <!--
      <div class="row justify-content-center">


        <div class="col-sm card" style="width: 18rem;" v-for="photo in photos" :key="photo.id">
          <div class="card mx-auto mb-4 bg-dark text-white">

            <img class="card-img-top" :src="photo.path" :alt="photo.title">
            <div class="card-body">
              <h5 class="card-title">{{photo.title}}</h5>
              <p class="card-text">{{photo.description}}</p>
              <p class="card-text">{{photo.location}}</p>
              <p class="card-text">${{photo.price}}</p>
      -->        <!-- <a class="btn btn-primary">Add to Cart</a> -->
       <!--       <button class="btn btn-primary" @click='addItemToCart(photo)'>Add to cart</button>
            </div>
          </div>

        </div>
-->
          <!-- <h2>{{photo.title}}</h2> -->
          <!-- <img class="img-fluid" :src="photo.path" /> -->
          <!-- <p>{{photo.description}} | {{photo.location}} | ${{photo.price}}</p> -->
      <!-- </div> -->

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

                <button @click="addItemToCart(photo)" class="btn btn-info mt-5"><a>Add to Cart</a></button>

          </div>
        </div>

      </div>
    </div>



    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Gallery",
  components: {
    
  },
  data() {
  	return {
  		photos: [],
  	}
  },
  created() {
  	this.getGallery();
  },
  methods: {
  	async getGallery() {
  		try {
	        this.response = await axios.get("/api/gallery");
	        this.photos = this.response.data;
	        return true;
  		} catch (error) {
  			console.log(error);
  		}
  	},
    async addItemToCart(photo) {
      this.$root.$data.cart.push(photo);
      /*
      try {
        //console.log(photo._id);
        //const formData = new FormData();
        //formData.append('id', photo._id);
        await axios.post('/api/cart', {id: photo._id});
      } catch (error) {
        console.log(error);
      } */
    }
  }
};
</script>
