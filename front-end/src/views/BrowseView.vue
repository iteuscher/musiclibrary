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
			<AlbumList :albums="albums" />
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
import AlbumList from '../components/AlbumList.vue';

export default {
	name: 'BrowseView',
	components: {
		AlbumList,
	},
	data() {
		return {
			searchText: '',
		};
	},
	computed: {
		albums() {
			return this.$root.$data.albums.filter((album) => {
				const lowercaseSearchText = this.searchText.toLowerCase();
				return (
					album.title.toLowerCase().search(lowercaseSearchText) >= 0 ||
					album.artist.toLowerCase().search(lowercaseSearchText) >= 0 ||
					album.year.toLowerCase().search(lowercaseSearchText) >= 0 ||
					album.genre.toLowerCase().search(lowercaseSearchText) >= 0
				);
			});
		},
	},
};
</script>
