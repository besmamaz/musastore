import React, {useState} from 'react'
export default function ContactPage(){
  const [s, setS] = useState({name:'', email:'', message:''})
  const [ok, setOk] = useState(false)
  const submit = (e)=>{ e.preventDefault(); setOk(true); setTimeout(()=>setOk(false), 2000); setS({name:'', email:'', message:''}) }
  return (
    <div className="container">
      <div className="section-title"><h2>Contactez-nous</h2></div>
      <form onSubmit={submit}>
        <input name="name" value={s.name} onChange={e=>setS({...s,name:e.target.value})} className="form-input" placeholder="Nom"/>
        <input name="email" value={s.email} onChange={e=>setS({...s,email:e.target.value})} className="form-input" placeholder="Email"/>
        <textarea name="message" value={s.message} onChange={e=>setS({...s,message:e.target.value})} className="form-textarea" placeholder="Message"/>
        <button className="btn btn-primary">Envoyer</button>
      </form>
      {ok && <div className="modal-overlay"><div className="modal"><h2>Message envoyé</h2></div></div>}
    </div>
  )
}