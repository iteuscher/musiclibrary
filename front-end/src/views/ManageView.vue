<template>
	<div class="manage container-fluid">
		<div class="row">
			<div class="col">
				<h1>Manage</h1>
			</div>
		</div>
		<div class="row .manage-page-row">
			<div class="col-md upload">
				<h2>Upload a Record</h2>
				<div><input v-model="title" placeholder="Title" /></div>
				<div><input v-model="artist" placeholder="Artist" /></div>
				<div><input v-model="year" placeholder="Year" /></div>
				<div><input v-model="genre" placeholder="Genre" /></div>
				<div id="fileUpload"><input type="file" name="photo" @change="fileChanged" /></div>
				<button id="uploadButton" type="button" class="btn" @click="upload"> Upload {{title}} </button>
			</div>
			<div class="col-md">
				<div class="upload" v-if="addRecord">
					<h2>{{ addRecord.title }}</h2>
					<p>{{ addRecord.artist }}</p>
					<img :src="addRecord.image" />
				</div>
			</div>
		</div>


		<div class="row .manage-page-row" id="editRecordRow">
			<div class="col-md">
				<h2>Edit/Delete a Record</h2>
				<input v-model="findTitle" placeholder="Search" />

				<div class="suggestions" v-if="suggestions.length > 0 && suggestions.length != records.length">
					<div
						class="suggestion"
						v-for="s in suggestions"
						:key="s.id"
						@click="selectRecord(s)"
					>
					<span v-if="s == findRecord" class="emphasize"> {{ s.title }} by {{ s.artist }} </span>
					<span v-else> {{ s.title }} by {{ s.artist }} </span>
					</div>
				</div>

				<div v-if=" findRecord " class="upload" id="editForm">
					<div><input v-model="findRecord.title" placeholder='' /></div>
					<div><input v-model="findRecord.artist" placeholder="Artist" /></div>
					<div><input v-model="findRecord.year" placeholder="Year" /></div>
					<div><input v-model="findRecord.genre" placeholder="Genre" /></div>

					<div class="actions" >
							<button @click="editRecord(findRecord)" type="button" class="btn btn-warning" > Save Edits</button>
					</div>
				</div>

			</div>
			<div class="col-md editWindow">
				<div v-if="findRecord">
					<div class="card">
					<img class="card-img-top" :src="'/images/' + findRecord.image" />
					<div class="card-body">
						<h5 class="card-title">{{ findRecord.title }}</h5>
						<h6 class="card-subtitle mb-2 text-muted">{{ findRecord.artist }}</h6>
						<h6 class="card-subtitle mb-2 text-muted">{{ findRecord.year }}</h6>
						<h6 class="card-subtitle mb-2 text-muted">{{ findRecord.genre }}</h6>
						<!-- <h2>{{ findRecord.title }}</h2>
						<p>{{ findRecord.artist }}</p>
						<img class="img-thumbnail " :src="'/images/' + findRecord.image" /> -->
						<div class="actions" >
							<!-- <button @click="editRecord(findRecord)" type="button" class="btn btn-warning" > Save Edits</button> -->
							<button @click="deleteRecord(findRecord)" type="button" class="btn btn-danger" > Delete </button>
						</div>
					</div>
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

.manage-page-row {
	margin: 1em 0;
}

.editWindow .card {
	max-width: 40%;
}

.actions button 
{
	font-size: 20px;
	margin: 0.5em;
	padding: 0.5em;
}

.upload div {
	padding: 0.4em;
	display: center;
	/* margin-left: 35%; */
}

.actions {
	padding-top: 1em;
}

#fileUpload {
	padding-left: 2em;
}

#uploadButton {
	font-size: 18px;
	background-color: rgb(101, 191, 101);
}

#editRecordRow {
	padding-top: 3em;
	padding-bottom: 8em;
}

.emphasize {
	background-color: rgb(101, 191, 101);
}

#editForm {
	padding: 1em;
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
			}
		},

		selectRecord(record) {
			this.findRecord = record;
			// this.findTitle = '';
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
