
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import {Landing,Error,Register} from './pages'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Profile, 
         AddJob, 
         AllJobs, 
         Stats, 
         SharedLayout
         } from './pages/dashboard'

 import { ProtectedRoutes} from './pages'    
// import Logo from './components/Logo'

function App() {
  return (
    <BrowserRouter>
      
      <Routes>

        <Route path='/'element={
      
          <ProtectedRoutes>
              <SharedLayout />
          </ProtectedRoutes>
        
        }>
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-jobs' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>
             <Route path='/landing' element={<Landing/>}/>
             <Route path='/register' element={<Register/>}/>
             <Route path='/*' element={<Error/>}/>
      </Routes>
      <ToastContainer position='top-center'/>
     </BrowserRouter>
  );
}

export default App;
