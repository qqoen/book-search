import { getFavorites } from '../service';

export default {
    template: `<div>
            <h1 class="subtitle">Favorites:</h1>

            <div v-if="favorites.length === 0">You have no favorites...</div>

            <ul>
                <li v-for="book in favorites">
                    <router-link :to="'/details/' + book.id">
                        <span>{{book.title}} ({{book.authors}})</span>
                    </router-link>
                </li>
            </ul>
        </div>`,
    data: () => {
        const favoritesObj = getFavorites();
        const favorites = Object.keys(favoritesObj)
            .map((key) => {
                const book = favoritesObj[key];
                book.id = key;
                return book;
            });

        return {
            favorites
        };
    },
};
