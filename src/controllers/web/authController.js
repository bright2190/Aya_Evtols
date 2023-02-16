export const registerView = (req, res) => {
  res.render('auth/register', { project_name: process.env.APP_NAME })
}

export const loginView = (req, res) => {
  res.render('auth/login', { project_name: process.env.APP_NAME })
}

export const forgotPasswordView = (req, res) => {
  res.render('auth/forgot-password', { project_name: process.env.APP_NAME })
}

export const setNewPasswordView = (req, res) => {
  res.render('auth/set-new-password', {
    project_name: process.env.APP_NAME,
    email: res.locals.user.email,
    token: res.locals.user.password_reset_token,
  })
}
