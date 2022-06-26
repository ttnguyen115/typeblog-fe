import PageRender from 'components/Container/PageRender';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App-container'>
      <Routes>
        <Route path='/' element={<PageRender />} />
        <Route path='/:page' element={<PageRender />} />
        <Route path='/:page/:slug' element={<PageRender />} />
      </Routes>
    </div>
  );
}

export default App;
