const storageKey = 'favorites';

function saveFavorites(data: object) {
    localStorage.setItem(storageKey, JSON.stringify(data));
}

export function getFavorites() {
    const data = localStorage.getItem(storageKey);

    if (data == null) {
        return {};
    } else {
        return JSON.parse(data);
    }
}

export function addFavorite(isbn: string, book: object) {
    const favorites = getFavorites();
    favorites[isbn] = book;
    saveFavorites(favorites);
}

export function removeFavorite(isbn: string) {
    const favorites = getFavorites();
    delete favorites[isbn];
    saveFavorites(favorites);
}

export function isFavorite(isbn: string) {
    const favorites = getFavorites();
    return favorites.hasOwnProperty(isbn);
}
