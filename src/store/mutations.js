export default {
  setToken (state, tokenId) {
    state.authToken = `OAuth ${tokenId}`
  }
}
