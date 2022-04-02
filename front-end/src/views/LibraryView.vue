<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col">
				<h1>Your Music Library</h1>
			</div>
		</div>
		<div class="row">
			<LibraryList :records="records" />
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

.form-control {
	width: 70%;
}
</style>

<script>
import LibraryList from '@/components/LibraryList.vue';
import axios from 'axios';

export default {
	name: 'LibraryView',
	components: {
		LibraryList,
	},

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
	},
};
</script>
