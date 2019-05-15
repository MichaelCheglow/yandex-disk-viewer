export default {
    token (state) {
      state.authToken = `OAuth ${state.tokenId}`
    }
  }
  