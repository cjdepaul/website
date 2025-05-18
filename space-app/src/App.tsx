import './App.css'
import Layout from "@/components/layout"
import { ThemeProvider } from '@/components/ThemeProvider';
import { Route, Routes } from 'react-router';
import { routes } from '@/components/Routes';

function App() {

  return (
    <ThemeProvider defaultTheme='dark'>
      <div className="App">
        <Layout>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Layout>
      </div>
    </ThemeProvider>
  );
}


export default App
