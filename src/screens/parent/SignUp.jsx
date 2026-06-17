import { useState, useRef, useEffect } from 'react';
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

export function ParentSignUp() {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [childName, setChildName] = useState('');
  const [childClass, setChildClass] = useState('');
  const [childSection, setChildSection] = useState('');

  const otpRefs = useRef([]);

  const nextStep = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };

  const handleComplete = async () => {
    setLoading(true);
    setError('');

    const payload = {
      full_name: fullName,
      email: email,
      password: password,
      phone_number: phone,
      verification_code: verificationCode.join(''),
      child_name: childName,
      child_class: childClass,
      child_section: childSection,
    };

    console.log("Parent Signup Payload (Ready for Backend):", payload);

    // Mock successful signup
    setTimeout(() => {
      const mockResponse = {
        access_token: "mock_token_parent_123",
        user: { id: 2, role: "parent", name: fullName }
      };
      
      saveAuthSession(mockResponse);
      setRole('parent');
      navigate('/parent/home');
      setLoading(false);
    }, 1000);
  };

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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col flex-1 h-full pt-20">
            <h1 className="text-[40px] leading-tight mb-4">What's your full<br/>name?</h1>
            <p className="text-[16px] text-white/70 mb-10">Enter your full name.</p>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full bg-black border border-[#333] rounded-[12px] px-5 py-4 text-[16px] text-white placeholder:text-white/40 focus:border-[#7c3aed] focus:outline-none transition-colors"
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
      case 2:
        return (
          <div className="flex flex-col flex-1 h-full pt-20">
            <h1 className="text-[40px] leading-tight mb-4">What's your<br/>email?</h1>
            <p className="text-[16px] text-white/70 mb-10 pr-4">We'll use this to send important updates and verify your account.</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-black border border-[#333] rounded-[12px] px-5 py-4 text-[16px] text-white placeholder:text-white/40 focus:border-[#7c3aed] focus:outline-none transition-colors"
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
      case 3:
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
                className="w-full bg-black border border-[#333] rounded-[12px] px-5 py-4 text-[16px] text-white placeholder:text-white/40 focus:border-[#7c3aed] focus:outline-none transition-colors"
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
      case 4:
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
                className="w-full bg-black border border-[#333] rounded-[12px] pl-12 pr-5 py-4 text-[16px] text-white placeholder:text-white/40 focus:border-[#7c3aed] focus:outline-none transition-colors"
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
      case 5:
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
      case 6:
        return (
          <div className="flex flex-col flex-1 h-full pt-20">
            <h1 className="text-[40px] leading-tight mb-4">What's your<br/>child's name?</h1>
            <p className="text-[16px] text-white/70 mb-10">Enter your child's full name.</p>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Child Name"
              className="w-full bg-black border border-[#333] rounded-[12px] px-5 py-4 text-[16px] text-white placeholder:text-white/40 focus:border-[#7c3aed] focus:outline-none transition-colors"
              autoFocus
            />
            <button
              onClick={nextStep}
              disabled={!childName}
              className="mt-auto mb-10 w-full bg-white text-black font-serif text-[20px] rounded-[12px] py-[14px] disabled:opacity-50 transition-opacity"
            >
              Continue
            </button>
          </div>
        );
      case 7:
        return (
          <div className="flex flex-col flex-1 h-full pt-20">
            <h1 className="text-[40px] leading-tight mb-4">Which class is<br/>your child in?</h1>
            <p className="text-[16px] text-white/70 mb-10">Select your child's current class.</p>
            
            <div className="flex flex-col border border-[#333] rounded-[16px] overflow-hidden bg-black/50">
              {['6th', '7th', '8th', '9th', '10th', '11th', '12th'].map((cls, idx, arr) => (
                <button
                  key={cls}
                  onClick={() => setChildClass(cls)}
                  className={`flex items-center gap-4 px-6 py-5 w-full text-left transition-colors ${
                    childClass === cls ? 'bg-white/5' : 'hover:bg-white/5'
                  } ${idx !== arr.length - 1 ? 'border-b border-[#222]' : ''}`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    childClass === cls ? 'border-[#a78bfa]' : 'border-[#444]'
                  }`}>
                    {childClass === cls && <div className="w-3 h-3 rounded-full bg-[#a78bfa]" />}
                  </div>
                  <span className={`text-[17px] ${childClass === cls ? 'text-white' : 'text-white/80'}`}>
                    {cls}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={nextStep}
              disabled={!childClass}
              className="mt-10 mb-10 w-full bg-white text-black font-serif text-[20px] rounded-[12px] py-[14px] disabled:opacity-50 transition-opacity mt-auto"
            >
              Continue
            </button>
          </div>
        );
      case 8:
        return (
          <div className="flex flex-col flex-1 h-full pt-20">
            <h1 className="text-[40px] leading-tight mb-4">Which section is<br/>your child in?</h1>
            <p className="text-[16px] text-white/70 mb-10">Select your child's section.</p>
            
            <div className="grid grid-cols-2 gap-4">
              {['A', 'B', 'C', 'D', 'E', 'F'].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setChildSection(sec)}
                  className={`flex items-center justify-center h-[100px] border rounded-[16px] text-[32px] font-serif transition-colors ${
                    childSection === sec 
                      ? 'border-[#a78bfa] bg-[#a78bfa]/10 text-white' 
                      : 'border-[#333] bg-transparent text-white/80 hover:bg-white/5'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>

            <button
              onClick={nextStep}
              disabled={!childSection}
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
              backgroundImage: `url('/parent/completion.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Dark gradient fade at the bottom for button visibility if needed */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col flex-1 justify-end pb-12 w-full">
              <button
                onClick={handleComplete}
                disabled={loading}
                className="w-full h-16 bg-transparent text-transparent outline-none border-none focus:outline-none"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {loading ? 'Entering...' : 'Enter InMind'}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-black text-white font-serif relative overflow-hidden">
      
      {/* Back Button */}
      {step > 1 && (
        <button
          onClick={() => {
            setDirection(-1);
            setStep((s) => s - 1);
          }}
          className="absolute top-12 left-6 z-20 text-white flex items-center p-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
      )}

      {/* Main Content Area */}
      <div className="flex-1 relative px-8 pt-10">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0 px-8 flex flex-col"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
