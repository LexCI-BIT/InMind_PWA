import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRole } from '../../context/RoleContext';
import { saveAuthSession, signupTeacher } from '../../lib/api';
import {
  ErrorMessage,
  OtpField,
  SignupShell,
  SubmitButton,
  TextField,
} from '../auth/SignupControls';

const INITIAL_FORM = {
  full_name: '',
  email: '',
  password: '',
  teacher_id: '',
  phone_number: '',
  mobile_verification: '',
  date_of_birth: '',
};

export function TeacherSignUp() {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (key) => (value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const auth = await signupTeacher(form);
      saveAuthSession(auth);
      setRole('teacher');
      navigate('/teacher/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignupShell narrow>
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.45 }}
        onSubmit={handleSubmit}
        className="mt-10 flex flex-col gap-4"
      >
        <TextField value={form.full_name} onChange={update('full_name')} placeholder="Full Name" autoComplete="name" />
        <TextField value={form.email} onChange={update('email')} placeholder="Email" type="email" autoComplete="email" />
        <TextField value={form.password} onChange={update('password')} placeholder="Password" type="password" autoComplete="new-password" />
        <TextField value={form.teacher_id} onChange={update('teacher_id')} placeholder="Teacher Id" />
        <TextField value={form.phone_number} onChange={update('phone_number')} placeholder="Phone Number" type="tel" />
        <OtpField value={form.mobile_verification} onChange={update('mobile_verification')} />
        <TextField value={form.date_of_birth} onChange={update('date_of_birth')} placeholder="Date Of Birth" type="date" />

        <ErrorMessage error={error} />
        <SubmitButton loading={loading} />
      </motion.form>
    </SignupShell>
  );
}
