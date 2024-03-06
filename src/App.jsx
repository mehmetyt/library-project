import './App.css'
import CardList from './components/CardList'
import Navi from './components/Navi'
import Forms from './components/Forms'
import { useContext } from 'react'
import DataContext from './context/DataContext'



function App() {



    const{secilenKitap,isOpen,setIsOpen}=useContext(DataContext);
  return (
    <div className='main'>
      <div className='background'></div>
      <Navi />
      <button className='btnCollapse' onClick={() => setIsOpen(!isOpen)} >
        Kitap{secilenKitap ? ' Düzenle' : ' Ekle'} <i className={isOpen ? 'fas fa-angle-up' : 'fas fa-angle-down'} ></i></button>

      {isOpen &&
        <Forms  />
      }
      <CardList  />

    </div>
  
  )
}

export default App
