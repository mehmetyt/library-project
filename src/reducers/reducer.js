export const initialState = {
    kitaplik: [],
    kategoriler: [],
    search: '',
    secilenKategori: '',
    secilenKitap: '',

    isOpen: false,

    kitapAdi: '',
    kitapYazari: '',
    kitapKategorisi: 'default',
    kitapResmi: '',
    kitapSayfaSayisi: 0,
    kitapAciklamasi: ''
}

export const reducer = (state, action) => {
    switch (action.type) {


        case 'KITAPLIK':
            return {
                ...state,
                kitaplik: action.payload
            }
        case 'KATEGORILER':
            return {
                ...state,
                kategoriler: action.payload
            }
        case 'FORMDOLDUR':
            return {
                ...state,
                kitapAdi: state.secilenKitap.kitapAdi,
                kitapYazari: state.secilenKitap.kitapYazari,
                kitapKategorisi: state.secilenKitap.kitapKategorisi,
                kitapResmi: state.secilenKitap.kitapResmi,
                kitapSayfaSayisi: state.secilenKitap.kitapSayfaSayisi,
                kitapAciklamasi: state.secilenKitap.kitapAciklamasi
            }

        case 'FORMRESET':
            return {
                ...state,
                kitapAdi: '',
                kitapYazari: '',
                kitapKategorisi: 'default',
                kitapResmi: '',
                kitapSayfaSayisi: 0,
                kitapAciklamasi: ''
            }
            case 'SECILENKITAP':
                return {
                    ...state,
                    secilenKitap: action.kitap
                }
    
        case 'SECILENKITAPRESET':
            return {
                ...state,
                secilenKitap: ''
            }

        case 'ISOPENTRUE':
            return {
                ...state,
                isOpen: true
            }
        case 'ISOPEN':
            return {
                ...state,
                isOpen: !state.isOpen
            }
        case 'SEARCH':
            return {
                ...state,
                search: action.payload
            }
        case 'SECILENKATEGORI':
            return {
                ...state,
                secilenKategori: action.payload
            }
        case 'KITAPADI':
            return {
                ...state,
                kitapAdi: action.payload
            }
        case 'KITAPYAZARI':
            return {
                ...state,
                kitapYazari: action.payload
            }
        case 'KITAPRESMI':
            return {
                ...state,
                kitapResmi: action.payload
            }
        case 'KITAPKATEGORISI':
            return {
                ...state,
                kitapKategorisi: action.payload
            }
        case 'KITAPSAYFASAYISI':
            return {
                ...state,
                kitapSayfaSayisi: action.payload
            }
        case 'KITAPACIKLAMASI':
            return {
                ...state,
                kitapAciklamasi: action.payload
            }
        case 'KITAPEKLE':
            const ekleKitaplik = [...state.kitaplik, action.yeni]
            return {
                ...state,
                kitaplik: ekleKitaplik
            }
        case 'KITAPSIL':
            const silKitaplik = state.kitaplik.filter(x => x.id !== action.id);
            return {
                ...state,
                kitaplik: silKitaplik
            }
        case 'KITAPDUZENLE':
            const duzenleKitap = state.kitaplik.map(kitap => {
                if (kitap.id === state.secilenKitap.id) {
                    return { ...action.yeni }
                }
                else {
                    return { ...kitap }
                }

            })
            return {
                ...state,
                kitaplik: duzenleKitap,
                secilenKitap: ''
            }
















    }

}