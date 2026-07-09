import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Camera, CloudUpload, Phone } from 'lucide-react';
import { useRole } from '../../context/RoleContext';
import { saveAuthSession, signupStudent } from '../../lib/api';
import { loadSessionState } from '../../lib/behavioral';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0
  })
};

const BOARDS = ['CBSE', 'ICSE', 'State Board', 'IB', 'Cambridge', 'Other'];
const CLASSES = ['6th', '7th', '8th', '9th', '10th', '11th', '12th'];
const SECTIONS = ['A', 'B', 'C', 'D', 'E', 'F'];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const HEIGHTS = ["5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"", "6'0\""];

const WEIGHTS = Array.from({length: 121}, (_, i) => `${30 + i} kg`); // 30 kg to 150 kg
const DAYS = Array.from({length: 31}, (_, i) => String(i + 1).padStart(2, '0'));
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const YEARS = Array.from({length: 100}, (_, i) => String(2013 - i)); // 2013 down to 1914

export function StudentSignUp() {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [photo, setPhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Steps 6-10 State
  const [studentIdPhoto, setStudentIdPhoto] = useState(null);
  const [studentIdFile, setStudentIdFile] = useState(null);
  const [parentName, setParentName] = useState('');
  const [parentNumber, setParentNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [board, setBoard] = useState('');

  // Steps 11-18 State
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [height, setHeight] = useState('5\'5"');
  const [weight, setWeight] = useState('47 kg');
  const [birthDay, setBirthDay] = useState('09');
  const [birthMonth, setBirthMonth] = useState('May');
  const [birthYear, setBirthYear] = useState('2008');

  const otpRefs = useRef([]);

  const nextStep = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };

  const handleComplete = async () => {
    setLoading(true);
    setError('');
    
    // Convert month string to number
    const monthIndex = MONTHS.indexOf(birthMonth) + 1;
    const dobString = `${birthYear}-${String(monthIndex).padStart(2, '0')}-${birthDay}`;

    // Gather flow session data (responses + behavioral signals)
    const staticSession = loadSessionState('static');
    const dynamicSession = loadSessionState('dynamic');

    // Build the payload that matches the backend StudentSignup schema.
    // The school email doubles as the auth email for the student account.

    // Required fields — always sent (Pydantic gives a clear error if empty)
    const apiPayload = {
      email: email,
      password: password,
      roll_number: rollNumber,
    };

    // Optional fields — only include if not empty
    const optionalFields = {
      phone_number: parentNumber,
      school_email: email,
      school_name: schoolName,
      board: board,
      class_name: className,
      section: section,
      date_of_birth: dobString,
      blood_group: bloodGroup,
      height: height,
      weight: weight,
      parents_name: parentName,
      parents_phone: parentNumber,
    };

    for (const [key, val] of Object.entries(optionalFields)) {
      if (val != null && val !== '') {
        apiPayload[key] = val;
      }
    }

    console.log("Student Signup Payload:", apiPayload);

    try {
      const res = await signupStudent(apiPayload);
      if (!res?.access_token) {
        throw new Error('Signup succeeded but no session was returned.');
      }
      saveAuthSession(res);
      setRole('student');
      navigate('/student/path-select');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
      setPhotoFile(file);
    }
  };

  const handleIdUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setStudentIdPhoto(url);
      setStudentIdFile(file);
    }
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

  // Scroller logic
  const heightScrollRef = useRef(null);
  const weightScrollRef = useRef(null);
  const dayScrollRef = useRef(null);
  const monthScrollRef = useRef(null);
  const yearScrollRef = useRef(null);
  
  useEffect(() => {
    const centerScroll = (ref, array, value, itemHeight = 60) => {
      if (ref && ref.current) {
        const index = array.indexOf(value);
        if (index !== -1) {
          ref.current.scrollTo({ top: index * itemHeight, behavior: 'instant' });
        }
      }
    };

    if (step === 15) centerScroll(heightScrollRef, HEIGHTS, height, 60);
    if (step === 16) centerScroll(weightScrollRef, WEIGHTS, weight, 60);
    if (step === 17) {
      centerScroll(dayScrollRef, DAYS, birthDay, 50);
      centerScroll(monthScrollRef, MONTHS, birthMonth, 50);
      centerScroll(yearScrollRef, YEARS, birthYear, 50);
    }
  }, [step]); // eslint-disable-line

  // Step 1: Welcome/Hero
  if (step === 1) {
    return (
      <div 
        className="flex flex-col min-h-[100dvh] relative text-white font-serif"
        style={{
          backgroundImage: `url('/signup.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col flex-1 px-8 pt-32 pb-12 justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-[44px] leading-[1.1] mb-6">
              Your<br />journey<br />starts here.
            </h1>
            <p className="text-[18px] text-white/90">
              We'll guide you step by step
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            whileTap={{ scale: 0.96 }}
            onClick={nextStep}
            className="w-full bg-black text-white font-serif text-[20px] tracking-wide py-4 rounded-xl shadow-2xl border border-white/10"
          >
            Continue
          </motion.button>
        </div>
      </div>
    );
  }

  // Step 18: Completion Screen
  if (step === 18) {
    return (
      <div 
        className="flex flex-col min-h-[100dvh] relative text-white font-serif"
        style={{
          backgroundImage: `url('/signup-completion.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col flex-1 px-8 pt-20 pb-12 justify-end items-center text-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            whileTap={{ scale: 0.96 }}
            onClick={handleComplete}
            disabled={loading}
            className="w-full bg-[#5b21b6] hover:bg-[#4c1d95] text-white font-serif text-[20px] tracking-wide py-4 rounded-xl shadow-2xl transition-colors disabled:opacity-50"
          >
            {loading ? 'Entering...' : 'Enter InMind'}
          </motion.button>
          
          {error && <p className="text-red-400 mt-2 text-sm text-center absolute bottom-4 w-full">{error}</p>}
        </div>
      </div>
    );
  }

  // Steps 2-17
  return (
    <div className="flex flex-col min-h-[100dvh] bg-black text-white font-serif overflow-hidden relative">
      {/* Back button */}
      <button 
        onClick={() => {
          setDirection(-1);
          setStep((s) => s - 1);
        }}
        className="absolute top-12 left-6 z-20 text-white/60 hover:text-white"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="flex-1 flex flex-col relative px-8 pt-32 pb-12 w-full max-w-md mx-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 px-8 pt-32 flex flex-col h-full"
          >
            {step === 2 && (
              <div className="flex flex-col flex-1">
                <h1 className="text-4xl mb-4">Add your photo</h1>
                <p className="text-white/60 text-[16px] mb-16">This helps your school identify you.</p>
                
                <div className="flex flex-col items-center flex-1 mt-8">
                  <label className="relative w-40 h-40 rounded-full border border-white/20 flex items-center justify-center cursor-pointer overflow-hidden group">
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    {photo ? (
                      <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center">
                        <Camera className="w-12 h-12 text-white mb-2" />
                      </div>
                    )}
                  </label>
                  <p className="mt-6 text-white/90 text-lg">Tap to upload</p>
                  <p className="text-white/40 text-sm mt-1">jpg, pdf, png up to 5MB</p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col flex-1">
                <h1 className="text-4xl mb-4 leading-tight">What's your roll<br/>number?</h1>
                <p className="text-white/60 text-[16px] mb-12">Enter your roll number given by<br/>your school.</p>
                
                <div className="w-full relative">
                  <input 
                    type="text" 
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder="Roll Number"
                    className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 text-white text-lg placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col flex-1">
                <h1 className="text-4xl mb-4">Create a password</h1>
                <p className="text-white/60 text-[16px] mb-12">Make sure it's something only you<br/>can remember.</p>
                
                <div className="w-full relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 text-white text-lg placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-col flex-1">
                <h1 className="text-4xl mb-4 leading-tight">What's your<br/>school email?</h1>
                <p className="text-white/60 text-[16px] mb-12">We'll use this to send important<br/>updates and verify your account.</p>
                
                <div className="w-full relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 text-white text-lg placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="flex flex-col flex-1">
                <h1 className="text-4xl mb-4 leading-tight">Upload your<br/>student ID</h1>
                <p className="text-white/60 text-[16px] mb-16">Upload a clear photo of your ID<br/>card.</p>
                
                <div className="flex flex-col items-center flex-1 mt-8">
                  <label className="relative w-40 h-40 rounded-full border border-white/20 flex items-center justify-center cursor-pointer overflow-hidden group">
                    <input type="file" accept="image/*" className="hidden" onChange={handleIdUpload} />
                    {studentIdPhoto ? (
                      <img src={studentIdPhoto} alt="Student ID" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center">
                        <CloudUpload className="w-12 h-12 text-white mb-2" strokeWidth={1.5} />
                      </div>
                    )}
                  </label>
                  <p className="mt-6 text-white/90 text-lg">Tap to upload</p>
                  <p className="text-white/40 text-sm mt-1">jpg, pdf, png up to 5MB</p>
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="flex flex-col flex-1">
                <h1 className="text-4xl mb-4 leading-tight">Parent or<br/>guardian name</h1>
                <p className="text-white/60 text-[16px] mb-12">Enter your parent / guardian<br/>full name.</p>
                
                <div className="w-full relative">
                  <input 
                    type="text" 
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="Name"
                    className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 text-white text-lg placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>
              </div>
            )}

            {step === 8 && (
              <div className="flex flex-col flex-1">
                <h1 className="text-4xl mb-4 leading-tight">Parent or<br/>guardian number</h1>
                <p className="text-white/60 text-[16px] mb-12">We'll send a verification code to this<br/>number.</p>
                
                <div className="w-full relative">
                  <input 
                    type="tel" 
                    value={parentNumber}
                    onChange={(e) => setParentNumber(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full bg-transparent border border-white/20 rounded-xl px-12 py-4 text-white text-lg placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
                  />
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                </div>
              </div>
            )}

            {step === 9 && (
              <div className="flex flex-col flex-1">
                <h1 className="text-4xl mb-4 leading-tight">Verify your<br/>number</h1>
                <p className="text-white/60 text-[16px] mb-12">
                  Enter the 6-digit code<br/>sent to <span className="text-[#a78bfa]">+{parentNumber || '91 98765 43210'}</span>
                </p>
                
                <div className="flex justify-between gap-2 w-full mb-8">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={verificationCode[index]}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-[45px] h-[60px] bg-transparent border border-white/20 rounded-lg text-center text-white text-2xl focus:outline-none focus:border-white/50 transition-colors"
                    />
                  ))}
                </div>
                
                <div className="text-center mt-4">
                  <p className="text-white/60 text-sm mb-1">Didn't get the code?</p>
                  <button className="text-[#a78bfa] text-sm">Resend in 00:30</button>
                </div>
              </div>
            )}

            {step === 10 && (
              <div className="flex flex-col flex-1">
                <h1 className="text-4xl mb-4 leading-tight">Which board<br/>are you under?</h1>
                <p className="text-white/60 text-[16px] mb-8">Select the board your school<br/>is affiliated with.</p>
                
                <div className="flex flex-col gap-3 overflow-y-auto pb-4">
                  {BOARDS.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBoard(b)}
                      className={`flex items-center justify-between w-full px-5 py-4 rounded-xl border transition-colors ${
                        board === b ? 'border-white/80 bg-white/5' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <span className="text-white/90">{b}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        board === b ? 'border-white' : 'border-white/30'
                      }`}>
                        {board === b && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 11 && (
              <div className="flex flex-col flex-1">
                <h1 className="text-4xl mb-4 leading-tight">Which class<br/>are you in?</h1>
                <p className="text-white/60 text-[16px] mb-8">Select your current class.</p>
                
                <div className="flex flex-col gap-3 overflow-y-auto pb-4">
                  {CLASSES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setClassName(c)}
                      className={`flex items-center justify-between w-full px-5 py-4 rounded-xl border transition-colors ${
                        className === c ? 'border-white/80 bg-white/5' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <span className="text-white/90">{c}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        className === c ? 'border-white' : 'border-white/30'
                      }`}>
                        {className === c && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 12 && (
              <div className="flex flex-col flex-1">
                <h1 className="text-4xl mb-4 leading-tight">Which section<br/>are you in?</h1>
                <p className="text-white/60 text-[16px] mb-8">Select your current section.</p>
                
                <div className="flex flex-col gap-3 overflow-y-auto pb-4">
                  {SECTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSection(s)}
                      className={`flex items-center justify-between w-full px-5 py-4 rounded-xl border transition-colors ${
                        section === s ? 'border-white/80 bg-white/5' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <span className="text-white/90">{s}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        section === s ? 'border-white' : 'border-white/30'
                      }`}>
                        {section === s && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 13 && (
              <div className="flex flex-col flex-1">
                <h1 className="text-4xl mb-4 leading-tight">What's your<br/>school name?</h1>
                <p className="text-white/60 text-[16px] mb-12">Enter the name of your school.</p>
                
                <div className="w-full relative">
                  <input 
                    type="text" 
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="School Name"
                    className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 text-white text-lg placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>
              </div>
            )}

            {step === 14 && (
              <div className="flex flex-col flex-1">
                <h1 className="text-4xl mb-4 leading-tight">What's your<br/>blood group?</h1>
                <p className="text-white/60 text-[16px] mb-8">Select your blood group.</p>
                
                <div className="grid grid-cols-4 gap-3">
                  {BLOOD_GROUPS.map((bg) => (
                    <button
                      key={bg}
                      onClick={() => setBloodGroup(bg)}
                      className={`flex flex-col items-center justify-center py-4 rounded-xl border transition-colors ${
                        bloodGroup === bg ? 'border-white/80 bg-white/5' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <span className="text-white/90 mb-2 font-medium">{bg}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        bloodGroup === bg ? 'border-white' : 'border-white/30'
                      }`}>
                        {bloodGroup === bg && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 15 && (
              <div className="flex flex-col flex-1">
                <h1 className="text-4xl mb-4 leading-tight">What's your<br/>height?</h1>
                <p className="text-white/60 text-[16px] mb-16">Select your height.</p>
                
                <div className="flex-1 relative mask-image-vertical flex flex-col items-center h-[250px] max-h-[250px]">
                  {/* Fixed Selection Box */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[200px] h-[60px] border border-[#a78bfa]/50 bg-[#a78bfa]/10 rounded-xl pointer-events-none z-10" />
                  
                  <div 
                    className="w-full max-w-[200px] h-full overflow-y-auto hide-scrollbar snap-y snap-mandatory relative z-20"
                    ref={heightScrollRef}
                    onScroll={(e) => {
                      const index = Math.round(e.target.scrollTop / 60);
                      if (HEIGHTS[index]) setHeight(HEIGHTS[index]);
                    }}
                  >
                    <div style={{ height: '95px' }} />
                    {HEIGHTS.map((h) => {
                      const isSelected = height === h;
                      return (
                        <div
                          key={h}
                          className={`h-[60px] flex items-center justify-center snap-center transition-all duration-200 cursor-pointer ${
                            isSelected 
                              ? 'text-white text-2xl font-medium' 
                              : 'text-white/30 text-xl'
                          }`}
                          onClick={() => {
                            const idx = HEIGHTS.indexOf(h);
                            if (heightScrollRef.current) {
                              heightScrollRef.current.scrollTo({ top: idx * 60, behavior: 'smooth' });
                            }
                          }}
                        >
                          {h}
                        </div>
                      );
                    })}
                    <div style={{ height: '95px' }} />
                  </div>
                </div>
                <p className="text-center text-white/40 text-sm mt-8">Height is shown in feet and inches.</p>
              </div>
            )}

            {step === 16 && (
              <div className="flex flex-col flex-1">
                <h1 className="text-4xl mb-4 leading-tight">What's your<br/>weight?</h1>
                <p className="text-white/60 text-[16px] mb-16">Select your weight.</p>
                
                <div className="flex-1 relative mask-image-vertical flex flex-col items-center h-[250px] max-h-[250px]">
                  {/* Fixed Selection Box */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[200px] h-[60px] border border-[#a78bfa]/50 bg-[#a78bfa]/10 rounded-xl pointer-events-none z-10" />
                  
                  <div 
                    className="w-full max-w-[200px] h-full overflow-y-auto hide-scrollbar snap-y snap-mandatory relative z-20"
                    ref={weightScrollRef}
                    onScroll={(e) => {
                      const index = Math.round(e.target.scrollTop / 60);
                      if (WEIGHTS[index]) setWeight(WEIGHTS[index]);
                    }}
                  >
                    <div style={{ height: '95px' }} />
                    {WEIGHTS.map((w) => {
                      const isSelected = weight === w;
                      return (
                        <div
                          key={w}
                          className={`h-[60px] flex items-center justify-center snap-center transition-all duration-200 cursor-pointer ${
                            isSelected 
                              ? 'text-white text-2xl font-medium' 
                              : 'text-white/30 text-xl'
                          }`}
                          onClick={() => {
                            const idx = WEIGHTS.indexOf(w);
                            if (weightScrollRef.current) {
                              weightScrollRef.current.scrollTo({ top: idx * 60, behavior: 'smooth' });
                            }
                          }}
                        >
                          {w}
                        </div>
                      );
                    })}
                    <div style={{ height: '95px' }} />
                  </div>
                </div>
                <p className="text-center text-white/40 text-sm mt-8">Weight is shown in kilograms.</p>
              </div>
            )}

            {step === 17 && (
              <div className="flex flex-col flex-1">
                <h1 className="text-4xl mb-4 leading-tight">When's your<br/>birthday?</h1>
                <p className="text-white/60 text-[16px] mb-10">Select your date of birth.</p>
                
                <div className="flex justify-between px-2 mb-2 text-white/40 text-[10px] font-bold tracking-widest">
                  <span className="w-1/4 text-center">DAY</span>
                  <span className="w-2/4 text-center">MONTH</span>
                  <span className="w-1/4 text-center">YEAR</span>
                </div>

                <div className="flex-1 flex gap-2 relative mask-image-vertical h-[250px] max-h-[250px]">
                  {/* Fixed Selection Box for all 3 columns */}
                  <div className="absolute top-1/2 left-0 w-full h-[50px] -translate-y-1/2 border border-[#a78bfa]/50 bg-[#a78bfa]/10 rounded-xl pointer-events-none z-10" />
                  
                  {/* Day Picker */}
                  <div 
                    className="w-1/4 h-full overflow-y-auto hide-scrollbar snap-y snap-mandatory relative z-20" 
                    ref={dayScrollRef}
                    onScroll={(e) => {
                      const index = Math.round(e.target.scrollTop / 50);
                      if (DAYS[index]) setBirthDay(DAYS[index]);
                    }}
                  >
                    <div style={{ height: '100px' }} />
                    {DAYS.map(d => (
                      <div
                        key={d}
                        className={`h-[50px] flex items-center justify-center snap-center transition-all duration-200 cursor-pointer ${
                          birthDay === d ? 'text-[#a78bfa] text-xl font-medium' : 'text-white/30 text-lg'
                        }`}
                        onClick={() => {
                          const idx = DAYS.indexOf(d);
                          if (dayScrollRef.current) dayScrollRef.current.scrollTo({ top: idx * 50, behavior: 'smooth' });
                        }}
                      >
                        {d}
                      </div>
                    ))}
                    <div style={{ height: '100px' }} />
                  </div>

                  {/* Month Picker */}
                  <div 
                    className="w-2/4 h-full overflow-y-auto hide-scrollbar snap-y snap-mandatory relative z-20" 
                    ref={monthScrollRef}
                    onScroll={(e) => {
                      const index = Math.round(e.target.scrollTop / 50);
                      if (MONTHS[index]) setBirthMonth(MONTHS[index]);
                    }}
                  >
                    <div style={{ height: '100px' }} />
                    {MONTHS.map(m => (
                      <div
                        key={m}
                        className={`h-[50px] flex items-center justify-center snap-center transition-all duration-200 cursor-pointer ${
                          birthMonth === m ? 'text-[#a78bfa] text-xl font-medium' : 'text-white/30 text-lg'
                        }`}
                        onClick={() => {
                          const idx = MONTHS.indexOf(m);
                          if (monthScrollRef.current) monthScrollRef.current.scrollTo({ top: idx * 50, behavior: 'smooth' });
                        }}
                      >
                        {m}
                      </div>
                    ))}
                    <div style={{ height: '100px' }} />
                  </div>

                  {/* Year Picker */}
                  <div 
                    className="w-1/4 h-full overflow-y-auto hide-scrollbar snap-y snap-mandatory relative z-20" 
                    ref={yearScrollRef}
                    onScroll={(e) => {
                      const index = Math.round(e.target.scrollTop / 50);
                      if (YEARS[index]) setBirthYear(YEARS[index]);
                    }}
                  >
                    <div style={{ height: '100px' }} />
                    {YEARS.map(y => (
                      <div
                        key={y}
                        className={`h-[50px] flex items-center justify-center snap-center transition-all duration-200 cursor-pointer ${
                          birthYear === y ? 'text-[#a78bfa] text-xl font-medium' : 'text-white/30 text-lg'
                        }`}
                        onClick={() => {
                          const idx = YEARS.indexOf(y);
                          if (yearScrollRef.current) yearScrollRef.current.scrollTo({ top: idx * 50, behavior: 'smooth' });
                        }}
                      >
                        {y}
                      </div>
                    ))}
                    <div style={{ height: '100px' }} />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mt-8 text-white/50 text-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <span>You must be at least 13 years old to continue.</span>
                </div>
              </div>
            )}

            <div className="mt-auto pb-12 pt-8">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={nextStep}
                disabled={
                  loading || 
                  (step === 3 && !rollNumber) || 
                  (step === 4 && !password) || 
                  (step === 5 && !email) ||
                  (step === 7 && !parentName) ||
                  (step === 8 && !parentNumber) ||
                  (step === 9 && verificationCode.join('').length < 6) ||
                  (step === 10 && !board) ||
                  (step === 11 && !className) ||
                  (step === 12 && !section) ||
                  (step === 13 && !schoolName) ||
                  (step === 14 && !bloodGroup) ||
                  (step === 15 && !height) ||
                  (step === 16 && !weight) ||
                  (step === 17 && (!birthDay || !birthMonth || !birthYear))
                }
                className="w-full bg-white text-black font-serif text-[20px] tracking-wide py-4 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Required CSS to hide scrollbar and fade edges */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .mask-image-vertical {
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%);
        }
      `}} />
    </div>
  );
}
