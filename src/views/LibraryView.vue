<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col">
				<h1>Your Music Library</h1>
			</div>
		</div>
		<div class="row">
			<LibraryList :albums="this.$root.$data.library" />
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

export default {
	name: 'LibraryView',
	components: {
		LibraryList,
	},
};
</script>
