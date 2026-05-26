import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRole } from '../../context/RoleContext';
import { saveAuthSession, signupStudent } from '../../lib/api';
import {
  ErrorMessage,
  OtpField,
  SelectField,
  SignupShell,
  SubmitButton,
  TextField,
  UploadField,
} from '../auth/SignupControls';

const CLASS_OPTIONS = ['6', '7', '8', '9', '10', '11', '12'];
const SECTION_OPTIONS = ['A', 'B', 'C', 'D'];
const BOARD_OPTIONS = ['CBSE', 'ICSE', 'State Board', 'IB', 'IGCSE'];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const HEIGHT_OPTIONS = ['Below 140 cm', '140-150 cm', '151-160 cm', '161-170 cm', '171+ cm'];
const WEIGHT_OPTIONS = ['Below 35 kg', '35-45 kg', '46-55 kg', '56-65 kg', '66+ kg'];

const INITIAL_FORM = {
  roll_number: '',
  password: '',
  school_email: '',
  class_name: '',
  section: '',
  board: '',
  school_name: '',
  parents_name: '',
  parents_phone: '',
  blood_group: '',
  height: '',
  weight: '',
  mobile_number: '',
  mobile_verification: '',
  date_of_birth: '',
};

export function StudentSignUp() {
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
      const auth = await signupStudent({
        ...form,
        id_card_photo: null,
        profile_picture: null,
      });

      saveAuthSession(auth);
      setRole('student');
      navigate('/student/path-select');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignupShell>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.45 }}
        className="mt-8 flex items-center gap-4"
      >
        <label className="relative flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-white p-3 shadow-sm">
          <input type="file" accept="image/*" className="sr-only" />
          <svg viewBox="0 0 24 24" className="h-10 w-10 text-black" fill="currentColor">
            <path d="M4 8V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2M4 8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2M4 8h16M12 11a3 3 0 1 1 0 6 3 3 0 0 1 0-6" />
          </svg>
          <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full border-2 border-black bg-white text-black font-bold">
            +
          </span>
        </label>
        <div className="text-[15px] font-medium leading-tight">
          Upload Profile <br /> Picture
        </div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.45 }}
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col gap-4"
      >
        <TextField value={form.roll_number} onChange={update('roll_number')} placeholder="Roll Number" />
        <TextField value={form.password} onChange={update('password')} placeholder="Password" type="password" autoComplete="new-password" />
        <TextField value={form.school_email} onChange={update('school_email')} placeholder="School Email(Child)" type="email" />
        <UploadField label="Id Card Photo(upload)" />

        <div className="grid grid-cols-2 gap-4">
          <SelectField value={form.class_name} onChange={update('class_name')} placeholder="Class" options={CLASS_OPTIONS} />
          <SelectField value={form.section} onChange={update('section')} placeholder="Section" options={SECTION_OPTIONS} />
        </div>

        <SelectField value={form.board} onChange={update('board')} placeholder="Select Board" options={BOARD_OPTIONS} />
        <TextField value={form.school_name} onChange={update('school_name')} placeholder="School Name" />
        <TextField value={form.parents_name} onChange={update('parents_name')} placeholder="Parents Name" />
        <TextField value={form.parents_phone} onChange={update('parents_phone')} placeholder="Parents Phone Number" type="tel" />

        <div className="grid grid-cols-3 gap-3">
          <SelectField value={form.blood_group} onChange={update('blood_group')} placeholder="Blood Group" options={BLOOD_GROUPS} required={false} />
          <SelectField value={form.height} onChange={update('height')} placeholder="Height" options={HEIGHT_OPTIONS} required={false} />
          <SelectField value={form.weight} onChange={update('weight')} placeholder="Weight" options={WEIGHT_OPTIONS} required={false} />
        </div>

        <TextField value={form.mobile_number} onChange={update('mobile_number')} placeholder="Mobile Number" type="tel" />
        <OtpField value={form.mobile_verification} onChange={update('mobile_verification')} />
        <TextField value={form.date_of_birth} onChange={update('date_of_birth')} placeholder="Date Of Birth" type="date" />

        <ErrorMessage error={error} />
        <SubmitButton loading={loading} />
      </motion.form>
    </SignupShell>
  );
}
