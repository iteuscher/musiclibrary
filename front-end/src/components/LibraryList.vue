<template>
	<div class="container d-flex flex-wrap">
		<div class="card" v-for="record in records" :key="record.id">
			<img class="card-img-top" :src="'/images/' + record.image" />
			<div class="card-body">
				<h5 class="card-title">{{ record.title }}</h5>
				<h6 class="card-subtitle mb-2 text-muted">{{ record.artist }}</h6>
				<h6 class="card-subtitle mb-2 text-muted">{{ record.year }}</h6>
				<h6 class="card-subtitle mb-2 text-muted">{{ record.genre }}</h6>
				<button @click="removeFromLibrary(record)" class="btn btn-danger">
					Remove from Library
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'LibraryList',
	props: {
		records: Array,
	},
	methods: {
		async removeFromLibrary(record) {
			try {
				await axios.put('/api/records/' + record._id, {
					title: record.title,
					artist: record.artist,
					year: record.year,
					genre: record.genre,
					image: record.image,
					inLibrary: false,
				});
				this.$parent.getRecords();
				return true;
			} catch (error) {
				console.error(error);
			}
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
