export default {
  isExistedNoticedPictures(state) {
    if (state.noticedPictures === null) return false
    return state.noticedPictures.length > 0
  },
}
