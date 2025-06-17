'use client';
import { useEffect, useState, useRef } from 'react';

const sexualInterests = [
  "Flirtare", "Baci intensi", "Abbracci lunghi", "Tenersi per mano", "Conversazioni piccanti", "Momenti intimi", "Massaggi rilassanti", "Giochi creativi di coppia", "Sguardi intensi", "Essere ammirati", "Ruoli di coppia", "Dinamiche affettive", "Stuzzicare con le parole", "Sorpresa e mistero", "Atmosfere intriganti", "Gesti audaci", "Intimità dolce", "Attimi spontanei", "Connessione profonda", "Fare l'amore con lentezza", "Emozioni all'aperto", "Intesa in pubblico", "Oggetti del piacere", "Materiali particolari (es. pelle)", "Piccole passioni", "Carezze e coccole", "Gioco vivace", "Romanticismo sensuale", "Esperienze fuori dagli schemi", "Arte del legame emotivo", "Intimità in doccia", "Giochi con riflessi", "Seduzione elegante", "Esplorazione orale", "Ricevere attenzioni", "Esplorazione profonda", "Relazione a più livelli", "Esperienze condivise", "Curiosità osservativa", "Dolce guida reciproca", "Sensazioni particolari", "Legami simbolici", "Attesa e desiderio", "Contatto visivo coinvolgente", "Mistero e sorpresa", "Giochi leggeri", "Intimità virtuale", "Libertà di fantasia", "Emozioni alternative", "Condivisione di segreti"
];
const personaOptions = [
  "Creativo e sognatore", "Ambizioso e determinato", "Simpatico e socievole", "Romantico e affettuoso", "Misterioso e intrigante", "Selvaggio e spontaneo", "Dolce ma deciso"
];
const cercaOptions = [
  'In cerca di passione',
  'Voglio solo divertirmi',
  'Voglio chattare in modo erotico online',
  'Voglio una relazione seria',
];
const lontanoOptions = [
  "Solo nella mia città",
  "Anche nella mia regione",
  "In tutta Italia",
  "Ovunque, se ne vale la pena 😏"
];

export default function SignupPromptModal() {
  const [show, setShow] = useState(true); // always show for demo
  const [step, setStep] = useState(1);
  const [vediTutti, setVediTutti] = useState(false);
  const [form, setForm] = useState({
    nome: '',
    cognome: '',
    email: '',
    localita: '',
    nomeProfilo: '',
    eta: '',
    genere: '',
    altroGenere: '',
    photos: [] as File[],
    bio: '',
    cerca: '',
    personaSei: [] as string[],
    personaCerchi: [] as string[],
    lontano: '',
    interessi: [] as string[],
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 1: Dati personali
  const step1Valid = form.nome && form.cognome && form.email && form.localita;
  // Step 2: Profilo
  const step2Valid = form.nomeProfilo && form.eta && form.genere && (form.genere !== 'Altro' || form.altroGenere) && form.photos.length && form.bio && form.cerca;
  // Step 3: Dicci qualcosa in più
  const step3Valid = form.personaSei.length > 0 && form.personaSei.length <= 2 && form.personaCerchi.length > 0 && form.personaCerchi.length <= 4 && form.lontano && form.interessi.length > 0;

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 6);
    setForm(f => ({ ...f, photos: files }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const handleOption = (val: string) => setForm(f => ({ ...f, cerca: val }));
  const handlePersonaSei = (val: string) => setForm(f => {
    const arr = f.personaSei.includes(val)
      ? f.personaSei.filter(x => x !== val)
      : f.personaSei.length < 2 ? [...f.personaSei, val] : f.personaSei;
    return { ...f, personaSei: arr };
  });
  const handlePersonaCerchi = (val: string) => setForm(f => {
    const arr = f.personaCerchi.includes(val)
      ? f.personaCerchi.filter(x => x !== val)
      : f.personaCerchi.length < 4 ? [...f.personaCerchi, val] : f.personaCerchi;
    return { ...f, personaCerchi: arr };
  });
  const handleInteressi = (val: string) => setForm(f => {
    const arr = f.interessi.includes(val)
      ? f.interessi.filter(x => x !== val)
      : [...f.interessi, val];
    return { ...f, interessi: arr };
  });
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setShow(false);
  };
  const handleBack = () => setStep(s => Math.max(1, s - 1));
  const handleAvanti = () => setStep(s => Math.min(3, s + 1));

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100vw';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-container rounded-2xl shadow-xl text-center max-w-xs w-full max-h-[95vh] flex flex-col">
        {/* Progress Bar */}
        <div className="mb-4 flex items-center justify-between px-4 pt-4">
          <span className="text-main text-sm font-semibold">{step} di 3</span>
          <div className="flex-1 mx-2 h-2 bg-main rounded-full overflow-hidden">
            <div className="h-2 bg-purple rounded-full transition-all" style={{ width: `${step * 33.33}%` }} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-2">
        {step === 1 && (
          <form className="flex flex-col gap-3 text-left" onSubmit={e => { e.preventDefault(); handleAvanti(); }}>
            <h2 className="text-main text-xl font-bold mb-2 text-center">Dati personali</h2>
            <label className="text-main text-sm font-semibold">Nome</label>
            <input name="nome" value={form.nome} onChange={handleChange} required className="bg-main text-main rounded px-3 py-2 mb-1" placeholder="Il tuo nome" />
            <label className="text-main text-sm font-semibold">Cognome</label>
            <input name="cognome" value={form.cognome} onChange={handleChange} required className="bg-main text-main rounded px-3 py-2 mb-1" placeholder="Il tuo cognome" />
            <label className="text-main text-sm font-semibold">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="bg-main text-main rounded px-3 py-2 mb-1" placeholder="La tua email" />
            <label className="text-main text-sm font-semibold">Località</label>
            <input name="localita" value={form.localita} onChange={handleChange} required className="bg-main text-main rounded px-3 py-2 mb-1" placeholder="Città o paese" />
            <p className="text-main text-xs mt-2">Questi dati servono solo per motivi legali e verranno trattati con la massima discrezione. Non saranno mai mostrati ad altri utenti.</p>
          </form>
        )}
        {step === 2 && (
          <form className="flex flex-col gap-3 text-left" onSubmit={e => { e.preventDefault(); handleAvanti(); }}>
            <h2 className="text-main text-xl font-bold mb-2 text-center">Profilo</h2>
            <label className="text-main text-sm font-semibold">Nome profilo <span className="text-xs font-normal">(Può essere inventato e anche sexy se vuoi)</span></label>
            <input name="nomeProfilo" value={form.nomeProfilo} onChange={handleChange} required className="bg-main text-main rounded px-3 py-2 mb-1" placeholder="Nome profilo" />
            <label className="text-main text-sm font-semibold">Età</label>
            <input name="eta" type="number" min={18} max={100} value={form.eta} onChange={handleChange} required className="bg-main text-main rounded px-3 py-2 mb-1" placeholder="Età" />
            <label className="text-main text-sm font-semibold">Genere</label>
            <div className="flex gap-2 mb-1">
              {['Uomo', 'Donna', 'Altro'].map(opt => (
                <label key={opt} className="flex items-center gap-1 text-main text-sm">
                  <input type="radio" name="genere" value={opt} checked={form.genere === opt} onChange={handleChange} /> {opt}
                </label>
              ))}
            </div>
            {form.genere === 'Altro' && (
              <input name="altroGenere" value={form.altroGenere} onChange={handleChange} className="bg-main text-main rounded px-3 py-2 mb-1" placeholder="Specifica..." />
            )}
            <label className="text-main text-sm font-semibold">Foto profilo (1-6)</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              className="bg-main text-main rounded px-3 py-2 mb-1"
            />
            <div className="flex flex-wrap gap-2 mb-2">
              {form.photos.map((file, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(file)}
                  alt="anteprima"
                  className="w-12 h-12 object-cover rounded shadow border border-purple"
                />
              ))}
            </div>
            <label className="text-main text-sm font-semibold">Scrivi qualcosa su di te</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} required className="bg-main text-main rounded px-3 py-2 mb-1" placeholder="Parla di te..." />
            <label className="text-main text-sm font-semibold mb-1">Cosa cerchi?</label>
            <div className="flex flex-col gap-2 mb-2">
              {cercaOptions.map(opt => (
                <button
                  type="button"
                  key={opt}
                  className={`rounded-full px-3 py-1 border font-medium text-sm shadow ${form.cerca === opt ? 'bg-cta text-main border-purple' : 'bg-main text-main border-purple/40'}`}
                  onClick={() => handleOption(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </form>
        )}
        {step === 3 && (
          <form className="flex flex-col gap-3 text-left" onSubmit={handleSignup}>
            <h2 className="text-main text-xl font-bold mb-2 text-center">Dicci qualcosa in più</h2>
            <label className="text-main text-sm font-semibold mb-1">Che tipo di persona sei? <span className="text-xs">(max 2)</span></label>
            <div className="flex flex-wrap gap-2 mb-2">
              {personaOptions.map(opt => (
                <button
                  type="button"
                  key={opt}
                  className={`rounded-full px-3 py-1 border font-medium text-sm shadow ${form.personaSei.includes(opt) ? 'bg-cta text-main border-purple' : 'bg-main text-main border-purple/40'}`}
                  onClick={() => handlePersonaSei(opt)}
                  disabled={!form.personaSei.includes(opt) && form.personaSei.length >= 2}
                >
                  {opt}
                </button>
              ))}
            </div>
            <label className="text-main text-sm font-semibold mb-1">Che tipo di persona cerchi? <span className="text-xs">(max 4)</span></label>
            <div className="flex flex-wrap gap-2 mb-2">
              {personaOptions.map(opt => (
                <button
                  type="button"
                  key={opt}
                  className={`rounded-full px-3 py-1 border font-medium text-sm shadow ${form.personaCerchi.includes(opt) ? 'bg-cta text-main border-purple' : 'bg-main text-main border-purple/40'}`}
                  onClick={() => handlePersonaCerchi(opt)}
                  disabled={!form.personaCerchi.includes(opt) && form.personaCerchi.length >= 4}
                >
                  {opt}
                </button>
              ))}
            </div>
            <label className="text-main text-sm font-semibold mb-1">Quanto lontano sei disposto a conoscere qualcuno?</label>
            <div className="flex flex-col gap-2 mb-2">
              {lontanoOptions.map(opt => (
                <label key={opt} className="flex items-center gap-2 text-main text-sm">
                  <input type="radio" name="lontano" value={opt} checked={form.lontano === opt} onChange={handleChange} /> {opt}
                </label>
              ))}
            </div>
            <label className="text-main text-sm font-semibold mb-1">Interessi sessuali</label>
            <div className="flex flex-wrap gap-2 mb-2 max-h-32 overflow-y-auto">
              {(vediTutti ? sexualInterests : sexualInterests.slice(0, 10)).map(opt => (
                <button
                  type="button"
                  key={opt}
                  className={`rounded-full px-3 py-1 border font-medium text-sm shadow ${form.interessi.includes(opt) ? 'bg-cta text-main border-purple' : 'bg-main text-main border-purple/40'}`}
                  onClick={() => handleInteressi(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            {!vediTutti && (
              <button type="button" className="text-purple underline text-sm mb-2" onClick={() => setVediTutti(true)}>
                Vedi di più
              </button>
            )}
          </form>
        )}
        </div>
        {/* Sticky footer for navigation */}
        <div className="sticky bottom-0 left-0 right-0 bg-container rounded-b-2xl pt-2 pb-4 px-4 flex gap-2 z-10">
          {step > 1 && (
            <button type="button" className="bg-purple text-main font-bold px-4 py-2 rounded-full shadow flex-1" onClick={handleBack}>Indietro</button>
          )}
          {step < 3 && (
            <button type="button" className="bg-cta text-main font-bold px-4 py-2 rounded-full shadow flex-1" onClick={handleAvanti} disabled={step === 1 ? !step1Valid : !step2Valid}>Avanti</button>
          )}
          {step === 3 && (
            <button type="button" className="bg-cta text-main font-bold px-4 py-2 rounded-full shadow flex-1" onClick={handleSignup} disabled={!step3Valid}>Crea Account</button>
          )}
        </div>
      </div>
    </div>
  );
} 