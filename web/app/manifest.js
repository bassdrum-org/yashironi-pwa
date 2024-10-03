export default function manifest() {
    return {
      name: 'Yashironi PWA',
      short_name: 'Yashironi',
      description: 'Yashironi',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#000000',
      icons: [
        {
          src: '/icons-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icons-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    }
  }