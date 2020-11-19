export default function (context) {
  if (!context.store.getters['auth/isAutheticated']) {
    context.redirect('/signin')
  }
}
