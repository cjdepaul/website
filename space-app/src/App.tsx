import './App.css'
import Layout from "@/components/layout"
import { ThemeProvider } from '@/components/ThemeProvider';
import Home from '@/pages/home';

function App() {

  return (
    <ThemeProvider defaultTheme='dark'>
      <div className="App">
        <Layout>
          <Home />
        </Layout>
      </div>
    </ThemeProvider>
  );
}


export default App
