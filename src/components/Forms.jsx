import React, { useContext } from 'react'
import '../assets/styles/forms.scss'
import DataContext from '../context/DataContext'

const Forms = () => {


  const {
    handleSubmit, state, dispatch
  } = useContext(DataContext);
  const { kitapAdi, kitapYazari, kitapResmi, kitapSayfaSayisi, kitapAciklamasi, kitapKategorisi,kategoriler } = state;

  return (
    <div className='divForms'>

      <form className='forms' onSubmit={handleSubmit}>
        <input type="text" placeholder='Kitap Adı' value={kitapAdi} onChange={(e) => dispatch({ type: 'KITAPADI', payload: e.target.value })} />
        <input type="text" placeholder='Kitap Yazarı' value={kitapYazari} onChange={(e) => dispatch({ type: 'KITAPYAZARI', payload: e.target.value })} />
        <div className='forms-row'>
          <select value={kitapKategorisi} onChange={(e) => dispatch({ type: 'KITAPKATEGORISI', payload: e.target.value })}>
            <option value={'secin'}>Kategori Seçin</option>
            {
              kategoriler.slice(1).map(item =>
                <option key={item.id} value={item.kategoriAdi}>{item.kategoriAdi}</option>
              )
            }
          </select>
          <input type="text" placeholder='Sayfa Sayısı' value={Number(kitapSayfaSayisi)} onChange={(e) => dispatch({ type: 'KITAPSAYFASAYISI', payload: e.target.value })} />
        </div>
        <input type="text" placeholder='Kitap Resmi (Url)' value={kitapResmi} onChange={(e) => dispatch({ type: 'KITAPRESMI', payload: e.target.value })} />
        <textarea placeholder='Açıklama' value={kitapAciklamasi} onChange={(e) => dispatch({ type: 'KITAPACIKLAMASI', payload: e.target.value })}></textarea>
        <div className='forms-button'>
          <button disabled={kitapAdi === '' || kitapYazari === '' || kitapKategorisi === 'default' || kitapAciklamasi === '' || Number(kitapSayfaSayisi) === 0}>Kaydet</button>
          <button onClick={() => dispatch({ type: 'SECILENKITAPRESET' })} >Formu Temizle</button>

        </div>
      </form>
    </div>
  )
}

export default Forms