export const homeMenu = {
  intro: {
    id: 'intro',
    text: 'Intro',
    path: '#intro',
    icon: 'Vrpano',
    subMenu: null,
  },
  bootstrap: {
    id: 'bootstrap',
    text: 'Bootstrap Components',
    path: '#bootstrap',
    icon: 'BootstrapFill',
    subMenu: null,
  },
  storybook: {
    id: 'storybook',
    text: 'Storybook',
    path: '#storybook',
    icon: 'CustomStorybook',
    subMenu: null,
  },
  formik: {
    id: 'formik',
    text: 'Formik',
    path: '#formik',
    icon: 'CheckBox',
    subMenu: null,
  },
  apex: {
    id: 'apex',
    text: 'Apex Charts',
    path: '#apex',
    icon: 'AreaChart',
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
