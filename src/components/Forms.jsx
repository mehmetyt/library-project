import React, { useContext, useEffect, useState } from 'react'
import '../assets/styles/forms.scss'
import DataContext from '../context/DataContext'

const Forms = () => {


  const { 
    kategoriler,handleSubmit,

    kitapAdi,
    kitapYazari,
    kitapKategorisi,
    kitapSayfaSayisi,
    kitapAciklamasi,
    kitapResmi,

    setKitapAdi,
    setKitapYazari,
    setKitapKategorisi,
    setKitapSayfaSayisi,
    setKitapAciklamasi,
    setKitapResmi,


  }=useContext(DataContext);

  return (
    <div className='divForms'>

      <form className='forms' onSubmit={handleSubmit}>
        <input type="text" placeholder='Kitap Adı' value={kitapAdi} onChange={(e) => setKitapAdi(e.target.value)} />
        <input type="text" placeholder='Kitap Yazarı' value={kitapYazari} onChange={(e) => setKitapYazari(e.target.value)} />
        <div className='forms-row'>
          <select value={kitapKategorisi} onChange={(e) => setKitapKategorisi(e.target.value)}>
            <option value={'secin'}>Kategori Seçin</option>
            {
              kategoriler.map(item =>
                <option key={item.id} value={item.kategoriAdi}>{item.kategoriAdi}</option>
              )
            }
          </select>
          <input type="text" placeholder='Sayfa Sayısı' value={kitapSayfaSayisi} onChange={(e) => setKitapSayfaSayisi(e.target.value)} />
        </div>
        <input type="text" placeholder='Kitap Resmi (Url)' value={kitapResmi} onChange={(e) => setKitapResmi(e.target.value)} />
        <textarea placeholder='Açıklama' value={kitapAciklamasi} onChange={(e) => setKitapAciklamasi(e.target.value)}></textarea>
        <div className='forms-button'>
          <button disabled={kitapAdi === '' || kitapYazari === '' || kitapKategorisi === 'secin' || kitapAciklamasi === '' || kitapSayfaSayisi === 0}>Kaydet</button>
          <button onClick={()=>setSecilenKitap('')} >Formu Temizle</button>

        </div>
      </form>
    </div>
  )
}

export default Forms