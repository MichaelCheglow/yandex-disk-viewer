export default {
  setTokenId (state, tokenId) {
    state.authToken = `OAuth ${tokenId}`
  }
}
