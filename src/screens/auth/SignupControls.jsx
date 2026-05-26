export function SignupShell({ children, narrow = false }) {
  return (
    <section
      className={[
        'relative mx-auto flex min-h-[100dvh] w-full flex-col overflow-y-auto bg-black text-white',
        narrow ? 'max-w-[390px]' : 'max-w-[440px]',
      ].join(' ')}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="flex flex-1 flex-col px-6 pt-safe pt-12 pb-10">
        <h1 className="text-center text-[36px] font-extrabold leading-none tracking-tight text-white">
          Sign Up
        </h1>
        {children}
      </div>
    </section>
  );
}

export function TextField({
  value,
  onChange,
  placeholder,
  type = 'text',
  required = true,
  autoComplete,
}) {
  return (
    <label className="rounded-xl bg-[#f4f4f5] px-5 py-4">
      <input
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-[14px] text-[#111] placeholder:text-[#8f96a3] focus:outline-none"
      />
    </label>
  );
}

export function SelectField({
  value,
  onChange,
  placeholder,
  options,
  className = '',
  required = true,
}) {
  return (
    <label className={`relative rounded-xl bg-[#f4f4f5] px-4 py-4 ${className}`}>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-transparent pr-6 text-[14px] text-[#111] focus:outline-none"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8f96a3]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </label>
  );
}

export function UploadField({ label }) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-xl bg-[#f4f4f5] px-5 py-4">
      <span className="text-[14px] text-[#8f96a3]">{label}</span>
      <input type="file" accept="image/*" className="sr-only" />
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-black" fill="currentColor">
        <path d="M12 4a8 8 0 0 0-7.9 6.2C1.8 10.6 0 12.5 0 15c0 2.8 2.2 5 5 5h10c3.3 0 6-2.7 6-6 0-3.1-2.4-5.7-5.5-5.9A8 8 0 0 0 12 4zm0 3a1 1 0 0 1 1 1v4h2l-3 3-3-3h2V8a1 1 0 0 1 1-1z" />
      </svg>
    </label>
  );
}

export function OtpField({ value, onChange, placeholder = 'Mobile Number Verification' }) {
  return (
    <label className="flex items-center justify-between rounded-xl bg-[#f4f4f5] pl-5 pr-3 py-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-[14px] text-[#111] placeholder:text-[#8f96a3] focus:outline-none"
      />
      <span className="shrink-0 rounded-md border border-[#7c3aed] px-2 py-0.5 text-[13px] font-medium text-[#7c3aed]">
        Otp
      </span>
    </label>
  );
}

export function SubmitButton({ loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-4 w-full rounded-full bg-[#7c3aed] py-4 text-[17px] font-bold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? 'Registering...' : 'Register'}
    </button>
  );
}

export function ErrorMessage({ error }) {
  if (!error) return null;

  return (
    <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-center text-[13px] font-medium text-red-100">
      {error}
    </p>
  );
}
