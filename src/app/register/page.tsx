  m,"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", password:"", phone:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  function update(key: string, val: string) {
    setForm(p => ({ ...p, [key]: val }));
  }

  async function handleRegister() {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { first_name: form.firstName, last_name: form.lastName, phone: form.phone }
      }
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  const inputStyle = {
    width:"100%", padding:"12px 14px", border:"1.5px solid #EDE7D9",
    borderRadius:6, fontFamily:"'Jost',sans-serif", fontSize:14,
    background:"white", outline:"none", marginBottom:16,
  };
  const labelStyle = {
    fontSize:10, letterSpacing:".12em", textTransform:"uppercase" as const,
    color:"#4D7A5E", display:"block", marginBottom:6,
  };

  return (
    <div style={{minHeight:"100vh",display:"grid",gridTemplateColumns:"1fr 1fr",fontFamily:"'Jost',sans-serif"}}>
      <div style={{background:"#2E5040",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{color:"rgba(255,255,255,0.6)",fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontStyle:"italic",padding:48,textAlign:"center"}}>
          "De sportschool voor je binnenwereld."
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",padding:"56px 48px",background:"#F4EFE6"}}>
        <div style={{maxWidth:400}}>
          <div style={{fontSize:10,letterSpacing:".16em",textTransform:"uppercase",color:"#4D7A5E",marginBottom:10}}>Account aanmaken</div>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:38,fontWeight:300,color:"#2E5040",marginBottom:8}}>Begin hier</h1>
          <p style={{fontSize:13,fontWeight:300,color:"#1E2420",opacity:.6,marginBottom:32,lineHeight:1.7}}>Maak een account aan om sessies te boeken en je lidmaatschap te beheren.</p>

          {error && <div style={{fontSize:13,color:"#C0392B",marginBottom:16}}>{error}</div>}

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div>
              <label style={labelStyle}>Voornaam</label>
              <input type="text" value={form.firstName} onChange={e=>update("firstName",e.target.value)}
                placeholder="Daniel" style={inputStyle}/>
            </div>
            <div>
              <label style={labelStyle}>Achternaam</label>
              <input type="text" value={form.lastName} onChange={e=>update("lastName",e.target.value)}
                placeholder="Vissers" style={inputStyle}/>
            </div>
          </div>
          <label style={labelStyle}>E-mailadres</label>
          <input type="email" value={form.email} onChange={e=>update("email",e.target.value)}
            placeholder="jou@email.com" style={inputStyle}/>
          <label style={labelStyle}>Telefoon (optioneel)</label>
          <input type="tel" value={form.phone} onChange={e=>update("phone",e.target.value)}
            placeholder="+31 6 12345678" style={inputStyle}/>
          <label style={labelStyle}>Wachtwoord</label>
          <input type="password" value={form.password} onChange={e=>update("password",e.target.value)}
            placeholder="Minimaal 8 tekens" style={inputStyle}/>

          <button onClick={handleRegister} disabled={loading}
            style={{width:"100%",background:"#2E5040",color:"#F4EFE6",border:"none",padding:15,borderRadius:3,fontFamily:"'Jost',sans-serif",fontSize:11,letterSpacing:".14em",textTransform:"uppercase",cursor:"pointer",marginBottom:20,marginTop:8}}>
            {loading ? "Bezig..." : "Account aanmaken →"}
          </button>
          <div style={{textAlign:"center",fontSize:12,color:"#1E2420",opacity:.6}}>
            Al een account?{" "}
            <span onClick={()=>router.push("/login")} style={{color:"#4D7A5E",cursor:"pointer",fontWeight:500}}>Inloggen</span>
          </div>
        </div>
      </div>
    </div>
  );
}