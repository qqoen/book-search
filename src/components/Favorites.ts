import { favorites } from '../service';

export default {
    template: `<div>
            <h1 class="subtitle">Favorites:</h1>

            <div v-if="favorites.length === 0">You have no favorites...</div>

            <ul>
                <li v-for="book in favorites">
                    <router-link :to="'/details/' + book.id">
                        <span>{{book.title}}</span>
                    </router-link>
                </li>
            </ul>
        </div>`,
    data: () => ({
        favorites: Object.keys(favorites).map((key) => {
            const book = favorites[key];
            book.id = key;
            return book;
        }),
    }),
};
