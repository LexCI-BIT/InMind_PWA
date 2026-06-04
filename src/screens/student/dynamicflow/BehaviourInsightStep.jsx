import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Aperture, Scale } from 'lucide-react';

export function BehaviourInsightStep({ selection, onNext }) {
  // Dynamic insights based on the moment card selection
  const insights = {
    friends: {
      primary: {
        label: 'PRIMARY INSIGHT',
        text: 'You tend to think longer about situations involving your close friendship.',
        icon: <Aperture className="w-6 h-6 text-[#b87034]" strokeWidth={1.5} />
      },
      secondary: {
        label: 'SECONDARY INSIGHT',
        text: 'You usually prefer understanding situations before reacting',
        icon: <Scale className="w-6 h-6 text-[#b87034]" strokeWidth={1.5} />
      }
    },
    school: {
      primary: {
        label: 'PRIMARY INSIGHT',
        text: 'You tend to internalize pressure from academic situations more deeply.',
        icon: <Aperture className="w-6 h-6 text-[#b87034]" strokeWidth={1.5} />
      },
      secondary: {
        label: 'SECONDARY INSIGHT',
        text: 'You usually seek clarity before taking action on school challenges.',
        icon: <Scale className="w-6 h-6 text-[#b87034]" strokeWidth={1.5} />
      }
    },
    myself: {
      primary: {
        label: 'PRIMARY INSIGHT',
        text: 'You tend to be self-reflective when processing personal challenges.',
        icon: <Aperture className="w-6 h-6 text-[#b87034]" strokeWidth={1.5} />
      },
      secondary: {
        label: 'SECONDARY INSIGHT',
        text: 'You often take time to understand your own feelings before sharing them.',
        icon: <Scale className="w-6 h-6 text-[#b87034]" strokeWidth={1.5} />
      }
    }
  };

  const data = insights[selection] || insights.friends;

  return (
    <div className="flex-1 flex flex-col px-6 pt-20 pb-10 relative z-10 h-full">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-[32px] font-semibold leading-[1.1] tracking-tight">
          <span className="text-white">Today's</span><br />
          <span className="text-[#eab308]">Observation</span>
        </h2>
        <div className="mt-4 w-24 h-[1.5px] bg-white/20 rounded-full" />
      </motion.div>

      {/* Insight Cards */}
      <div className="flex flex-col gap-5 mt-4">
        {/* Primary Insight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="flex items-start gap-4 bg-[#1e1c18]/80 backdrop-blur-md border border-[#b87034]/30 rounded-2xl p-5"
        >
          <div className="w-[46px] h-[46px] rounded-full bg-[#2a2015] border border-[#b87034]/40 flex items-center justify-center shrink-0 mt-0.5">
            {data.primary.icon}
          </div>
          <div className="flex-1">
            <p className="text-[#eab308] text-[11px] font-semibold tracking-widest uppercase mb-2">
              {data.primary.label}
            </p>
            <p className="text-gray-200 text-[14px] leading-[1.4]">
              {data.primary.text}
            </p>
          </div>
        </motion.div>

        {/* Secondary Insight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
          className="flex items-start gap-4 bg-[#1e1c18]/80 backdrop-blur-md border border-[#b87034]/30 rounded-2xl p-5"
        >
          <div className="w-[46px] h-[46px] rounded-full bg-[#2a2015] border border-[#b87034]/40 flex items-center justify-center shrink-0 mt-0.5">
            {data.secondary.icon}
          </div>
          <div className="flex-1">
            <p className="text-[#eab308] text-[11px] font-semibold tracking-widest uppercase mb-2">
              {data.secondary.label}
            </p>
            <p className="text-gray-200 text-[14px] leading-[1.4]">
              {data.secondary.text}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Arrow button bottom-right */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
        onClick={() => onNext({})}
        className="absolute bottom-10 right-6 w-14 h-14 bg-[#eab308] hover:bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg transition-colors active:scale-95"
      >
        <ArrowRight className="w-6 h-6 text-black" />
      </motion.button>
    </div>
  );
}
