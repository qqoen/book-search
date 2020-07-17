import Vue from 'vue/dist/vue';
import VueRouter from 'vue-router';

import Main from './components/Main';
import Details from './components/Details';
import Favorites from './components/Favorites';


Vue.use(VueRouter);

const data = {
    query: '',
    books: [],
    isLoading: false,
};

const router = new VueRouter({
    routes: [
        { path: '/', component: Main, props: () => ({ isLoading: data.isLoading, books: data.books }) },

        { path: '/details/:id', component: Details },

        { path: '/favorites', component: Favorites },
    ]
});

const app = new Vue({
    router,
    el: '#app',
    data,
    methods: {
        search() {
            if (this.query === '') {
                return;
            }

            if (router.currentRoute.path !== '/') {
                router.push('/');
            }

            const api = `http://openlibrary.org/search.json?q=${this.query}`;

            this.isLoading = true;

            fetch(api)
                .then((res) => res.json())
                .then((data) => {
                    this.books = data.docs
                        .filter((x) => x.isbn && x.isbn.length > 0)
                        .map((x) => ({
                            title: x.title,
                            author: x.author_name.length > 0 ? x.author_name[0] : '',
                            year: x.publish_year && x.publish_year.length > 0 ? x.publish_year[0] : undefined,
                            id: x.isbn[0],
                        }));

                    this.isLoading = false;
                })
                .catch((err) => {
                    this.isLoading = false;
                    console.error(err);
                });
        },

        clear() {
            this.query = '';
            this.books = [];
        },
    },
});
