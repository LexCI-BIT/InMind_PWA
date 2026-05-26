import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRole } from '../../context/RoleContext';
import { loginStudent, saveAuthSession } from '../../lib/api';

/**
 * Student Login — cream background, big bold title, two soft-grey input
 * groups, purple CTA. Matches the Figma "Login" screen 1:1.
 */
export function StudentLogin() {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [identifier, setIdentifier] = useState('STU001');
  const [password, setPassword] = useState('student123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // For demo purposes, we're hardcoding school_id and class_name
      // In a real scenario, these might be additional fields or derived from the student_id
      const payload = {
        school_id: 'DEMO001',
        class_name: '9A',
        student_id: identifier,
        password: password,
      };

      const response = await loginStudent(payload);
      
      // Save token and set role
      saveAuthSession(response);
      setRole('student');
      
      navigate('/student/path-select');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col bg-black"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="flex flex-1 flex-col px-7 pt-safe justify-center pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-[40px] font-extrabold leading-none tracking-tight text-white"
        >
          Login
        </motion.h1>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="mt-4 rounded-xl bg-red-500/20 px-4 py-3 text-sm text-red-200 border border-red-500/50"
          >
            {error}
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45 }}
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-3"
        >
          {/* Email / Student ID */}
          <label className="rounded-2xl bg-[#f4f4f5] px-5 py-4">
            <input
              type="text"
              required
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Student ID (e.g. STU001)"
              className="w-full bg-transparent text-[15px] text-[#111] placeholder:text-[#9b9690] focus:outline-none"
            />
          </label>

          {/* Password + FORGOT */}
          <label className="flex items-center gap-3 rounded-2xl bg-[#f4f4f5] px-5 py-4">
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
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            className={`mt-6 w-full rounded-full bg-[#7c3aed] py-4 text-[17px] font-bold text-white shadow-lg transition hover:brightness-110 ${loading ? 'opacity-70' : ''}`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>

          <div className="mt-6 text-center text-[14px] text-white/80">
            Don't have an account? <button type="button" onClick={() => navigate('/student/signup')} className="font-semibold text-white transition hover:text-white/80">Sign Up</button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
