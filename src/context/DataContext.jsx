import axios from "axios";
import { createContext, useEffect, useState } from "react";




const DataContext = createContext();


export const DataProvider = ({ children }) => {

    const [kitaplik, setKitaplik] = useState([]);
    const [kategoriler, setKategoriler] = useState([]);
    const [search, setSearch] = useState('');
    const [secilenKategori, setSecilenKategori] = useState('');
    const [secilenKitap, setSecilenKitap] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    const [kitapAdi, setKitapAdi] = useState('');
    const [kitapYazari, setKitapYazari] = useState('');
    const [kitapKategorisi, setKitapKategorisi] = useState('secin');
    const [kitapResmi, setKitapResmi] = useState('');
    const [kitapSayfaSayisi, setKitapSayfaSayisi] = useState(0);
    const [kitapAciklamasi, setKitapAciklamasi] = useState('');

    useEffect(() => {
        kategoriGetir();
    }, [])

    useEffect(() => {
        kitapGetir();
        if (secilenKitap){
            setIsOpen(true);
            setKitapAdi(secilenKitap.kitapAdi);
            setKitapYazari(secilenKitap.kitapYazari);
            setKitapKategorisi(secilenKitap.kitapKategorisi);
            setKitapResmi(secilenKitap.kitapResmi);
            setKitapSayfaSayisi(secilenKitap.kitapSayfaSayisi);
            setKitapAciklamasi(secilenKitap.kitapAciklamasi);
        }
    }, [secilenKategori, secilenKitap])

    const kitapGetir = async () => {
        let url = 'http://localhost:3005/kitaplar';
        if (secilenKategori && secilenKategori !== kategoriler[0].kategoriAdi) {
            url += `?kitapKategorisi=${secilenKategori}`
        }
        console.log(url);
        const response = await fetch(url);
        const kitaplar = await response.json();
        setKitaplik(kitaplar);
    }

    //kategorileri getir
    const kategoriGetir = async () => {
        const url = 'http://localhost:3005/kategoriler';
        const response = await fetch(url);
        const kategoriler = await response.json();
        setKategoriler(kategoriler);
    }

    // yeni kitap ekleme
    const yeniKitapEkleDuzenle = async (yeni) => {
        let url = 'http://localhost:3005/kitaplar';
        if (!secilenKitap) {
            setKitaplik(prev => [...prev, yeni]);
            const response = await axios.post(url, yeni);
        }
        else {
            url += '/' + secilenKitap.id;
            const response2 = await axios.put(url, yeni);
            setKitaplik(prev =>
                prev.map(kitap => {

                    if (kitap.id === secilenKitap.id)
                        return { ...response2.data }
                    else
                        return { ...kitap }
                }
                )
            )
            setSecilenKitap('');
        }
    }

    // kitap silme
    const kitapSil = async (id) => {
        setKitaplik(prev => prev.filter(x => x.id !== id));
        const url = 'http://localhost:3005/kitaplar';
        const response = await axios.patch(url + '/' + id, { isDeleted: true });
    }




    const handleSubmit = (e) => {
        e.preventDefault();
        yeniKitapEkleDuzenle({
            id: kitaplik.length > 0 ? (Number(kitaplik[kitaplik.length - 1].id) + 1).toString() : '1',
            kitapAdi: kitapAdi,
            kitapYazari: kitapYazari,
            kitapKategorisi: kitapKategorisi,
            kitapResmi: kitapResmi,
            kitapSayfaSayisi: kitapSayfaSayisi,
            kitapAciklamasi: kitapAciklamasi
        })
        setKitapAdi('');
        setKitapYazari('');
        setKitapKategorisi(kategoriler[0].kategoriAdi);
        setKitapResmi('');
        setKitapAciklamasi('');
        setKitapSayfaSayisi(0);
    }


    //---------------------------------------


    return <DataContext.Provider value={
        {
            kitapSil,          //card
            setSecilenKitap,
            search,           //cardList
            kitaplik,
            kategoriler,        //navi
            search,
            setSecilenKategori,
            setSearch,       //search

            kategoriler, handleSubmit,// forms

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

            isOpen, setIsOpen, secilenKitap //app

        }}>
        {children}
    </DataContext.Provider>
}

export default DataContext