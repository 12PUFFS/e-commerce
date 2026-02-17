import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react_router/',
  server: {
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
});

// <Link to={`/item/${bannerProducts.id}`}>
//     {bannerProducts.map((i, index: number) => {
//       return <img key={index} src={i.image} alt="" />;
//     })}
//   </Link>
