"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin() {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("E-mail of wachtwoord onjuist.");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  async function handleForgot() {
    if (!email) { setError("Vul eerst je e-mailadres in."); return; }
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setError("✓ Resetlink verstuurd naar " + email);
  }

  return (
    <div style={{minHeight:"100vh",display:"grid",gridTemplateColumns:"1fr 1fr",fontFamily:"'Jost',sans-serif"}}>
      <div style={{background:"#2E5040",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{color:"rgba(255,255,255,0.6)",fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontStyle:"italic",padding:48,textAlign:"center"}}>
          "Jouw vaste plek om te vertragen,<br/>te verdiepen en te groeien."
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",padding:"56px 48px",background:"#F4EFE6"}}>
        <div style={{maxWidth:400}}>
          <div style={{fontSize:10,letterSpacing:".16em",textTransform:"uppercase",color:"#4D7A5E",marginBottom:10}}>Welkom terug</div>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:38,fontWeight:300,color:"#2E5040",marginBottom:32}}>Inloggen</h1>
          {error && <div style={{fontSize:13,color:error.startsWith("✓")?"#4D7A5E":"#C0392B",marginBottom:16}}>{error}</div>}
          <div style={{marginBottom:16}}>
            <label style={{fontSize:10,letterSpacing:".12em",textTransform:"uppercase",color:"#4D7A5E",display:"block",marginBottom:6}}>E-mailadres</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
              placeholder="jou@email.com"
              style={{width:"100%",padding:"12px 14px",border:"1.5px solid #EDE7D9",borderRadius:6,fontFamily:"'Jost',sans-serif",fontSize:14,background:"white",outline:"none"}}/>
          </div>
          <div style={{marginBottom:8}}>
            <label style={{fontSize:10,letterSpacing:".12em",textTransform:"uppercase",color:"#4D7A5E",display:"block",marginBottom:6}}>Wachtwoord</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={e=>e.key==="Enter"&&handleLogin()}
              style={{width:"100%",padding:"12px 14px",border:"1.5px solid #EDE7D9",borderRadius:6,fontFamily:"'Jost',sans-serif",fontSize:14,background:"white",outline:"none"}}/>
          </div>
          <div style={{textAlign:"right",marginBottom:24}}>
            <span onClick={handleForgot} style={{fontSize:11,color:"#4D7A5E",cursor:"pointer"}}>Wachtwoord vergeten?</span>
          </div>
          <button onClick={handleLogin} disabled={loading}
            style={{width:"100%",background:"#2E5040",color:"#F4EFE6",border:"none",padding:15,borderRadius:3,fontFamily:"'Jost',sans-serif",fontSize:11,letterSpacing:".14em",textTransform:"uppercase",cursor:"pointer",marginBottom:20}}>
            {loading ? "Bezig..." : "Inloggen →"}
          </button>
          <div style={{textAlign:"center",fontSize:12,color:"#1E2420",opacity:.6}}>
            Nog geen account?{" "}
            <span onClick={()=>router.push("/register")} style={{color:"#4D7A5E",cursor:"pointer",fontWeight:500}}>Begin hier</span>
          </div>
        </div>
      </div>
    </div>
  );
}