import { isFavorite, addFavorite, removeFavorite } from '../service';

export default {
    template: `<div>
            <div v-if="!isLoading">
                <span class="subtitle">{{book.title}}</span> by {{book.authors}}
            </div>

            <figure class="image book-cover mt-5" v-if="book.cover">
                <img :src="book.cover" />
            </figure>

            <div v-if="isLoading">Loading...</div>

            <div class="field mt-5">
                <div class="control">
                    <button
                        class="button is-success"
                        v-if="!isFavorite"
                        @click="favorite">Favorite</button>

                    <button
                        class="button is-danger"
                        v-if="isFavorite"
                        @click="unfavorite">Unfavorite</button>
                </div>
            </div>
        </div>`,
    data: () => ({
        book: {},
        isFavorite: false,
        isLoading: true,
    }),
    methods: {
        favorite() {
            this.isFavorite = true;
            addFavorite(this.$route.params.id, this.book);
        },

        unfavorite() {
            this.isFavorite = false;
            removeFavorite(this.$route.params.id);
        },
    },
    created() {
        const key = `ISBN:${this.$route.params.id}`;
        const api = `https://openlibrary.org/api/books?bibkeys=${key}&format=json&jscmd=data`;

        this.isFavorite = isFavorite(this.$route.params.id);
        
        fetch(api)
            .then((res) => res.json())
            .then((data) => {
                const authors = data[key].authors.reduce((acc, cur, idx) => {
                    const sep = idx === 0 ? '' : ', ';
                    return acc + sep + cur.name;
                }, '');

                this.book = {
                    title: data[key].title,
                    authors,
                };

                if (data[key].cover != null) {
                    this.book.cover = data[key].cover.medium;
                }

                this.isLoading = false;
            })
            .catch(() => {
                this.isLoading = false;
            });
    },
};
