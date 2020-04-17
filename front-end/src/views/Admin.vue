<template>
  <div class="admin container">
    <h1>Admin Console</h1>

<!-- <div class="d-flex flex-row"> -->
  <form class="my-3" @submit.prevent="addPhoto" style="border: 1px solid black;">

      <div class="">
        <h4 class="my-3">Upload a photo to sell</h4>
        <div class="form-group">
          <label>Photo Title</label>
          <input v-model="title" class="form-control w-50 mx-auto" type="text" placeholder="">
        </div>
        <div class="form-group">
          <label>Description (to display for shoppers)</label>
          <input v-model="description" class="form-control w-75 mx-auto" type="text" placeholder="">
        </div>
        <div class="form-group">
          <label>Location the photo was taken</label>
          <input v-model="location" class="form-control w-25 mx-auto" type="text" placeholder="">
        </div>
        <div class="form-group">
          <label>Price</label>
          <input v-model="price" class="form-control w-25 mx-auto" type="text" placeholder="">
        </div>
        <div class="form-group my-2">
          <!-- <label for="exampleFormControlFile1">Example file input</label> -->
          <input type="file" class="form-control-file ml-5" @change="fileChanged">
          <button type="submit"  class="btn btn-success">Submit</button>
        </div>
      </div>

  </form>

<!-- <div class=""> -->
  <form class="my-3" style="border: 1px solid black;" v-if="suggestions.length > 0">

    <h4 class="my-3">Edit a current listing</h4>


    <div class="form-group">
      <label>Search</label>
      <!-- <input v-model="title" class="form-control" type="text" placeholder="Title"> -->
      <!-- <input v-model="findTitle" class="form-control w-25 mx-auto" type="text" placeholder=""> -->
      <div class="w-25 mx-auto">
        <!-- <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)"> -->

        <select v-model="value" class="selectpickerr mr-3" data-live-search="true">
          <option :value="null">Select a ...</option>
          <option v-for="s in suggestions" :key="s.id" :value="s">{{s.title}}</option>
          
        </select>
        <button @click.prevent="selectItem(value)">Find</button>


          <!-- {{s.title}} -->
        <!-- </div> -->
      </div>
    </div>
  <div v-if="findPhoto">
    <div class="form-group">
      <label>Photo Title</label>
      <input v-model="findPhoto.title" class="form-control w-50 mx-auto" type="text" placeholder="">
    </div>
    <div class="form-group">
      <label>Description (to display for shoppers)</label>
      <input v-model="findPhoto.description" class="form-control w-75 mx-auto" type="text" placeholder="">
    </div>
    <div class="form-group">
      <label>Location the photo was taken</label>
      <input v-model="findPhoto.location" class="form-control w-25 mx-auto" type="text" placeholder="">
    </div>
    <div class="form-group">
      <label>Price</label>
      <input v-model="findPhoto.price" class="form-control w-25 mx-auto" type="text" placeholder="">
    </div>
    <div class="form-group my-2">
      <!-- <label for="exampleFormControlFile1">Example file input</label> -->
      <!-- <input type="file" class="form-control-file" @change="fileChanged"> -->
      <button @click.prevent="editItem(findPhoto)" class="btn btn-primary mr-3">Edit</button>
      <button @click.prevent="deleteItem(findPhoto)" class="btn btn-danger ml-3">Delete</button>
    </div>
    <img class="img-fluid" :src="findPhoto.path">
  </div>



  </form>
<!-- </div> -->


<!--
    <div class="container suggestions" v-if="findPhoto">
      <input v-model="findPhoto.title">
      <textarea v-model="findPhoto.description"></textarea>
      <input v-model="findPhoto.location">
      <input v-model="findPhoto.price">
      <p></p>
      <img class="img-fluid" :src="findPhoto.path" />
    </div>
    <div class="" v-if="findPhoto">
      <button @click="deleteItem(findPhoto)">Delete</button>
      <button @click="editItem(findPhoto)">Edit</button>
    </div>
-->
<!-- </div> -->







  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Admin",
  props: {
    value: null,
  },
  data() {
  	return {
  		title: "",
  		description: "",
  		location: "",
  		price: "",
  		gallery: [],
  		url: "",
  		addItem: null,
  		findTitle: '',
  		findPhoto: null,
  	}
  },
  computed: {
    suggestions() {
      //if (this.gallery.length > 0) {
      //  let photos = this.gallery.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      //  return photos.sort((a, b) => a.title > b.title);
      //}
      return this.gallery;
    }
  },
  created() {
  	this.getGallery();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
      this.url = URL.createObjectURL(this.file);
    },
  	async addPhoto() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name);
        formData.append('title', this.title);
        formData.append('description', this.description);
        formData.append('location', this.location);
        formData.append('price', this.price);
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/gallery', {
          title: this.title,
          description: this.description,
          location: this.location,
          price: this.price,
          path: r1.data.path
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
  	},
  	async getGallery() {
  		try {
	        let response = await axios.get("/api/gallery");
	        this.gallery = response.data;
	        return true;
  		} catch (error) {
  			console.log(error);
  		}
  	},
    selectItem(photo) {
      this.findTitle = "";
      this.findPhoto = photo;
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/gallery/" + item._id);
        this.findPhoto = null;
        this.getGallery();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findPhoto.title,
          description: this.findPhoto.description,
          location: this.findPhoto.location,
          price: this.findPhoto.price,
        });
        this.findPhoto = null;
        this.getGallery();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>

<style>
/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
  border: 1px solid black;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>