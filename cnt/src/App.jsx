import React, { useState, useEffect } from "react";
import "./App.css";
import Checkbox from "./components/Checkbox";
import {Inputx, Inputa} from "./components/Inputx";
import HashLoader from "react-spinners/HashLoader"
import { BiPhoneCall, BiGroup, BiFileFind, BiPaperPlane, BiSend, BiSync } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { GoCheck, GoX } from "react-icons/go";
import Radios from "./components/Radios";
import {ButtonOne,ButtonTwo } from "./components/Button";
import Modal from "./components/Modal";
import axios from 'axios'
// import Loader from "./components/Loader";

const Host_Port = process.env.REACT_APP_BASE_URL;
// const dynamicOrigin = window.location.href
const currentHost = window.location.hostname
// console.log('host url: ', 'http://'+currentHost+':2000')
//base Url
const origin = 'http://'+currentHost+':2000'

// regex for email
// /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi


const App = () => {

  function formatDate(b) {
    if (b === "") return "";
    const a = new Date(b);
    const taun = a.getFullYear();
    const bulan = a.getMonth() + 1;
    const tanggal = a.getDate();
    const locale = [tanggal, bulan, taun].join("-");
    return locale;
  }

  const [currentDate, setcurrentDate] = useState(formatDate(new Date))
  // console.log('base url is ', origin)
  const [loading, setLoading] = useState(false)

  function loader(load) {
    if (load === false) {
      setTimeout(() => {
        setLoading(load)
      }, 1000);
    } else {
      setLoading(load)
    }
  }


  const [formPayload, setformPayload] = useState({
    kategori : '',
    nama : '',
    npwp : '',
    alamat : '',
    klu : '',
    nik : '',
    nomorhp : '',
    email : '',
    loket : '',
    tanggal : '',
    penyelesaian: '',
    kepentingan : {
      main: [],
      desc: ''
    }
  })

  const [kepentingan, setkepentingan] = useState({
    ereg:false,
    billing : false,
    spt : false,
    efaktur : false,
    ebupot : false,
  })

  function clearForm () {
    setmodalTitle("Kosongkan Form?")
    setbuttonStatus(true)
    setbuttonOneFunction('clearForm')
    setmodalContent("Apakah anda yakin untuk mengosongkan form?")
    setmainModal(true)
  }



  function clearFormAction () {
    // setformPayload(emptyForm)
    setnpwp('')
    setformPayload({...formPayload, kategori:''})
    setformPayload({
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

    setkepentingan({
      ereg:false,
      billing : false,
      spt : false,
      efaktur : false,
      ebupot : false,
    })
    
   

    console.log('form cleared')
    setmainModal(false)
  }

  // types
  const [npwp, setnpwp] = useState('')

  function npwpInput (entry) {
    setformPayload({...formPayload, npwp: entry.slice(0,15)})
    if (entry.length < 3) return entry
    if (entry.length > 2 && entry.length < 6) return `${entry.slice(0,2)}.${entry.slice(2,6)}`
    if (entry.length > 5 && entry.length < 9) return `${entry.slice(0,2)}.${entry.slice(2,5)}.${entry.slice(5,8)}`
    if (entry.length === 9) return `${entry.slice(0,2)}.${entry.slice(2,5)}.${entry.slice(5,8)}.${entry.slice(8,9)}`
    if (entry.length > 9 && entry.length < 13 ) return `${entry.slice(0,2)}.${entry.slice(2,5)}.${entry.slice(5,8)}.${entry.slice(8,9)}-${entry.slice(9,12)}`
    if (entry.length > 12) return `${entry.slice(0,2)}.${entry.slice(2,5)}.${entry.slice(5,8)}.${entry.slice(8,9)}-${entry.slice(9,12)}.${entry.slice(12,15)}`
  }

  function turnIntoNPWP (e) {
    if (e === undefined) {}
    const orig = e.replace(/\D/g, '')
    const axd = orig.toString()
    setnpwp(npwpInput(axd))
  }





  // MODAL
  const [mainModal, setmainModal] = useState(false)
  const [modalTitle, setmodalTitle] = useState('Are you sure you wanna end your Life? lol')
  const [modalContent, setmodalContent] = useState('Nigga i am your god, lol!')
  const [buttonStatus, setbuttonStatus] = useState(true)
  const [buttonOneFunction, setbuttonOneFunction] = useState('yes')
  const [buttonTwoFunction, setbuttonTwoFunction] = useState('closeModal')


  function closeModal () {
    setmainModal(false)
  }




  useEffect(() => {
    function kepentinganUpdate() {
      const kepentinganlog = []
      if (kepentingan.ereg) kepentinganlog.push( "Ereg/NPWP")
      if (kepentingan.billing) kepentinganlog.push( "E-Billing")
      if (kepentingan.spt) kepentinganlog.push( "SPT Tahunan / SPT Masa")
      if (kepentingan.efaktur) kepentinganlog.push( "Efaktur")
      if (kepentingan.ebupot) kepentinganlog.push( "E-Bupot / Unifikasi")
      setformPayload({...formPayload, kepentingan: {...formPayload.kepentingan, main : kepentinganlog }})
    }

    kepentinganUpdate()
  }, [kepentingan])




    //!     submit

  function submitForm () {
    console.log(formPayload)
    const testemail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi
    const emailValidation = testemail.test(formPayload.email)

    if (
      formPayload.kategori.length < 1 ||
      formPayload.npwp.length < 1 ||
      formPayload.nama.length < 1 ||
      formPayload.alamat.length < 1 ||
      formPayload.klu.length < 1 ||
      formPayload.nik.length < 1 
    ) {
      setmodalTitle('Identitas tidak lengkap!')
      setmodalContent("mohon sekurang-kurangnya memilih kategori, npwp , mengisi nama, nik, alamat, dan KLU")
      setbuttonStatus(false)
      setmainModal(true)
      
    } else if (
      (formPayload.email.length > 0 && !emailValidation) || 
      formPayload.nomorhp.length < 1
      ) {
      setmodalTitle('Kontak tidak sesuai!')
      setmodalContent("mohon isi nomor HP dan cek kembali kesesuaian format email")
      setbuttonStatus(false)
      setmainModal(true)
    } else if (
      formPayload.kepentingan.desc.length < 1 &&
      formPayload.kepentingan.main.length < 1
    ) {
      setmodalTitle('Data pelayanan tidak lengkap!')
      setmodalContent("mohon isi keterangan terkait pelayanan; kepentingan/kendala (isi keterangan lainnya jika jenis pelayanan tidak terdapat pada opsi)")
      setbuttonStatus(false)
      setmainModal(true)
  } else if (formPayload.loket.length < 1){
      setmodalTitle('Data Loket Kosong!')
      setmodalContent("mohon pilih petugas di loket pelayanan")
      setbuttonStatus(false)
      setmainModal(true)
    } else {
      //! if form is valid !
      console.log('all valid')
      setbuttonOneFunction('confirmSubmit')
      setmodalTitle(`tambah histori pelayanan?`)
      setmodalContent(`tambah data histori pelayanan atas ${formPayload.nama}?`)
      setbuttonStatus(true)
      setmainModal(true)
      // axios.post()
    }
  }

    function confirmSubmit () {
      console.log('form sent!')
      console.log(origin+'/pelayanan')
      loader(true)
      axios.post(origin+'/pelayanan', formPayload)
        .then((res) => {
          console.log(res)
          setmodalTitle('Data telah disimpan!')
          setmodalContent("")
          setbuttonStatus(false)
          setmainModal(true)
          loader(false)
        })
        .catch((err) => {
          console.log(err.response)
          setmodalTitle('Data gagal disimpan!')
          setmodalContent((err.response.data).toString())
          setbuttonStatus(false)
          setmainModal(true)
          loader(false)
        })
    }

    async function npwpOnBlur () {
      // console.log('something', formPayload.npwp.length)
      if (formPayload?.npwp?.length > 0) {
        axios.post(origin+`/ingfowangsaf/${formPayload.npwp}`)
        .then((res) => {

          const found = res.data.found
          const val = ["NAMA_WP", "ALAMAT", "EMAIL", "KATEGORI", "NAMA_KLU", "NOMOR_IDENTITAS", "NOMOR_TELEPON"]
          
          for (let i = 0; i < val.length; i++) {
            const attr = found[val[i]]
            
            if (val[i] === "NAMA_WP" && attr !== undefined && attr !== null) {
              setformPayload(prevState => (
                {...prevState, nama:attr}
              ))
            }

            if (val[i] === "ALAMAT" && attr !== undefined && attr !== null) {
              setformPayload(prevState => (
                {...prevState, alamat:attr}
              ))
            }

            if (val[i] === "EMAIL" && attr !== undefined && attr !== null) {
              setformPayload(prevState => (
                {...prevState, email:attr}
              ))
            }

            if (val[i] === "KATEGORI" && attr !== undefined && attr !== null) {
              setformPayload(prevState => (
                {...prevState, kategori:attr}
              ))
            }
            if (val[i] === "NAMA_KLU" && attr !== undefined && attr !== null) {
              setformPayload(prevState => (
                {...prevState, klu:attr}
              ))
            }
            if (val[i] === "NOMOR_IDENTITAS" && attr !== undefined && attr !== null) {
              setformPayload(prevState => (
                {...prevState, nik:attr}
              ))
            }
            if (val[i] === "NOMOR_TELEPON" && attr !== undefined && attr !== null) {
              setformPayload(prevState => (
                {...prevState, nomorhp:attr}
              ))
            }
          }

          if (res.data.previous === true) {
            setmodalTitle('Data Pelayanan Ditemukan!')
            setmodalContent('terdapat data pelayanan atas wajib pajak yang sama sebelumnya')
            setbuttonStatus(false)
            setmainModal(true)
          }
        })
        .catch((err) => {
          console.log(err.response)
          setmodalTitle('Data gagal disimpan!')
          setmodalContent((err.response.data).toString())
          setbuttonStatus(false)
          setmainModal(true)
          loader(false)
        })
      } else {

      }
    }

  return (
    <div className="backgr">
      <div className="flag"></div>
      <div className="flag-3"></div>
      <div className="outer-wrapper">
        <div className="inner-wrapper">
          <div style={{position:'relative',display:'flex', alignItems:'center', transform : 'translateX(-4px)', marginBottom:'3px'}} className="header">
            <div className="date">
            Tanggal : {currentDate}
            </div>
            {/* <div className="header-logo">
              <MainLogo width="50px"/>
            </div> */}
           <div style={{marginLeft:'2px'}} className="header-title">
              {/* <p className="kp2kp">KP2KP</p>
              <h3>KASONGAN</h3> */}
            </div> 
            <h1 className="inner-wrapper-title"> <IoIosPeople />Reyangan</h1>
          </div>
          
          <p className="casual-paragraph">Selamat datang di <i><strong>Reyangan </strong></i> (Register Pelayanan Kasongan), <br/> mohon mengisi form berikut untuk kepentingan administratif kegiatan pelayanan perpajakan di KP2KP Kasongan.</p>
                  <div className="subwrapper">
                    <div className="identity-content-wrapper">
                      <h2 className="identity-title">
                        <BiGroup 
                          size={30} 
                          style={{marginRight: '10px'}}/> 
                        Profil
                        </h2>
                      <p style={{marginTop: '20px'}} className="casual-paragraph">Kategori wajib pajak (checklist):</p>
                      <div className="identity-jenis" value={formPayload.kategori} >
                          <Radios checked={formPayload.kategori === 'Orang Pribadi'} value={'Orang Pribadi'} onChange={(e) => setformPayload({...formPayload, kategori:e.target.value})} title={'Orang Pribadi'} name={'kategori'} />
                          <Radios checked={formPayload.kategori === 'Badan'} value={'Badan'} onChange={(e) => setformPayload({...formPayload, kategori:e.target.value})}title={'Badan'} name={'kategori'} />
                          <Radios checked={formPayload.kategori === 'Bendahara'} value={'Bendahara'} onChange={(e) => setformPayload({...formPayload, kategori:e.target.value})} title={'Bendahara Pemerintah'} name={'kategori'} />
                      </div>
                      <p style={{marginTop: '20px'}} className="casual-paragraph">Informasi terkait identitas Wajib Pajak:</p>
                      <div className="identity-content">
                        <Inputx
                          value={npwp}
                          onChange={(e) => turnIntoNPWP(e.target.value)}
                          onBlur={npwpOnBlur}
                          title='NPWP'
                          className={'npwp'}/>
                        <Inputx 
                          value={formPayload.nama}
                          onChange={(e) => setformPayload({...formPayload, nama:e.target.value})}
                          title='NAMA'
                          className={'nama'}/>
                        <Inputx 
                          value={formPayload.nik}
                          onChange={(e) => {const nik = e.target.value; const formatted = nik.replace(/\D/g, '' ) ; setformPayload({...formPayload, nik:formatted})}}
                          title='NOMOR IDENTITAS'
                          className={'nik'}/>
                        <Inputx 
                          value={formPayload.alamat}
                          onChange={(e) => setformPayload({...formPayload, alamat:e.target.value})}
                          title='ALAMAT' 
                          className={'alamat'}/>
                        <Inputx 
                          value={formPayload.klu}
                          onChange={(e) => setformPayload({...formPayload, klu:e.target.value})}
                          title='KLU' 
                          className={'klu'}/>
                      </div>
                    </div>
                  </div>
                  <div className="subwrapper">
                    <div className="identity-content-wrapper">
                      <h2 className="identity-title">
                      <BiPhoneCall size={30} style={{marginRight: '5px'}}/>  Contact Person
                      </h2>
                      <div className="identity-content">
                        <Inputx
                          value={formPayload.nomorhp}
                          onChange={(e) => {const nohp =e.target.value; const formatted = nohp.replace(/\D/g, '' ) ;setformPayload({...formPayload, nomorhp:formatted})}}
                          title='NOMOR HP'
                          className={'nohp'}/>
                        <Inputx 
                          value={formPayload.email}
                          onChange={(e) => setformPayload({...formPayload, email:e.target.value})}
                          title='EMAIL'
                          className={'email'}/>
                      </div>
                    </div>
                  </div>
                  <div style={{marginBottom:'20px'}} className="subwrapper">
                    <div className="identity-content-wrapper">
                      <h2 className="identity-title">
                      <BiFileFind onClick={() => console.log(kepentingan)} size={30} style={{marginRight: '5px'}}/> Kepentingan/Kendala
                      </h2>
                      <div style={{flexDirection: 'column'}} className="identity-content">
                        <div className="kepentingan-jenis">
                            <Checkbox checked={kepentingan.ereg} onChange={e => {setkepentingan({...kepentingan, ereg: e.target.checked})} } title={'Ereg/NPWP'}/>
                            <Checkbox checked={kepentingan.billing} onChange={e => {setkepentingan({...kepentingan, billing: e.target.checked}) }} title={'E-Billing'}/>
                            <Checkbox checked={kepentingan.spt} onChange={e => {setkepentingan({...kepentingan, spt: e.target.checked}) }} title={'SPT Tahunan / SPT Masa'}/>
                            <Checkbox checked={kepentingan.efaktur} onChange={e => {setkepentingan({...kepentingan, efaktur: e.target.checked}) }} title={'Efaktur'}/>
                            <Checkbox checked={kepentingan.ebupot} onChange={e => {setkepentingan({...kepentingan, ebupot: e.target.checked}); }} title={'E-Bupot / E-Bupot Unifikasi'}/>
                        </div>
                        <Inputx 
                          value={formPayload.kepentingan.desc}
                          onChange={(e) => setformPayload({...formPayload, kepentingan: {...formPayload.kepentingan, desc : e.target.value }})}
                          title='KETERANGAN/LAINNYA'
                          className={'keterangan'}/>
                      </div>
                    </div>
                  </div>
                  <div style={{marginBottom:'34px'}} className="subwrapper">
                    <div className="identity-content-wrapper">
                      <h2 className="identity-title">
                      <BiPaperPlane size={30} style={{marginRight: '5px'}}/> Loket Pelayanan
                      </h2>
                      <div 
                        // onChange={(e) => setformPayload({...formPayload, loket:e.target.value})}
                        style={{display:'flex', flexDirection:'column', marginTop:'20px'}} 
                        className="identity-content">
                  
                        <Radios onChange={(e) => setformPayload({...formPayload, loket:e.target.value})} value={'Loket 1 (-)'} checked={formPayload.loket === 'Loket 1 (-)'} title={'Loket 1 (-)'} name={'loket'}/>
                        <Radios  onChange={(e) => setformPayload({...formPayload, loket:e.target.value})} value={'Loket 2 (Satrio)'} checked={formPayload.loket === 'Loket 2 (Satrio)'} title={'Loket 2 (Satrio)'} name={'loket'}/>
                        <Radios onChange={(e) => setformPayload({...formPayload, loket:e.target.value})} value={'Loket 3 (Wiji)'} checked={formPayload.loket === 'Loket 3 (Wiji)'} title={'Loket 3 (Wiji)'} name={'loket'}/>
                        <Radios  onChange={(e) => setformPayload({...formPayload, loket:e.target.value})} value={'Loket 4 (Azriel)'} checked={formPayload.loket === 'Loket 4 (Azriel)'} title={'Loket 4 (Azriel)'} name={'loket'}/>

                      </div>
                      <Inputa 
                          value={formPayload.penyelesaian}
                          onChange={(e) => setformPayload({...formPayload, penyelesaian :e.target.value})}
                          title='PENYELESAIAN'
                          className={'penyelesaian'}/>
                    </div>
                  </div>
        </div>
      </div>
      <div className="button-subwrapper">
        <ButtonTwo onClick={clearForm} title="Clear" logo={<BiSync />}/>
        <ButtonOne onClick={submitForm}  title="Submit" logo={<BiSend />}/>
      </div>

      {mainModal ? <Modal 
        title={modalTitle} 
        content={modalContent} 
        buttonStatus={buttonStatus} 
        buttonTwoTitle={<GoCheck />}
        buttonOneTitle={<GoX />}
        buttonCloseLogo={<GoCheck />}
        ButtonOneClick={
          buttonOneFunction === "confirmSubmit" ? confirmSubmit : 
          buttonOneFunction === "clearForm" ? clearFormAction : 
          null}
        ButtonTwoClick={buttonTwoFunction === "closeModal" ? closeModal : null}
        closeButtonClick={closeModal}
        /> : null}
         
        <div className={loading ? "loaderContainer" : "loaderContainer inactive"}>
          <HashLoader color={'white'}
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"/> 
          <h3 id="loaderP" >Please Wait...</h3>
        </div>
    </div>
  );
};

export default App;
