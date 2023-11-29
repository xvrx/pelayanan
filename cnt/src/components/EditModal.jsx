import React from 'react'
import './editmodal.css'
import { GoCheck, GoX } from "react-icons/go";
import { BiPhoneCall, BiGroup, BiFileFind, BiPaperPlane, BiSend } from "react-icons/bi";

const EditModal = ({closeModal, editModalData, npwpinput}) => {


    // const editModalData = {
    //     kategori : 'Badan',
    //     nama : 'Budi Hartono',
    //     npwp : '084563218712000',
    //     alamat : 'Kasongan Lmaa',
    //     klu : 'Pegawai Swasta',
    //     nik : '23423423423',
    //     nomorhp : '085948546846',
    //     email : 'hartono@mailnesia.com',
    //     loket : 'Loket 3 (Wiji)',
    //     tanggal:'2022-05-30',
    //     penyelesaian: 'Agree to disagrree',
    //     kepentingan : {
    //       main: ["e-billing", 'efaktur'],
    //       desc: 'pembayaran PPN'
    //     }
    //   }

  return (
<div className='edit-modal-outer-layer'>
    <div className="edit-modal-outer-box">
        <div className="modal-inner-box">
            <div className="modal-title">
                <h2 id="modal-title">Detail Data Pelayanan</h2>
            </div>
            <div className="edit-modal-content">

                <div className="submenu-section">
                    <div className="submenu-title">
                        <h3>
                           <BiGroup /> Identitas Wajib Pajak
                        </h3>
                    </div>
                    <div className="submenu-content">
                    {editModalData?.nama?.length > 0 ? editModalData?.nama : `-`} ({editModalData?.kategori?.length > 0 ? editModalData?.kategori : `-`})
                    <br/>
                    {editModalData?.npwp?.length > 0 ? npwpinput(editModalData?.npwp) : `-`} - ( {editModalData?.klu?.length > 0 ? editModalData?.klu : `-`})
                    <br/>
                    <br/>
                    Lokasi : {editModalData?.alamat?.length > 0 ? editModalData?.alamat : `-`}
                    <br/>
                    No. Identitas : {editModalData?.nik?.length > 0 ? editModalData?.nik : `-`}
                    </div>
                </div>

                <div className="submenu-section">
                    <div className="submenu-title">
                        <h3>
                           <BiPhoneCall/> Kontak
                        </h3>
                    </div>
                    <div className="submenu-content">
                        Nomor HP : {editModalData?.nomorhp?.length > 0 ? editModalData?.nomorhp : `-`}
                        <br/>
                        Email : {editModalData?.email?.length > 0 ? editModalData?.email : `-`}
                    </div>
                </div>

                <div className="submenu-section">
                    <div className="submenu-title">
                        <h3>
                          <BiFileFind/>  Kepentingan
                        </h3>
                    </div>
                    <div className="submenu-content">
                    
                        {editModalData?.kepentingan?.main?.map((checked,idt) => {
                            if (editModalData?.kepentingan?.main?.length === idt+1)  {return`${checked} `} else return `${checked} , `
                        })} {editModalData?.kepentingan?.desc.length > 0 && editModalData?.kepentingan?.main.length > 0 ? `, ${editModalData?.kepentingan?.desc}` : editModalData?.kepentingan?.desc.length > 0 && editModalData?.kepentingan?.main.length < 1  ? editModalData?.kepentingan?.desc : ``}
                    
                    {/* {editModalData?.kepentingan?.main?.length > 0 ? `${checked} ` : `${checked} | `} {editModalData?.kepentingan?.desc?.length > 0 ? editModalData?.kepentingan?.desc : `-`} */}
                    </div>
                </div>

                <div className="submenu-section">
                    <div className="submenu-title">
                        <h3>
                           <BiSend/> Penyelesaian
                        </h3>
                    </div>
                    <div className="submenu-content">
                        {editModalData?.penyelesaian?.length > 0 ? editModalData?.penyelesaian : `-`}
                    </div>
                </div>
                
                <div className="submenu-section">
                    <div className="submenu-title">
                        <h3>
                          <BiPaperPlane/>  Loket Pelayanan
                        </h3>
                    </div>
                    <div className="submenu-content">
                        {editModalData?.loket?.length > 0 ? editModalData?.loket : `-`}
                    </div>
                </div>
            </div>
        </div>
        <div className="close-container"><GoX onClick={closeModal}/></div>
    </div>
</div>
  )
}

export default EditModal