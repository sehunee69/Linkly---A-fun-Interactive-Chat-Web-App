import LoginForm  from '@/features/auth/components/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-accent/15 blur-[80px] -top-32 -right-24 animate-glow" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-accent-2/15 blur-[80px] -bottom-24 -left-24 animate-glow [animation-direction:reverse]" />
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(124,106,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,106,255,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-[420px] mx-4 px-10 py-12 bg-bg-2 border border-border rounded-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_32px_80px_rgba(0,0,0,0.5)] animate-fadeUp">
        <div className="flex items-center gap-2.5 mb-8 font-bold text-[18px] tracking-tight">
          <span className="text-accent text-[22px] drop-shadow-[0_0_8px_rgba(124,106,255,1)]">⬡</span>
          ChatApp
        </div>
        <div className="mb-8">
          <h1 className="text-[28px] font-extrabold tracking-tight text-text mb-1.5">Welcome back</h1>
          <p className="font-mono text-sm text-text-2 font-light">Sign in to continue your conversations</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}