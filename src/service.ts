export const favorites = {};

export function addFavorite(isbn: string, book: object) {
    favorites[isbn] = book;
}

export function removeFavorite(isbn: string) {
    delete favorites[isbn];
}

export function isFavorite(isbn: string) {
    return favorites.hasOwnProperty(isbn);
}
