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
			<RecordList :records="filteredRecords" />
		</div>
	</div>
</template>

<style scoped>
input {
	margin: 1em;
}

.form-control {
	width: 70%;
}
</style>

<script>
import RecordList from '../components/RecordList.vue';
import axios from 'axios';

export default {
	name: 'BrowseView',
	components: {
		RecordList,
	},
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

		async deleteRecord(record) {
			try {
				await axios.delete('/api/records/' + record._id);
				this.getRecords();
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
