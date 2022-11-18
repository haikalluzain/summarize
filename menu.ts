export const cvMenu = {
  cv: {
    id: 'cvEdit',
    text: 'CV',
    path: '/main/cv/[id]',
    icon: 'Article',
    subMenu: null,
  },
  preview: {
    id: 'preview',
    text: 'Preview',
    path: '/main/cv/[id]/preview',
    icon: 'RemoveRedEye',
    subMenu: null,
  },
}

export const userMenu = {
  accountSetting: {
    id: 'accountSetting',
    text: 'Account Setting',
    path: '/settings/account',
    icon: 'Login',
  },
  signUp: {
    id: 'signUp',
    text: 'Sign Up',
    path: 'auth-pages/sign-up',
    icon: 'PersonAdd',
  },
}

export const pages = {
  login: {
    id: 'login',
    text: 'Login',
    path: '/',
    icon: 'Login',
    header: false,
  },
  register: {
    id: 'register',
    text: 'Register',
    path: '/register',
    icon: 'PersonAdd',
    header: false,
  },
  main: {
    id: 'main',
    text: 'Main',
    path: '/main',
    icon: 'PersonAdd',
    header: true,
  },
  page404: {
    id: 'Page404',
    text: '404 Page',
    path: 'auth-pages/404',
    icon: 'ReportGmailerrorred',
  },
}
