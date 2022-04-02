<template>
	<div class="manage container-fluid">
		<div class="row">
			<div class="col">
				<h1>Manage</h1>
			</div>
		</div>
		<div class="row .manage-page-row">
			<div class="col-md">
				<h2>Upload a Record</h2>
				<input v-model="title" placeholder="Title" />
				<input v-model="artist" placeholder="Artist" />
				<input v-model="year" placeholder="Year" />
				<input v-model="genre" placeholder="Genre" />
				<input type="file" name="photo" @change="fileChanged" />
				<button @click="upload">Upload</button>
			</div>
			<div class="col-md">
				<!-- <div class="upload" v-if="addItem">
					<h2>{{ addItem.title }}</h2>
					<img :src="addItem.path" />
				</div> -->
			</div>
		</div>

		<div class="row .manage-page-row">
			<div class="col-md">
				<h2>Edit a Record</h2>
				<input v-model="searchText" placeholder="Search" />

				<!-- <div class="suggestedRecord" v-for="record in filteredRecords" :key="record.id">
					<p>{{ record.title }}</p>
					<p>{{ record.artist }}</p>
				</div> -->

				<div class="suggestions" v-if="suggestions.length > 0">
					<div
						class="suggestion"
						v-for="s in suggestions"
						:key="s.id"
						@click="selectItem(s)"
					>
						{{ s.title }} {{ s.artist }}
					</div>
				</div>

				<!--  <div class="actions" v-if="findItem">
					<button @click="deleteItem(findItem)">Delete</button>
					<button @click="editItem(findItem)">Edit</button>
				</div> -->
			</div>
		</div>
	</div>
</template>

<style scoped>
h1 {
	margin: 0.5em;
}

.manage-page-row {
	margin: 1em 0;
}
</style>

<script>
import axios from 'axios';

export default {
	name: 'ManageView',

	data() {
		return {
			title: '',
			artist: '',
			year: '',
			genre: '',
			file: null,
			addRecord: null,
			records: [],
			findTitle: '',
			findRecord: '',
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
				console.error(error.response.data);
			}
		},

		selectRecord(record) {
			this.findRecord = record;
			this.findTitle = '';
		},

		async editRecord(record) {
			try {
				await axios.put('/api/records' + record._id, {
					title: this.findRecord.title,
					artist: this.findRecord.artist,
					year: this.findRecord.year,
					genre: this.findRecord.genre,
				});

				this.findRecord = null;
				this.getRecords();
				return true;
			} catch (error) {
				console.error(error);
			}
		},

		fileChanged(event) {
			this.file = event.target.files[0];
		},

		async upload() {
			try {
				const formData = new FormData();
				formData.append('image', this.file, this.file.name);

				let imageUploadResponse = await axios.post('/api/images', formData);
				console.log('image upload response path is : ' + imageUploadResponse);
				let addRecordResponse = await axios.post('/api/records', {
					title: this.title,
					artist: this.artist,
					year: this.year,
					genre: this.genre,
					image: imageUploadResponse.data.path,
				});

				this.addRecord = addRecordResponse.data;
			} catch (error) {
				console.error(error);
			}
		},
	},

	computed: {
		suggestions() {
			let records = this.records.filter((record) =>
				record.title.toLowerCase().startsWith(this.findTitle.toLowerCase())
			);
			return records.sort((a, b) => a.title > b.title);
		},
	},
};
</script>
