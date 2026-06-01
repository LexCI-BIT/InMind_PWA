import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Calendar, Clock, 
  CreditCard, FileText, Phone, Mail, User, Check, Home 
} from 'lucide-react';

const MENTOR = {
  id: 'arjun-mehta',
  name: 'Mr. Arjun Mehta',
  role: 'Math Expert',
  image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop'
};

const TIME_SLOTS = [
  '04:00 pm - 04:30 pm',
  '04:30 pm - 05:00 pm',
  '05:00 pm - 05:30 pm',
  '05:30 pm - 06:00 pm'
];

export function MentorBookingFlow() {
  const navigate = useNavigate();
  const { id } = useParams(); // mentor id
  
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(12); // Hardcoded Day for UI demo
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);
  const [purpose, setPurpose] = useState('I want guidance on algebra concepts and problem solving');

  const handleNext = () => setStep(s => Math.min(s + 1, 5));
  const handleBack = () => {
    if (step === 1) navigate(-1);
    else setStep(s => s - 1);
  };

  const handleConfirm = () => {
    const payload = {
      mentorId: id,
      mentorName: MENTOR.name,
      studentName: 'Aarav Sharma',
      studentEmail: 'aarav@school.ac.in',
      studentPhone: '+91 1234567891',
      date: `Thursday, ${selectedDate} June 2026`,
      time: selectedTime,
      sessionType: 'Free Session(30 mins)',
      purpose: purpose
    };
    console.log('=== BOOKING CONFIRMED PAYLOAD ===', payload);
    handleNext(); // Move to success step
  };

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col bg-[#1e1e1e] font-sans text-white overflow-hidden">
      
      {/* ───── Header ───── */}
      {step < 5 && (
        <div className="flex items-center justify-between px-6 pt-10 pb-6 z-10">
          <button 
            onClick={handleBack}
            className="p-2 -ml-2 active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10 rounded-full bg-cyan-300 border-2 border-black flex items-center justify-center">
            <span className="text-black font-bold text-lg mb-1">._.</span>
          </div>
        </div>
      )}

      {/* ───── Main Content Area ───── */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 z-10">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: CHOOSE DATE */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            >
              <h1 className="text-3xl font-bold mb-2">Choose a date</h1>
              <p className="text-gray-300 text-sm mb-10">Select a convenient date</p>

              <div className="flex items-center justify-between mb-4 px-2">
                <span className="font-bold text-lg">June 2026</span>
                <div className="flex gap-4 text-gray-400">
                  <button className="active:scale-95">&lt;</button>
                  <button className="active:scale-95">&gt;</button>
                </div>
              </div>

              {/* Calendar Card */}
              <div className="bg-[#252525] rounded-3xl p-5 border border-white/5 shadow-lg">
                <div className="grid grid-cols-7 gap-y-6 text-center text-sm">
                  {/* Days header */}
                  {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                    <div key={d} className="font-bold text-white mb-2">{d}</div>
                  ))}
                  <div className="col-span-7 h-[1px] bg-white/10 -mt-4 mb-2" />
                  
                  {/* Dummy dates for June 2026 */}
                  {Array.from({length: 31}, (_, i) => i - 0).map((day, i) => {
                    const isCurrentMonth = day > 0 && day <= 30;
                    const displayDay = isCurrentMonth ? day : (day <= 0 ? 31 + day : day - 30);
                    const isSelected = selectedDate === displayDay && isCurrentMonth;
                    
                    return (
                      <button 
                        key={i}
                        onClick={() => isCurrentMonth && setSelectedDate(displayDay)}
                        disabled={!isCurrentMonth}
                        className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center transition-colors
                          ${!isCurrentMonth ? 'text-gray-600 cursor-default' : 'text-gray-300 hover:text-white'}
                          ${isSelected ? 'bg-[#7c3aed] !text-white font-bold' : ''}
                        `}
                      >
                        {displayDay.toString().padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: CHOOSE TIME */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            >
              <h1 className="text-[28px] font-bold mb-2">Choose a time slot</h1>
              <p className="text-gray-300 text-[11px] mb-8">Available slots for Thu, {selectedDate} Jun</p>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-[#7c3aed] rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-gray-300 text-xs mb-1">Session Duration</p>
                  <p className="font-bold text-[15px]">30 Minutes(Free)</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {TIME_SLOTS.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`flex items-center justify-between p-5 rounded-2xl border text-left transition-all active:scale-[0.98]
                      ${selectedTime === slot ? 'bg-[#252525] border-[#7c3aed]' : 'bg-transparent border-transparent'}
                    `}
                  >
                    <div>
                      <p className="font-bold text-[15px] mb-1">{slot}</p>
                      <p className="text-[#10b981] text-xs font-semibold">Available</p>
                    </div>
                    {/* Custom Radio Button */}
                    <div className={`w-5 h-5 rounded-full border-[2px] flex items-center justify-center transition-colors
                      ${selectedTime === slot ? 'border-purple-400 bg-transparent' : 'border-gray-500'}
                    `}>
                      {selectedTime === slot && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: YOUR DETAILS */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            >
              <h1 className="text-[28px] font-bold mb-2">Your Details</h1>
              <p className="text-gray-300 text-[11px] mb-8">We need a few details from you</p>

              <div className="flex flex-col gap-4">
                
                {/* Name */}
                <div className="bg-[#252525] rounded-2xl p-4 flex items-center gap-4 border border-white/5">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-gray-300 text-xs mb-1">Full Name</p>
                    <p className="font-bold text-sm">Aarav Sharma</p>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-[#252525] rounded-2xl p-4 flex items-center gap-4 border border-white/5">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-gray-300 text-xs mb-1">Email Address</p>
                    <p className="font-bold text-sm">aarav@school.ac.in</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-[#252525] rounded-2xl p-4 flex items-center gap-4 border border-white/5">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-gray-300 text-xs mb-1">Phone Number</p>
                    <p className="font-bold text-sm">+91 1234567891</p>
                  </div>
                </div>

                {/* Purpose Textarea */}
                <div className="bg-[#252525] rounded-2xl p-4 border border-white/5 mt-2">
                  <p className="text-gray-300 text-xs mb-3">Purpose of Session (Optional)</p>
                  <textarea
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full bg-transparent border border-gray-600 rounded-xl p-3 text-sm text-white resize-none h-24 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

              </div>
            </motion.div>
          )}

          {/* STEP 4: REVIEW BOOKING */}
          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            >
              <h1 className="text-[28px] font-bold mb-2">Review Booking</h1>
              <p className="text-gray-300 text-[11px] mb-8">Please confirm your details</p>

              <div className="flex flex-col gap-4">
                
                {/* Mentor Info */}
                <div className="bg-[#252525] rounded-2xl p-4 flex items-center gap-4 border border-white/5">
                  <img src={MENTOR.image} alt="Mentor" className="w-12 h-12 rounded-full object-cover border border-purple-500/30" />
                  <div>
                    <p className="font-bold text-[17px]">{MENTOR.name}</p>
                    <p className="text-[#93c5fd] text-xs font-semibold">{MENTOR.role}</p>
                  </div>
                </div>

                {/* Date */}
                <div className="bg-[#252525] rounded-2xl p-4 flex items-center gap-4 border border-white/5">
                  <Calendar className="w-5 h-5 text-[#7c3aed]" />
                  <div>
                    <p className="text-gray-300 text-xs mb-1">Date</p>
                    <p className="font-bold text-[13px]">Thursday, {selectedDate} June 2026</p>
                  </div>
                </div>

                {/* Time */}
                <div className="bg-[#252525] rounded-2xl p-4 flex items-center gap-4 border border-white/5">
                  <Clock className="w-5 h-5 text-[#7c3aed]" />
                  <div>
                    <p className="text-gray-300 text-xs mb-1">Time</p>
                    <p className="font-bold text-[13px]">{selectedTime}</p>
                  </div>
                </div>

                {/* Session Type */}
                <div className="bg-[#252525] rounded-2xl p-4 flex items-center gap-4 border border-white/5">
                  <CreditCard className="w-5 h-5 text-[#7c3aed]" />
                  <div>
                    <p className="text-gray-300 text-xs mb-1">Session Type</p>
                    <p className="font-bold text-[13px]">Free Session(30 mins)</p>
                  </div>
                </div>

                {/* Details */}
                <div className="bg-[#252525] rounded-2xl p-4 flex gap-4 border border-white/5">
                  <User className="w-5 h-5 text-[#7c3aed] mt-1" />
                  <div>
                    <p className="text-gray-300 text-xs mb-1">Your Details</p>
                    <p className="font-bold text-[13px] leading-relaxed">
                      Aarav Sharma . aarav@school.ac.in .<br/>+91 1234567891
                    </p>
                  </div>
                </div>

                {/* Purpose */}
                <div className="bg-[#252525] rounded-2xl p-4 flex gap-4 border border-white/5">
                  <FileText className="w-5 h-5 text-[#7c3aed] mt-1" />
                  <div>
                    <p className="text-gray-300 text-xs mb-1">Purpose</p>
                    <p className="font-bold text-[13px] leading-relaxed pr-2">
                      {purpose}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* STEP 5: SUCCESS */}
          {step === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center pt-10"
            >
              {/* Fake Confetti BG Effect */}
              <div className="absolute top-0 left-0 right-0 h-64 overflow-hidden pointer-events-none opacity-40">
                 {/* Simple CSS dots to simulate confetti since we don't have the gif */}
                 <div className="w-2 h-2 bg-pink-500 rounded-full absolute top-10 left-10" />
                 <div className="w-1 h-3 bg-blue-500 absolute top-20 left-1/4 rotate-45" />
                 <div className="w-2 h-2 bg-yellow-500 rounded-full absolute top-5 left-1/2" />
                 <div className="w-2 h-2 bg-green-500 rounded-full absolute top-24 right-10" />
                 <div className="w-1 h-3 bg-purple-500 absolute top-12 right-1/4 -rotate-12" />
                 <div className="w-2 h-2 bg-red-500 rounded-full absolute top-32 left-1/3" />
              </div>

              {/* Success Check */}
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}
                className="w-28 h-28 bg-[#10b981] rounded-full flex items-center justify-center mb-10 shadow-[0_0_40px_rgba(16,185,129,0.3)] z-10"
              >
                <Check className="w-14 h-14 text-white" strokeWidth={3} />
              </motion.div>

              <div className="w-full flex flex-col gap-3 mb-10 z-10">
                {/* Date */}
                <div className="bg-[#252525] rounded-2xl p-4 flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-[#7c3aed]" />
                  <div>
                    <p className="text-gray-300 text-xs mb-1">Date</p>
                    <p className="font-bold text-[13px]">Thursday, {selectedDate} June 2026</p>
                  </div>
                </div>

                {/* Time */}
                <div className="bg-[#252525] rounded-2xl p-4 flex items-center gap-4">
                  <Clock className="w-5 h-5 text-[#7c3aed]" />
                  <div>
                    <p className="text-gray-300 text-xs mb-1">Time</p>
                    <p className="font-bold text-[13px]">{selectedTime}</p>
                  </div>
                </div>

                {/* Session Type */}
                <div className="bg-[#252525] rounded-2xl p-4 flex items-center gap-4">
                  <CreditCard className="w-5 h-5 text-[#7c3aed]" />
                  <div>
                    <p className="text-gray-300 text-xs mb-1">Session Type</p>
                    <p className="font-bold text-[13px]">Free Session(30 mins)</p>
                  </div>
                </div>
              </div>
              
              <div className="w-full flex flex-col gap-4 z-10">
                <button className="w-full bg-[#7c3aed] text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 shadow-lg active:scale-95 transition-transform">
                  <Calendar className="w-5 h-5" /> Add to calender
                </button>
                <button 
                  onClick={() => navigate('/student/academic')}
                  className="w-full bg-transparent border border-white/10 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 active:scale-95 transition-transform"
                >
                  <Home className="w-5 h-5" /> Back to Home
                </button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ───── Fixed Bottom Button (Steps 1-4) ───── */}
      {step < 5 && (
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#1e1e1e] via-[#1e1e1e] to-transparent z-20">
          <button 
            onClick={step === 4 ? handleConfirm : handleNext}
            className="w-full bg-[#7c3aed] text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 text-base shadow-[0_4px_20px_rgba(124,58,237,0.3)] active:scale-95 transition-transform"
          >
            {step === 1 && 'Next : Choose Time'}
            {step === 2 && 'Next : Your Details'}
            {step === 3 && 'Review Booking'}
            {step === 4 && 'Confirm Booking'}
            {step !== 4 && <ArrowRight className="w-4 h-4 ml-1" />}
            {step === 4 && <ArrowRight className="w-4 h-4 ml-1" />}
          </button>
        </div>
      )}

    </section>
  );
}
