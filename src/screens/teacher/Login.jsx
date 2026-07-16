import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRole } from '../../context/RoleContext';
import { saveAuthSession } from '../../lib/api';

/**
 * Teacher Login — matches the exact UI from the Parent login:
 * Black background, "Login" title, off-white inputs, bright purple button.
 */
export function TeacherLogin() {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      email: email,
      password: password,
    };

    console.log("Teacher Login Payload (Ready for Backend):", payload);

    // Mock successful login since there is no backend
    setTimeout(() => {
      const mockResponse = {
        access_token: "mock_token_teacher_login_123",
        user: { id: 3, role: "teacher", email: email }
      };
      
      saveAuthSession(mockResponse);
      setRole('teacher');
      navigate('/teacher/home');
      setLoading(false);
    }, 1000);
  };

  return (
    <section
      className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col bg-black"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="flex flex-1 flex-col px-8 justify-center pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-[48px] font-bold leading-none tracking-tight text-white mb-10"
        >
          Login
        </motion.h1>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="mb-4 rounded-xl bg-red-500/20 px-4 py-3 text-sm text-red-200 border border-red-500/50"
          >
            {error}
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          {/* Email */}
          <label className="rounded-[14px] bg-[#f4f4f5] px-5 py-4 flex items-center">
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-transparent text-[16px] font-medium text-[#111] placeholder:text-[#9b9690] focus:outline-none"
            />
          </label>

          {/* Password + FORGOT */}
          <label className="flex items-center gap-3 rounded-[14px] bg-[#f4f4f5] px-5 py-4">
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent text-[16px] font-medium text-[#111] placeholder:text-[#9b9690] focus:outline-none"
            />
            <button
              type="button"
              className="shrink-0 text-[12px] font-bold uppercase tracking-wider text-[#8b5cf6] transition hover:text-[#7c3aed]"
            >
              FORGOT
            </button>
          </label>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            className={`mt-6 w-full rounded-full bg-[#8b5cf6] py-[18px] text-[18px] font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] transition hover:brightness-110 ${loading ? 'opacity-70' : ''}`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>

          <div className="mt-4 text-center text-[15px] font-medium text-[#e4e4e7]">
            Dont have an account ? <button type="button" onClick={() => navigate('/teacher/welcome')} className="text-white transition hover:text-white/80">Sign Up</button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
