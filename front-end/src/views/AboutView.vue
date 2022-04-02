<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col">
				<h1>About</h1>
			</div>
		</div>
		<div class="row about-row">
			<div class="col-md">
				<img class="img-fluid" src="/images/jared.jpg" />
			</div>
			<div class="col-md">
				<p>
					The Music Browser web app was developed by Utah-based programmer music
					enthusiast Jared Canizales. He loves all things pertaining to drums,
					jazz, music in general, and technology.
				</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
h1 {
	margin: 0.5em;
}

.about-row {
	margin: 1em 0;
}
</style>

<script>
export default {
	name: 'AboutView',
};
</script>
