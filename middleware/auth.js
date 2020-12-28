export default function (context) {
  if (context.route.fullPath.includes('/frau')) {
    return
  }

  if (!context.store.getters['auth/isAutheticated']) {
    context.redirect('/signin')
  }
}
