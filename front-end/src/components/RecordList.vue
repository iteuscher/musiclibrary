<template>
	<div class="container d-flex flex-wrap">
		<div class="card" v-for="record in records" :key="record.id">
			<img class="card-img-top" :src="'/images/' + record.image" />
			<div class="card-body">
				<h5 class="card-title">{{ record.title }}</h5>
				<h6 class="card-subtitle mb-2 text-muted">{{ record.artist }}</h6>
				<h6 class="card-subtitle mb-2 text-muted">{{ record.year }}</h6>
				<h6 class="card-subtitle mb-2 text-muted">{{ record.genre }}</h6>
				<button
					@click="addtoLibrary(record)"
					type="button"
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
</template>

<script>
export default {
	name: 'RecordList',
	props: {
		records: Array,
	},
	methods: {
		addtoLibrary(record) {
			this.$root.$data.library.push(record);
		},

		async deleteRecord(record) {
			await this.$parent.deleteRecord(record);
		},
	},
};
</script>

<style scoped>
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
</style>
