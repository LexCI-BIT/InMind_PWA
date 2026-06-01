import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const TILES = [
  { id: 'circulars', label: 'Examination\nCirculars', Icon: DocIcon,      url: 'https://www.cbse.gov.in/cbsenew/examination_Circular.html' },
  { id: 'bylaws',    label: 'Examination\nByelaws',   Icon: ScalesIcon,   url: 'https://www.cbse.gov.in/cbsenew/examinationbyelaws.html'   },
  { id: 'subjects',  label: 'Subjects\nOffered',      Icon: NotebookIcon, url: 'https://cbseacademic.nic.in/curriculum_2026.html'          },
  { id: 'curr',      label: 'Curriculum',             Icon: ListIcon,     url: 'https://cbseacademic.nic.in/curriculum_2026.html'          },
  { id: 'samples',   label: 'Sample\nQuestion\nPapers', Icon: QPaperIcon,  url: 'https://www.cbse.gov.in/cbsenew/samplepaper.html'          },
  { id: 'qbank',     label: 'Question\nBank',         Icon: BankIcon,     url: 'https://www.cbse.gov.in/cbsenew/Question_Bank.html'        },
  { id: 'answers',   label: 'Model\nAnswers',         Icon: BadgeIcon,    url: 'https://www.cbse.gov.in/cbsenew/model-answer.html'         },
  { id: 'stats',     label: 'Examination\nStatistics', Icon: ChartIcon,   url: 'https://www.cbse.gov.in/cbsenew/question-paper.html'       },
];

export function ExamReference() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col bg-black font-sans">
      {/* ───── Header ───── */}
      <div className="bg-white py-4 px-6 shadow-sm z-10 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="text-black font-bold text-xl p-1 active:scale-95"
        >
          &lt;
        </button>
        <h2 className="text-[14px] font-bold tracking-widest text-black mr-6">
          ACADEMICS
        </h2>
        <div /> {/* Spacer to center the title */}
      </div>

      {/* ───── Main Content ───── */}
      <div className="flex-1 overflow-y-auto px-5 pb-safe pb-8 pt-5">
        
        {/* Change Focus Pill */}
        <div className="flex justify-end mb-6">
          <button
            type="button"
            className="rounded-full bg-[#333333] px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#eab308] transition active:scale-95"
          >
            Change Focus
          </button>
        </div>

        <h3 className="text-[18px] font-bold text-white mb-5">Exam Reference Materials</h3>

        {/* 8-tile gradient card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl p-5 mb-5 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #14b8a6 100%)',
          }}
        >
          <div className="grid grid-cols-4 gap-y-6 gap-x-2">
            {TILES.map(({ id, label, Icon, url }) => (
              <button
                key={id}
                type="button"
                onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
                className="flex flex-col items-center gap-2 text-center text-white transition hover:opacity-90 focus:outline-none active:scale-95"
              >
                <span className="grid size-[42px] place-items-center rounded-full bg-white/20 backdrop-blur-sm shadow-sm border border-white/10">
                  <Icon />
                </span>
                <span className="whitespace-pre-line text-[8.5px] font-medium leading-[1.2] text-white/95">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skill Education Module */}
        <motion.button
          type="button"
          onClick={() => window.open('https://cbseit.in/cbse/2023/spe/applogin.aspx', '_blank', 'noopener,noreferrer')}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-between rounded-2xl px-6 py-4 text-left text-white shadow-md mb-4"
          style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)' }}
        >
          <span className="text-[15px] font-semibold">Skill Education Module</span>
          <ChevronRightIcon />
        </motion.button>

        {/* Science Exhibition */}
        <motion.button
          type="button"
          onClick={() => window.open('https://cbseit.in/cbse/2025/sciex/index.html', '_blank', 'noopener,noreferrer')}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-between rounded-2xl px-6 py-4 text-left text-white shadow-md"
          style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)' }}
        >
          <span className="text-[15px] font-semibold">Science Exhibition</span>
          <ChevronRightIcon />
        </motion.button>
      </div>
    </section>
  );
}

/* ─── Tile icons ─── */

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  );
}
function ScalesIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18" />
      <path d="M5 8h14" />
      <path d="M5 8l-2 6c0 1.5 1 3 3 3s3-1.5 3-3l-2-6" />
      <path d="M19 8l-2 6c0 1.5 1 3 3 3s3-1.5 3-3l-2-6" transform="translate(-3 0)" />
    </svg>
  );
}
function NotebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 7h6M9 11h6M9 15h4" />
    </svg>
  );
}
function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 9h2M8 13h2M8 17h2" />
      <path d="M13 9h4M13 13h4M13 17h3" />
    </svg>
  );
}
function QPaperIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M10 8a2 2 0 1 1 2 2v1" />
      <path d="M12 14h.01" />
    </svg>
  );
}
function BankIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 14h6" />
    </svg>
  );
}
function BadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="11" r="6" />
      <path d="m9 11 2 2 4-4" />
      <path d="m9 17-2 4 5-2 5 2-2-4" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="13" width="3.5" height="7" rx="1" />
      <rect x="10.25" y="9" width="3.5" height="11" rx="1" />
      <rect x="16.5" y="5" width="3.5" height="15" rx="1" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4l6 6-6 6" />
    </svg>
  );
}
