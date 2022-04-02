<template>
	<div class="container-fluid">
		<div class="row justify-content-center">
			<input
				type="text"
				class="form-control"
				placeholder="Search"
				v-model="searchText"
			/>
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
						<button
							@click="addToLibrary(record)"
							type="button"
							:disabled="record.inLibrary"
							class="btn btn-success"
						>
							Add to Library
						</button>
						<button
							@click="deleteRecord(record)"
							type="button"
							class="btn btn-danger"
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
input {
	margin: 1em;
}

img {
	width: 100%;
}

.btn-danger {
	margin-top: 0.5em;
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
	name: 'BrowseView',

	data() {
		return {
			records: [],
			searchText: '',
		};
	},

	created() {
		this.getRecords();
	},

	methods: {
		async getRecords() {
			try {
				let response = await axios.get('/api/records');
				this.records = response.data;
				return true;
			} catch (error) {
				console.error(error);
			}
		},

		async addToLibrary(record) {
			try {
				await axios.put('/api/records/' + record._id, {
					title: record.title,
					artist: record.artist,
					year: record.year,
					genre: record.genre,
					image: record.image,
					inLibrary: true,
				});

				const index = this.records.indexOf(record);
				this.records[index].inLibrary = true;

				return true;
			} catch (error) {
				console.error(error);
			}
		},

		async deleteRecord(record) {
			try {
				await axios.delete('/api/records/' + record._id);

				const index = this.records.indexOf(record);
				this.records.splice(index, 1);

				return true;
			} catch (error) {
				console.error(error);
			}
		},
	},
	computed: {
		filteredRecords() {
			return this.records.filter((record) => {
				const lowercaseSearchText = this.searchText.toLowerCase();
				return (
					record.title.toLowerCase().search(lowercaseSearchText) >= 0 ||
					record.artist.toLowerCase().search(lowercaseSearchText) >= 0 ||
					record.year.toLowerCase().search(lowercaseSearchText) >= 0 ||
					record.genre.toLowerCase().search(lowercaseSearchText) >= 0
				);
			});
		},
	},
};
</script>
