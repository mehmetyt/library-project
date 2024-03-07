import React, { useContext } from 'react'
import '../assets/styles/card.scss'
import Book from '../assets/img/default.jpg'
import DataContext from '../context/DataContext';


  const Card = ({kitap}) => {
    const {state,dispatch,kitapSil}=useContext(DataContext);
    const{}=state;
  return (

    <div className="book" >
      <img className='book-img' src={kitap.kitapResmi?kitap.kitapResmi:Book} alt="Kitap Resmi" />

      <div className="actions">
        <button onClick={()=>dispatch({type:'SECILENKITAP',kitap})}><i className='fas fa-pen'></i></button>
        <button onClick={()=>kitapSil(kitap.id)}><i className='fas fa-trash'></i></button>
      </div>
      <div className="book-info">
        <h2>{kitap.kitapAdi}</h2>
        <p><strong>Yazar:</strong>{kitap.kitapYazari}</p>
        <p><strong>Kategori:</strong>{kitap.kitapKategorisi}</p>
        <p><strong>Sayfa Sayısı:</strong>{kitap.kitapSayfaSayisi}</p>
        <p><strong>Açıklama:</strong>
          {kitap.kitapAciklamasi.length > 120 ?
            kitap.kitapAciklamasi.substring(0, kitap.kitapAciklamasi.substring(0, 120).lastIndexOf(' ')) + '...' :
            kitap.kitapAciklamasi}
        </p>
      </div>
    </div>

  )
}

export default Card