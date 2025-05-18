import Layout from "@/components/layout"
import { ThemeProvider } from '@/components/ThemeProvider';
import { Route, Routes } from 'react-router';
import { routes } from '@/components/Routes';
import { PageTransition } from '@/components/PageTransition';

function App() {

  return (
    <ThemeProvider defaultTheme='dark'>
      <div className="App">
        <Layout>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={<PageTransition>{route.element}</PageTransition>} />
            ))}
          </Routes>
        </Layout>
      </div>
    </ThemeProvider>
  );
}


export default App
