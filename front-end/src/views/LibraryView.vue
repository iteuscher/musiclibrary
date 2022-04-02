<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col">
				<h1>Your Music Library</h1>
			</div>
		</div>
		<div class="row">
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
		</div>
	</div>
</template>

<style scoped>
h1 {
	margin: 0.5em;
}

input {
	margin: 1em;
}

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

.form-control {
	width: 70%;
}
</style>

<script>
import axios from 'axios';

export default {
	name: 'LibraryView',

	data() {
		return {
			records: [],
		};
	},

	created() {
		this.getRecords();
	},

	methods: {
		async getRecords() {
			try {
				let response = await axios.get('/api/records/library');
				this.records = response.data;
				return true;
			} catch (error) {
				console.error(error);
			}
		},

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

				const index = this.records.indexOf(record);
				this.records.splice(index, 1);

				return true;
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>
