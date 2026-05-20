import Header from './Header'
import {Outlet} from 'react-router'

function RootLayout() {
  return (
    <div>
        <Header/>
        <div className='min-h-screen mx-20 p-20 bg-pink-200'>
            <Outlet/>
        </div>
    </div>
  )
}

export default RootLayout
