import axios from "axios";
import { createContext, useEffect, useReducer,} from "react";
import { initialState ,reducer} from "../reducers/reducer";




const DataContext = createContext();


export const DataProvider = ({ children }) => {

    const [state,dispatch]=useReducer(reducer,initialState)

    const{secilenKitap,kitaplik,kategoriler,secilenKategori,kitapAdi,kitapYazari,kitapKategorisi,kitapSayfaSayisi,kitapAciklamasi,kitapResmi}=state;

    useEffect(() => {
        kategoriGetir();
    }, [])

    useEffect(() => {
        kitapGetir();
        if (secilenKitap){

            dispatch({type:'ISOPENTRUE'})

            dispatch({type:'FORMDOLDUR',payload:secilenKitap})
            
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

        dispatch({type:'KITAPLIK',payload:kitaplar});
    }

    //kategorileri getir
    const kategoriGetir = async () => {
        const url = 'http://localhost:3005/kategoriler';
        const response = await fetch(url);
        const kategoriler = await response.json();

        dispatch({type:'KATEGORILER',payload:kategoriler});
    }

    // yeni kitap ekleme
    const yeniKitapEkleDuzenle = async (yeni) => {
        let url = 'http://localhost:3005/kitaplar';
        if (!secilenKitap) {

            dispatch({type:'KITAPEKLE',yeni});
            const response = await axios.post(url, yeni);
        }
        else {
            url += '/' + secilenKitap.id;
            const response2 = await axios.put(url, yeni);
            dispatch({type:'KITAPDUZENLE',yeni});

            dispatch({type:'SECILENKITAPRESET'})
        }
    }

    // kitap silme
    const kitapSil = async (id) => {

        dispatch({type:'KITAPSIL',id})
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

        dispatch({type:'FORMRESET'})
    }


    //---------------------------------------


    return <DataContext.Provider value={
        {
            kitapSil,          
            handleSubmit,
            state,
            dispatch
        }}>
        {children}
    </DataContext.Provider>
}

export default DataContext