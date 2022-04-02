<template>
	<div id="app">
		<nav class="navbar navbar-expand-sm navbar-light bg-light">
			<router-link to="/" class="navbar-brand">Music Browser</router-link>
			<ul class="navbar-nav">
				<li class="nav-item">
					<router-link to="/" class="nav-link">Browse</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/library" class="nav-link">Library</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/manage" class="nav-link">Manage</router-link>
				</li>
			</ul>
		</nav>
		<router-view />
		<div class="footer container-fluid bg-light">
			<div class="row">
				<div class="col-sm">
					<a href="https://github.com/iteuscher/musiclibrary"
						><i class="fab fa-github"></i
					></a>
					<p>&copy; 2022 Isaac Teuscher &amp; Jared Canizales</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.bg-light {
	background-color: #cfcfcf !important;
}

.fab {
	font-size: 2em;
	margin: 0.25em;
	color: black;
}
</style>

<script>
export default {
	name: 'App',
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

nav {
	padding: 30px;
}

nav a {
	font-weight: bold;
	color: #2c3e50;
}

nav a.router-link-exact-active {
	color: #42b983;
}
</style>
