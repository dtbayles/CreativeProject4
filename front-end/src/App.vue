<template>
  <div id="app">
    

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand">Bayles Art</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav mr-auto">
            <a class="nav-item nav-link active" href="#"><router-link to="/">Home</router-link><span class="sr-only">(current)</span></a>
            <a class="nav-item nav-link"><router-link to="/gallery">Gallery</router-link></a>
            <a class="nav-item nav-link"><router-link to="/FAQ">FAQ</router-link></a>
          </div>
          <div class="navbar-nav ml-auto">
            <a class="nav-item nav-link"><router-link to="/account">My Account</router-link></a>
            <a class="nav-item nav-link"><router-link to="/cart">Shopping Cart</router-link></a>
          </div>
        </div>
      </nav>

    

    <router-view />

  <footer class="footer">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-4">
          <span class="copyright">Copyright &copy; Rusty Bayles 2020</span>
        </div>
        <div class="col-md-4">
          <ul class="list-inline social-buttons">
            <li class="list-inline-item">
              <a href="https://twitter.com/dr_jimnaccarato">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="https://www.instagram.com/dr.jimnaccarato/">
                <i class="fab fa-instagram"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="https://www.facebook.com/dr.jimnaccarato">
                <i class="fab fa-facebook-f"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="https://www.linkedin.com/in/jim-naccarato-dc-phd/">
                <i class="fab fa-linkedin"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="mailto:drjim@rpchiro.com">
                <i class="far fa-envelope"></i>
              </a>
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <ul class="list-inline quicklinks">
            <li class="list-inline-item">
              <a href="#">GitHub Repo</a>
            </li>
            <li class="list-inline-item">
              <a href="#">Terms of Use</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>

  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  flex: 1 0 auto;
}

nav {
  margin: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

/* Footer */

.footer {
  padding: 25px 0;
  text-align: center;
}

.footer span.copyright {
  font-size: 90%;
  line-height: 40px;
  text-transform: none;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

.footer ul.quicklinks {
  font-size: 90%;
  line-height: 40px;
  margin-bottom: 0;
  text-transform: none;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

ul.social-buttons {
  margin-bottom: 0;
}

ul.social-buttons li a {
  font-size: 20px;
  line-height: 50px;
  display: block;
  width: 50px;
  height: 50px;
  transition: all 0.3s;
  color: white;
  border-radius: 100%;
  outline: none;
  background-color: #212529;
}

ul.social-buttons li a:active, ul.social-buttons li a:focus, ul.social-buttons li a:hover {
  background-color: black;
}

</style>
