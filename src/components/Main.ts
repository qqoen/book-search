export default {
    template: `<div class="content">
        <div class="has-text-centered" v-if="books.length === 0 && !isLoading">No books found</div>

        <div class="has-text-centered" v-if="isLoading">Loading...</div>

        <ul v-if="!isLoading">
            <li v-for="book in books">
                <router-link :to="'/details/' + book.id">
                    <span>{{book.title}} ({{book.author}})</span>
                    <span v-if="book.year">[{{book.year}}]</span>
                </router-link>
            </li>
        </ul>
    </div>`,
    props: ['books', 'isLoading'],
};
