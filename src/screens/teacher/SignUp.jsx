import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useRole } from '../../context/RoleContext';
import { saveAuthSession } from '../../lib/api';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export function TeacherSignUp() {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [idUploaded, setIdUploaded] = useState(false);
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [day, setDay] = useState('09');
  const [month, setMonth] = useState('May');
  const [year, setYear] = useState('2008');

  const otpRefs = useRef([]);

  const days = Array.from({length: 31}, (_, i) => (i + 1).toString().padStart(2, '0'));
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = Array.from({length: 50}, (_, i) => (new Date().getFullYear() - 13 - i).toString());

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const nextStep = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const handleComplete = () => {
    setLoading(true);

    const payload = {
      full_name: fullName,
      email: email,
      password: password,
      phone_number: phone,
      id_uploaded: idUploaded,
      verification_code: verificationCode.join(''),
      dob: `${year}-${month}-${day}`
    };

    console.log("Teacher Signup Payload (Ready for Backend):", payload);

    // Mock completing the teacher signup flow
    setTimeout(() => {
      const mockResponse = {
        access_token: "mock_token_teacher_123",
        user: { id: 3, role: "teacher", name: fullName }
      };
      
      saveAuthSession(mockResponse);
      setRole('teacher');
      navigate('/teacher/home');
      setLoading(false);
    }, 1000);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div 
            className="flex flex-col min-h-[100dvh] relative text-white font-serif -mx-8 -my-10 pt-10 px-8 pb-12"
            style={{
              backgroundImage: `url('/teacher/signup.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Dark gradient overlay for text readability at the top */}
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col flex-1 pt-[110px]">
              <h1 className="text-[44px] leading-[1.1] mb-auto tracking-wide drop-shadow-md">
                Your teaching<br/>journey starts<br/>here.
              </h1>

              <button
                onClick={nextStep}
                className="w-full mt-auto bg-black text-white font-serif text-[22px] tracking-wide py-[16px] rounded-[14px] shadow-2xl transition-transform active:scale-95"
              >
                Continue
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col flex-1 h-full pt-20">
            <h1 className="text-[40px] leading-tight mb-4">What's your full<br/>name?</h1>
            <p className="text-[16px] text-white/70 mb-10">Enter your full name.</p>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full bg-black border border-[#333] rounded-[12px] px-5 py-4 text-[16px] text-white placeholder:text-white/40 focus:border-white focus:outline-none transition-colors"
              autoFocus
            />
            <button
              onClick={nextStep}
              disabled={!fullName}
              className="mt-auto mb-10 w-full bg-white text-black font-serif text-[20px] rounded-[12px] py-[14px] disabled:opacity-50 transition-opacity"
            >
              Continue
            </button>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col flex-1 h-full pt-20">
            <h1 className="text-[40px] leading-tight mb-4">What's your<br/>email?</h1>
            <p className="text-[16px] text-white/70 mb-10 pr-4">We'll use this to send important updates and verify your account.</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-black border border-[#333] rounded-[12px] px-5 py-4 text-[16px] text-white placeholder:text-white/40 focus:border-white focus:outline-none transition-colors"
              autoFocus
            />
            <button
              onClick={nextStep}
              disabled={!email || !email.includes('@')}
              className="mt-auto mb-10 w-full bg-white text-black font-serif text-[20px] rounded-[12px] py-[14px] disabled:opacity-50 transition-opacity"
            >
              Continue
            </button>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col flex-1 h-full pt-20">
            <h1 className="text-[36px] leading-tight mb-4">Create a password</h1>
            <p className="text-[16px] text-white/70 mb-10 pr-4">Make sure it's something only you can remember.</p>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-black border border-[#333] rounded-[12px] px-5 py-4 text-[16px] text-white placeholder:text-white/40 focus:border-white focus:outline-none transition-colors"
                autoFocus
              />
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <button
              onClick={nextStep}
              disabled={password.length < 6}
              className="mt-auto mb-10 w-full bg-white text-black font-serif text-[20px] rounded-[12px] py-[14px] disabled:opacity-50 transition-opacity"
            >
              Continue
            </button>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col flex-1 h-full pt-20">
            <h1 className="text-[40px] leading-tight mb-4">Upload your<br/>teacher ID</h1>
            <p className="text-[16px] text-white/70 mb-10 pr-4">Upload a clear photo of your ID card.</p>
            
            <div className="flex flex-col items-center justify-center mt-8">
              <button
                onClick={() => setIdUploaded(true)}
                className={`w-[140px] h-[140px] rounded-full border border-[#333] flex items-center justify-center transition-colors ${idUploaded ? 'bg-white/10 border-white/40' : 'bg-transparent hover:bg-white/5'}`}
              >
                {idUploaded ? (
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                )}
              </button>
              <div className="mt-8 text-center">
                <p className="text-white text-[16px] font-medium mb-2">{idUploaded ? 'Uploaded Successfully' : 'Tap to upload'}</p>
                <p className="text-white/50 text-[13px]">jpg,pdf,png up to 5MB</p>
              </div>
            </div>

            <button
              onClick={nextStep}
              disabled={!idUploaded}
              className="mt-auto mb-10 w-full bg-white text-black font-serif text-[20px] rounded-[12px] py-[14px] disabled:opacity-50 transition-opacity"
            >
              Continue
            </button>
          </div>
        );
      case 6:
        return (
          <div className="flex flex-col flex-1 h-full pt-20">
            <h1 className="text-[40px] leading-tight mb-4">What's your<br/>number?</h1>
            <p className="text-[16px] text-white/70 mb-10 pr-4">We'll send a verification code to this number.</p>
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full bg-black border border-[#333] rounded-[12px] pl-12 pr-5 py-4 text-[16px] text-white placeholder:text-white/40 focus:border-white focus:outline-none transition-colors"
                autoFocus
              />
            </div>
            <button
              onClick={nextStep}
              disabled={phone.length < 8}
              className="mt-auto mb-10 w-full bg-white text-black font-serif text-[20px] rounded-[12px] py-[14px] disabled:opacity-50 transition-opacity"
            >
              Continue
            </button>
          </div>
        );
      case 7:
        return (
          <div className="flex flex-col flex-1 h-full pt-20">
            <h1 className="text-[40px] leading-tight mb-4">Verify your<br/>number</h1>
            <p className="text-[16px] text-white/70 mb-10">
              Enter the 6-digit code<br/>sent to <span className="text-[#a78bfa] font-medium">+91 {phone || '98765 43210'}</span>
            </p>
            
            <div className="flex justify-between w-full max-w-[340px] mx-auto gap-2">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-16 bg-transparent border border-[#444] rounded-[8px] text-center text-white text-[24px] focus:border-[#a78bfa] focus:outline-none transition-colors"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <div className="mt-12 text-center text-[14px]">
              <p className="text-white/60 mb-2">Didn't get the code?</p>
              <p className="text-[#a78bfa]">Resend in 00:30</p>
            </div>

            <button
              onClick={nextStep}
              disabled={verificationCode.some(d => !d)}
              className="mt-auto mb-10 w-full bg-white text-black font-serif text-[20px] rounded-[12px] py-[14px] disabled:opacity-50 transition-opacity"
            >
              Continue
            </button>
          </div>
        );
      case 8:
        return (
          <div className="flex flex-col flex-1 h-full pt-20">
            <style>{`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
              .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            
            <h1 className="text-[40px] leading-tight mb-4">When's your<br/>birthday?</h1>
            <p className="text-[16px] text-white/70 mb-10">Select your date of birth.</p>
            
            <div className="flex gap-4 mb-6">
              {/* Day Column */}
              <div className="flex flex-col items-center flex-1">
                <div className="text-[11px] text-white/50 font-sans tracking-widest mb-3">DAY</div>
                <div 
                  className="w-full h-[240px] border border-[#222] rounded-[16px] overflow-y-auto hide-scrollbar snap-y snap-mandatory bg-[#0a0a0a]"
                  onScroll={(e) => {
                    const idx = Math.round(e.target.scrollTop / 48);
                    if (days[idx] && days[idx] !== day) setDay(days[idx]);
                  }}
                >
                  <div className="py-[106px] flex flex-col gap-5">
                    {days.map((d, i) => (
                      <div 
                        key={d}
                        onClick={(e) => {
                          e.target.parentElement.parentElement.scrollTo({ top: i * 48, behavior: 'smooth' });
                        }}
                        className={`snap-center h-[28px] flex items-center justify-center cursor-pointer text-[18px] transition-colors duration-200 ${day === d ? 'text-[#a78bfa] font-medium' : 'text-white/40'}`}
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Month Column */}
              <div className="flex flex-col items-center flex-1">
                <div className="text-[11px] text-white/50 font-sans tracking-widest mb-3">MONTH</div>
                <div 
                  className="w-full h-[240px] border border-[#222] rounded-[16px] overflow-y-auto hide-scrollbar snap-y snap-mandatory bg-[#0a0a0a]"
                  onScroll={(e) => {
                    const idx = Math.round(e.target.scrollTop / 48);
                    if (months[idx] && months[idx] !== month) setMonth(months[idx]);
                  }}
                >
                  <div className="py-[106px] flex flex-col gap-5">
                    {months.map((m, i) => (
                      <div 
                        key={m}
                        onClick={(e) => {
                          e.target.parentElement.parentElement.scrollTo({ top: i * 48, behavior: 'smooth' });
                        }}
                        className={`snap-center h-[28px] flex items-center justify-center cursor-pointer text-[18px] transition-colors duration-200 ${month === m ? 'text-[#a78bfa] font-medium' : 'text-white/40'}`}
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Year Column */}
              <div className="flex flex-col items-center flex-1">
                <div className="text-[11px] text-white/50 font-sans tracking-widest mb-3">YEAR</div>
                <div 
                  className="w-full h-[240px] border border-[#222] rounded-[16px] overflow-y-auto hide-scrollbar snap-y snap-mandatory bg-[#0a0a0a]"
                  onScroll={(e) => {
                    const idx = Math.round(e.target.scrollTop / 48);
                    if (years[idx] && years[idx] !== year) setYear(years[idx]);
                  }}
                >
                  <div className="py-[106px] flex flex-col gap-5">
                    {years.map((y, i) => (
                      <div 
                        key={y}
                        onClick={(e) => {
                          e.target.parentElement.parentElement.scrollTo({ top: i * 48, behavior: 'smooth' });
                        }}
                        className={`snap-center h-[28px] flex items-center justify-center cursor-pointer text-[18px] transition-colors duration-200 ${year === y ? 'text-[#a78bfa] font-medium' : 'text-white/40'}`}
                      >
                        {y}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white/50 text-[13px]">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              You must be at least 13 years old to continue.
            </div>

            <button
              onClick={nextStep}
              className="mt-auto mb-10 w-full bg-white text-black font-serif text-[20px] rounded-[12px] py-[14px] disabled:opacity-50 transition-opacity"
            >
              Continue
            </button>
          </div>
        );
      case 9:
        return (
          <div 
            className="flex flex-col min-h-[100dvh] relative text-white font-serif -mx-8 -my-10 pt-10 px-8"
            style={{
              backgroundImage: `url('/teacher/completion.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Dark gradient fade at the bottom for button visibility if needed */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col flex-1 justify-end pb-8 px-6 w-full h-[120px]">
              <button
                onClick={handleComplete}
                disabled={loading}
                className="w-full h-16 bg-transparent text-transparent outline-none border-none focus:outline-none"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {loading ? 'Entering...' : 'Enter'}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-black font-serif text-white px-8 py-10">
      
      {/* Back Button (Only show after step 1) */}
      <AnimatePresence>
        {step > 1 && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={prevStep}
            className="absolute left-6 top-8 z-50 p-2 text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={step}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="flex-1 flex flex-col h-full w-full"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
      
    </section>
  );
}
