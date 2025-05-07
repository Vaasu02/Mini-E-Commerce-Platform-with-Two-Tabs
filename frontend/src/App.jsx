import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProductSubmission from './pages/ProductSubmission';
import MyProducts from './pages/MyProducts';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductSubmission />} />
          <Route path="/products" element={<MyProducts />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
