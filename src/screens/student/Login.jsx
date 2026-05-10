import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Student Login — cream background, big bold title, two soft-grey input
 * groups, purple CTA. Matches the Figma "Login" screen 1:1.
 */
export function StudentLogin() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: real auth — for now, pass through to focus selection
    navigate('/student/focus');
  };

  return (
    <section
      className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col"
      style={{ backgroundColor: '#f7f3ee', fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="flex flex-1 flex-col px-7 pt-safe pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-[44px] font-extrabold leading-none tracking-tight text-[#111]"
        >
          Login
        </motion.h1>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45 }}
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-3"
        >
          {/* Email / Student ID */}
          <label className="rounded-2xl bg-[#ece7df] px-5 py-4">
            <input
              type="text"
              required
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Email or Student ID"
              className="w-full bg-transparent text-[15px] text-[#111] placeholder:text-[#9b9690] focus:outline-none"
            />
          </label>

          {/* Password + FORGOT */}
          <label className="flex items-center gap-3 rounded-2xl bg-[#ece7df] px-5 py-4">
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent text-[15px] text-[#111] placeholder:text-[#9b9690] focus:outline-none"
            />
            <button
              type="button"
              className="shrink-0 text-[12px] font-bold uppercase tracking-wider text-[#7c3aed] transition hover:text-[#6d28d9]"
            >
              Forgot
            </button>
          </label>

          {/* Submit */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            className="mt-3 w-full rounded-full bg-[#7c3aed] py-4 text-[17px] font-bold text-white shadow-lg shadow-[#7c3aed]/25 transition hover:brightness-110"
          >
            Login
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
