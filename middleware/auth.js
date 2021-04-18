export default function (context) {
  
  const app = context.app 
  const User = app.$cookies.get('USER_NAME')
  // const HeaderAuth = app.$axios.defaults.headers.common
  if (User) {
    // if (!HeaderAuth.User) {  // 避免刷新後 header消失
    //     app.$axios.setHeader('User', User)
    // }
    app.store.dispatch("upUserLoid", User);
  } else {
    if (context.route.name != "index") {
      window.location.href = window.location.origin
    }
  }
}