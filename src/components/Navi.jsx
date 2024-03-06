import React, { useContext } from 'react'
import LibLogo from '../assets/img/navLogo.png'
import '../assets/styles/navi.scss'
import Search from './Search'
import DataContext from '../context/DataContext'

const Navi = () => {
    const { kategoriler, search,setSecilenKategori }=useContext(DataContext);
    return (
        <nav>
            <div className='brand'>
                <img src={LibLogo} alt="logo" />
                <h3>Boost Online-6 Lib</h3>
            </div>
            <ul>{
                kategoriler.map(item =>
                        <li key={item.id} onClick={(e)=>setSecilenKategori(e.target.innerText)}>
                            {item.kategoriAdi}
                            </li>
                )
            }
                <Search search={search} />
            </ul>
        </nav>
    )
}

export default Navi