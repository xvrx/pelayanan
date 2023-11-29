import React, {useState, useEffect} from 'react'
import { BiSpreadsheet } from 'react-icons/bi'
import { Inputx } from "./components/Inputx";
import { ButtonOne } from './components/Button'
import Pagination from './components/Pagination';
import HashLoader from "react-spinners/HashLoader"
import Modal from "./components/Modal";
import { IoIosPeople } from "react-icons/io";
import { TbListSearch } from "react-icons/tb";
import './list.css'
import axios from 'axios'
import EditModal from './components/EditModal';


const List = () => {
  const currentHost = window.location.hostname
  // console.log('host url: ', 'http://'+currentHost+':2000')
  //base Url
  const origin = 'http://'+currentHost+':2000'
  const bulanObj = ['Januari', 
                'Februari',
                'Maret',
                'April',
                'Mei',
                'Juni',
                'Juli',
                'Agustus',
                'September',
                'Oktober',
                'November',
                'Desember'
              ]

    function formatDate(b) {
        if (b === "") return "";
        const a = new Date(b);
        const taun = a.getFullYear();
        const bulan = a.getMonth();
        const tanggal = a.getDate();


        const locale = `${tanggal} ${bulanObj[bulan]} ${taun}`
        // const locale = [tanggal, bulan, taun].join("-");
        return locale;
      }

    const [lists, setlists] = useState()
    const [activePage, setActivePage] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [recordNum, setrecordNum] = useState(0)

    // default = true
    const [loading, setLoading] = useState(false)

    const [cari, setcari] = useState('')
    const [cariTrigger, setcariTrigger] = useState(false)
    const [pageInput, setpageInput] = useState(1)

    const [editModal, seteditModal] = useState(false)
    const [editModalContent, setEditModalContent] = useState({
      kategori : '',
      nama : '',
      npwp : '',
      alamat : '',
      klu : '',
      nik : '',
      nomorhp : '',
      email : '',
      loket : '',
      tanggal:'',
      penyelesaian: '',
      kepentingan : {
        main: [],
        desc: ''
      }
    })

    const [dummyLists, setdummyLists] = useState([
      {
      kategori : 'OP',
      nama : 'Davino',
      npwp : '814561234712000',
      alamat : 'JL KASONGAN',
      klu : 'ORANG GOBLOK',
      nik : '198765465150001',
      nomorhp : '085942845262',
      email : 'abdurrazzik@yopmail.com',
      loket : 'Loket 4 (Azriel)',
      tanggal:new Date(),
      penyelesaian: 'tidak ada penyelesaian',
      kepentingan : {
        main: ['Efaktur'],
        desc: 'Some Bullshit that essentially mean nothing'
      }
    },
      {
      kategori : 'OP',
      nama : 'Davino',
      npwp : '814561234712000',
      alamat : 'JL KASONGAN',
      klu : 'ORANG GOBLOK',
      nik : '198765465150001',
      nomorhp : '085942845262',
      email : 'abdurrazzik@yopmail.com',
      loket : 'Loket 4 (Azriel)',
      tanggal:'2011-5-15',
      penyelesaian: 'tidak ada penyelesaian',
      kepentingan : {
        main: ['Efaktur'],
        desc: 'Some Bullshit that essentially mean nothing'
      }
    },
      {
      kategori : 'OP',
      nama : 'Davino',
      npwp : '814561234712000',
      alamat : 'JL KASONGAN',
      klu : 'ORANG GOBLOK',
      nik : '198765465150001',
      nomorhp : '085942845262',
      email : 'abdurrazzik@yopmail.com',
      loket : 'Loket 4 (Azriel)',
      tanggal:'2011-5-15',
      penyelesaian: 'tidak ada penyelesaian',
      kepentingan : {
        main: ['Efaktur'],
        desc: 'Some Bullshit that essentially mean nothing'
      }
    },
      {
      kategori : 'OP',
      nama : 'Davino',
      npwp : '814561234712000',
      alamat : 'JL KASONGAN',
      klu : 'ORANG GOBLOK',
      nik : '198765465150001',
      nomorhp : '085942845262',
      email : 'abdurrazzik@yopmail.com',
      loket : 'Loket 4 (Azriel)',
      tanggal:'2011-5-15',
      penyelesaian: 'tidak ada penyelesaian',
      kepentingan : {
        main: ['Efaktur'],
        desc: 'Some Bullshit that essentially mean nothing'
      }
    },
      {
      kategori : 'OP',
      nama : 'Davino',
      npwp : '814561234712000',
      alamat : 'JL KASONGAN',
      klu : 'ORANG GOBLOK',
      nik : '198765465150001',
      nomorhp : '085942845262',
      email : 'abdurrazzik@yopmail.com',
      loket : 'Loket 4 (Azriel)',
      tanggal:'2011-5-15',
      penyelesaian: 'tidak ada penyelesaian',
      kepentingan : {
        main: ['Efaktur'],
        desc: 'Some Bullshit that essentially mean nothing'
      }
    },
      {
      kategori : 'OP',
      nama : 'Davino',
      npwp : '814561234712000',
      alamat : 'JL KASONGAN',
      klu : 'ORANG GOBLOK',
      nik : '198765465150001',
      nomorhp : '085942845262',
      email : 'abdurrazzik@yopmail.com',
      loket : 'Loket 4 (Azriel)',
      tanggal:'2011-5-15',
      penyelesaian: 'tidak ada penyelesaian',
      kepentingan : {
        main: ['Efaktur'],
        desc: 'Some Bullshit that essentially mean nothing'
      }
    },
      {
      kategori : 'OP',
      nama : 'Davino',
      npwp : '814561234712000',
      alamat : 'JL KASONGAN',
      klu : 'ORANG GOBLOK',
      nik : '198765465150001',
      nomorhp : '085942845262',
      email : 'abdurrazzik@yopmail.com',
      loket : 'Loket 4 (Azriel)',
      tanggal:'2011-5-15',
      penyelesaian: 'tidak ada penyelesaian',
      kepentingan : {
        main: ['Efaktur'],
        desc: 'Some Bullshit that essentially mean nothing'
      }
    },
      {
      kategori : 'OP',
      nama : 'Davino',
      npwp : '814561234712000',
      alamat : 'JL KASONGAN',
      klu : 'ORANG GOBLOK',
      nik : '198765465150001',
      nomorhp : '085942845262',
      email : 'abdurrazzik@yopmail.com',
      loket : 'Loket 4 (Azriel)',
      tanggal:'2011-5-15',
      penyelesaian: 'tidak ada penyelesaian',
      kepentingan : {
        main: ['Efaktur'],
        desc: 'Some Bullshit that essentially mean nothing'
      }
    },
      {
      kategori : 'OP',
      nama : 'Davino',
      npwp : '814561234712000',
      alamat : 'JL KASONGAN',
      klu : 'ORANG GOBLOK',
      nik : '198765465150001',
      nomorhp : '085942845262',
      email : 'abdurrazzik@yopmail.com',
      loket : 'Loket 4 (Azriel)',
      tanggal:'2011-5-15',
      penyelesaian: 'tidak ada penyelesaian',
      kepentingan : {
        main: ['Efaktur'],
        desc: 'Some Bullshit that essentially mean nothing'
      }
    },
      {
      kategori : 'OP',
      nama : 'Davino',
      npwp : '814561234712000',
      alamat : 'JL KASONGAN',
      klu : 'ORANG GOBLOK',
      nik : '198765465150001',
      nomorhp : '085942845262',
      email : 'abdurrazzik@yopmail.com',
      loket : 'Loket 4 (Azriel)',
      tanggal:'2011-5-15',
      penyelesaian: 'tidak ada penyelesaian',
      kepentingan : {
        main: ['Efaktur'],
        desc: 'Some Bullshit that essentially mean nothing'
      }
    },
  ])

    const [mainModal, setmainModal] = useState(false)
    const [modalTitle, setmodalTitle] = useState('Are you sure you wanna end your Life? lol')
    const [modalContent, setmodalContent] = useState('Nigga i am your god, lol!')
    
    function closeEditModal() {
      seteditModal(false)
    }

    function editModalActive(x) {
      // console.log(x)
      setEditModalContent(x)
      seteditModal(true)
    }

    function pageinputOC (e) {
      const entry = (e.target.value).replace(/\D/gi, '')
      if (parseInt(entry) > totalPages) {
        setpageInput(totalPages)
      } else if (parseInt(entry) < 1){
        setpageInput(1)
      } else {
        setpageInput(entry)
      }
    }

    function loader(load) {
      if (load === false) {
        setTimeout(() => {
          setLoading(load)
        }, 1000);
      } else {
        setLoading(load)
      }
    }

  function getData (page) {
    loader(true)
    axios.get(origin+'/pelayanan', {params: {
      start : page,
      lookFor: cari
    }})
    .then((res) => {
      setrecordNum(res?.data?.recordsNum)
      setTotalPages(Math.ceil((res?.data?.recordsNum)/10))
      setlists(res.data.records)
      loader(false)
      // console.log(`${res?.data?.recordsNum} fetched`)
    })
    .catch((err) => {
      console.log(err.errorStatus)
      if (err.response === undefined) {
        console.log(err.response)
        setmodalTitle('Internal Server Error!')
        setmodalContent("mohon periksa apakah server pada computer host belum dijalankan")
        loader(false)
        setmainModal(true)
        
      } else {
        console.log(err.response)
        setmodalTitle('Internal Server Error!')
        setmodalContent('error yang aneh: ', err?.response?.toString())
        loader(false)
        setmainModal(true)
      }
    })
  }

  function setPageOnBlur () {
    if (parseInt(pageInput) === '' || isNaN(parseInt(pageInput)) || parseInt(pageInput) === null) {
      setpageInput(1)
      setActivePage(1)
    } else {
      setActivePage(pageInput)
    }
  }

  function setCurrentPage(x) {
    const y = parseInt(x) || 1
    if (x === 0 || x === null) {
      setActivePage(activePage)
    } else if (x ==='') {} else {
      setActivePage(y)
      setpageInput(y)
    }
  }

  function cariOnBlur () {
      setActivePage(1)
      setcariTrigger(!cariTrigger)
  }

  function downloadExcel() {
    loader(true)
    //! IMPORTANT, if no 'body' is attached, type empty bracket instead
    axios.post(origin+'/xlsx', {}, {responseType: 'blob'})
    .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'records.xlsx'); //or any other extension
        console.log('data acquired!')
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
        loader(false)
      }
    ).catch(
      async (err) => {
        console.log(err.response)
        const error = await (err?.response?.data)?.text()
        const message = await error
        console.log(message)
        loader(false)
      }
    )
  }

  function npwpInput (entry) {
    if (entry.length < 3) return entry
    if (entry.length > 2 && entry.length < 6) return `${entry.slice(0,2)}.${entry.slice(2,6)}`
    if (entry.length > 5 && entry.length < 9) return `${entry.slice(0,2)}.${entry.slice(2,5)}.${entry.slice(5,8)}`
    if (entry.length === 9) return `${entry.slice(0,2)}.${entry.slice(2,5)}.${entry.slice(5,8)}.${entry.slice(8,9)}`
    if (entry.length > 9 && entry.length < 13 ) return `${entry.slice(0,2)}.${entry.slice(2,5)}.${entry.slice(5,8)}.${entry.slice(8,9)}-${entry.slice(9,12)}`
    if (entry.length > 12) return `${entry.slice(0,2)}.${entry.slice(2,5)}.${entry.slice(5,8)}.${entry.slice(8,9)}-${entry.slice(9,12)}.${entry.slice(12,15)}`
  }

  useEffect(() => {
    setlists(dummyLists)
    // getData(activePage)
  }, [setActivePage, activePage, cariTrigger ])


  
  return (
    <div className='list-backgr'>
      <div className="header-wrapper">
        <h1 className="list-header-title"> <IoIosPeople style={{marginRight: '10px'}}/>Reyangan</h1>
      </div>
        <div className="list-outer-wrapper">
            <div className="interface">
                <div className="list-title">
                    <h1 className="inner-wrapper-title"> <TbListSearch />Histori Layanan</h1>
                </div>

                <div className="search-list">
                    <div onClick={downloadExcel}  className="download">
                    <ButtonOne title='xlsx' logo={ <BiSpreadsheet style={{marginLeft:'0', transform:'scale(1.3)'}}/>} />
                    </div>
                    <Inputx 
                    value={cari}
                    onBlur={cariOnBlur}
                    onChange={(e) => setcari(e.target.value)}
                    title='CARI' 
                    className={'search-list'}/>
                </div>
            </div>
            <div className="grid-title">
                <h3 className='grid-items'>No</h3>
                <h3 className='grid-items'>Tanggal</h3>
                <h3 className='grid-items'>Nama</h3>
                <h3 className='grid-items'>NPWP</h3>
                <h3 className='grid-items'>Kategori</h3>
                <h3 className='grid-items'>Layanan</h3>
                <h3 className='grid-items'>Petugas</h3>
            </div>
            <div className="grid-content-outer">
                {lists?.length > 0 ? lists.map((list, idx) => (
                    <div onClick={() => editModalActive(list)} key={idx+1} className="grid-content-wrapper">
                    <p className='grid-items'>{(10*activePage)-(10-idx-1)}</p>
                    <p className='grid-items'>{formatDate(list?.tanggal)}</p>
                    <p className='grid-items'>{list?.nama?.toUpperCase()}</p>
                    <p className='grid-items'>{npwpInput(list?.npwp)}</p>
                    <p className='grid-items'>{list?.kategori}</p>
                    <p className='grid-items'>{list?.kepentingan?.main?.map((checked,idt) => {
                        if (list?.kepentingan?.main?.length === idt+1)  {return`${checked} `} else return `${checked} | `
                    })} {list?.kepentingan?.main.length > 0 && list?.kepentingan?.desc.length > 0 ? `| ${list?.kepentingan?.desc}` : list?.kepentingan?.main?.length < 1 && list?.kepentingan?.desc?.length > 0 ? `${list?.kepentingan?.desc}` : ``}</p>
                    <p className='grid-items'>{list?.loket}</p>
                    </div>
                )) :
                <p className='notFound'>Data pelayanan tidak ditemukan ...</p>
                }
            </div>
            <div className="lists-navigator">
              {<Pagination 
                activeStatus={activePage} 
                currentPage={activePage} 
                setOnBlur={setPageOnBlur} 
                pageOnClick={setCurrentPage} 
                totalPages={totalPages} 
                pageInputOC={pageinputOC}
                pageInputVal={pageInput}
                />}
            </div>
        </div>
        {editModal ? <EditModal
          closeModal={closeEditModal}
           editModalData={editModalContent}
           npwpinput={npwpInput}
       /> : null}
       
       { mainModal ?
        <Modal 
        title={modalTitle} 
        content={modalContent} 
        buttonStatus={false}
        closeButtonClick={() => {setmainModal(false)}}
        /> :
        null
       }
       <div className={loading ? "loaderContainer" : "loaderContainer inactive"}>
                <HashLoader color={'white'}
                loading={loading}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"/>
              <h3 id="loaderP" >Please Wait...</h3>
        </div>
    </div>
  )
}



export default List