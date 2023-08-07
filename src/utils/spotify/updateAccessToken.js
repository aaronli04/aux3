export default async function updateAccessToken(socket, auxpartyId, accessToken) {
    if (!auxpartyId || !accessToken) { return; }
    socket.emit('updateAccessToken', auxpartyId, accessToken)
}