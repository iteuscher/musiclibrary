<template>
	<div class="container d-flex flex-wrap">
		<div class="card" v-for="album in albums" :key="album.id">
			<img class="card-img-top" :src="'/images/' + album.image" />
			<div class="card-body">
				<h5 class="card-title">{{ album.title }}</h5>
				<h6 class="card-subtitle mb-2 text-muted">{{ album.artist }}</h6>
				<h6 class="card-subtitle mb-2 text-muted">{{ album.year }}</h6>
				<h6 class="card-subtitle mb-2 text-muted">{{ album.genre }}</h6>
				<button @click="removeFromLibrary(album)" class="btn btn-danger">
					Remove from Library
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LibraryList',
	props: {
		albums: Array,
	},
	methods: {
		removeFromLibrary(album) {
			const index = this.$root.$data.library.indexOf(album);
			this.$root.$data.library.splice(index, 1);
		},
	},
};
</script>

<style scoped>
img {
	width: 100%;
}

.container {
	justify-content: center;
}

.card {
	width: 200px;
	margin: 1em;
}
</style>
