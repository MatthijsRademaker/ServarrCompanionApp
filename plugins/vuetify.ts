// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'readarr',
      themes: {
        readarr: {
          dark: false,
          colors: {
            surface: '#F5EDE0',
            primary: '#9B5E34',
            secondary: '#D4A373',
            accent: '#556B2F',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#FF0000',
          },
        },
        lidarr: {
          dark: true,
          colors: {
            surface: '#2B2D42',
            primary: '#3A506B',
            secondary: '#5C9EAD',
            accent: '#D7816A',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#2B2D42',
          },
        },
      },
    },

    // ... your configuration
  });
  app.vueApp.use(vuetify);
});
