export function findFirstOccurrenceUri(songs, uri) {
    const index = songs.findIndex(song => song.uri === uri)
    return index
}