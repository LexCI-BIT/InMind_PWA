import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRole } from '../../context/RoleContext';
import { saveAuthSession, signupParent } from '../../lib/api';
import {
  ErrorMessage,
  SelectField,
  SignupShell,
  SubmitButton,
  TextField,
} from '../auth/SignupControls';

const CLASS_OPTIONS = ['6', '7', '8', '9', '10', '11', '12'];
const SECTION_OPTIONS = ['A', 'B', 'C', 'D'];

const INITIAL_FORM = {
  full_name: '',
  email: '',
  password: '',
  phone_number: '',
  child_name: '',
  child_class: '',
  child_section: '',
};

export function ParentSignUp() {
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
      const auth = await signupParent(form);
      saveAuthSession(auth);
      setRole('parent');
      navigate('/parent/home');
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
        <TextField value={form.phone_number} onChange={update('phone_number')} placeholder="Phone Number" type="tel" />
        <TextField value={form.child_name} onChange={update('child_name')} placeholder="Child Name" />

        <div className="grid grid-cols-2 gap-10">
          <SelectField value={form.child_class} onChange={update('child_class')} placeholder="Child Class" options={CLASS_OPTIONS} />
          <SelectField value={form.child_section} onChange={update('child_section')} placeholder="Child Section" options={SECTION_OPTIONS} />
        </div>

        <ErrorMessage error={error} />
        <SubmitButton loading={loading} />
      </motion.form>
    </SignupShell>
  );
}
