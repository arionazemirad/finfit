"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
import { useTheme } from "@/components/theme-provider";
import {
  Bot,
  Gamepad2,
  Target,
  Zap,
  Star,
  Smile,
  BadgeCheck,
  Sun,
  Moon,
  Instagram,
  Twitter,
} from "lucide-react";

// Load Outfit font
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

// Utility – simple claymorphism style helper
const clayLightShadow = "none";

export default function Home() {
  return (
    <main
      className={`${outfit.className} bg-[#FDF4FF] dark:bg-zinc-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}
    >
      <Header />
      <div className='flex-1 pt-20 overflow-hidden'>
        <HeroSection />
        <WhyGenZLovesUs />
        <HowItWorks />
        <GamifiedProgress />
        <AIAssistantPreview />
        <PricingPreview />
        <Testimonials />
        <JoinBeta />
      </div>
      <Footer />
    </main>
  );
}

/* ----------------------------- Header ----------------------------- */
function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className='fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-zinc-800/70 border-b border-transparent dark:border-zinc-700/40'>
      <nav className='max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16'>
        {/* Logo */}
        <Link href='#' className='font-bold text-xl flex items-center gap-1'>
          <span>FinFit</span>
          <span aria-hidden>💸</span>
        </Link>

        {/* Links */}
        <ul className='hidden md:flex items-center gap-6 text-sm font-medium'>
          <li>
            <Link
              href='#features'
              className='hover:text-indigo-600 transition-colors'
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              href='#pricing'
              className='hover:text-indigo-600 transition-colors'
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href='#blog'
              className='hover:text-indigo-600 transition-colors'
            >
              Blog
            </Link>
          </li>
        </ul>

        <div className='flex items-center gap-3'>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className='p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
            aria-label='Toggle theme'
          >
            {theme === "light" ? (
              <Moon className='w-4 h-4 text-gray-600' />
            ) : (
              <Sun className='w-4 h-4 text-yellow-500' />
            )}
          </button>

          {/* CTA */}
          <Link
            href='/sign-in'
            className='px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md transition-colors'
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}

/* --------------------------- Hero Section -------------------------- */
function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8 }}
      className='py-24 sm:py-32'
    >
      <div className='max-w-5xl mx-auto px-4 text-center flex flex-col items-center gap-8'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className='text-4xl sm:text-6xl font-extrabold leading-tight'
        >
          Take Control of Your Money — Effortlessly 💸
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className='max-w-xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300'
        >
          FinFit helps you budget, save, and vibe — without boring spreadsheets.
        </motion.p>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className='flex flex-col sm:flex-row gap-4'
        >
          <Link
            href='/sign-in'
            className='px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition-transform hover:-translate-y-1 active:translate-y-0'
          >
            Get Started
          </Link>
        </motion.div>

        {/* Dashboard mockup with theme-aware images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='mt-12 w-full max-w-3xl rounded-3xl overflow-hidden border border-indigo-100 dark:border-zinc-700'
          style={{ boxShadow: clayLightShadow, position: "relative" }}
        >
          <ThemeAwareImage />
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ------------------------- Theme Aware Image Component ------------------------- */
function ThemeAwareImage() {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === "dark" ? "/dark-mode.png" : "/light-mode.png"}
      alt='FinFit dashboard preview'
      width={1200}
      height={600}
      className='w-full h-auto object-cover'
    />
  );
}

/* ------------------------- Why Gen Z Loves Us ------------------------- */
function WhyGenZLovesUs() {
  const features = [
    {
      title: "Bank Sync in 10 Seconds ⚡️",
      icon: Zap,
    },
    {
      title: "AI Assistant That Gets You 🤖",
      icon: Bot,
    },
    {
      title: "Streaks & XP for Smart Choices 🎮",
      icon: Gamepad2,
    },
    {
      title: "Goals That Feel Like Quests 🎯",
      icon: Target,
    },
  ];

  return (
    <section id='features' className='py-20 bg-transparent'>
      <div className='max-w-7xl mx-auto px-4'>
        <h2 className='text-3xl font-bold mb-12 text-center'>
          Why Gen Z Loves Us
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map(({ title, icon: Icon }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className='rounded-3xl p-6 bg-white dark:bg-zinc-800'
              style={{ boxShadow: clayLightShadow }}
            >
              <Icon size={32} className='text-indigo-600 mb-4' />
              <p className='font-semibold leading-snug'>{title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- How It Works --------------------------- */
function HowItWorks() {
  const steps = [
    {
      step: "1️⃣",
      title: "Connect Your Bank",
    },
    {
      step: "2️⃣",
      title: "Set Your Goals",
    },
    {
      step: "3️⃣",
      title: "Let FinFit Handle the Rest",
    },
  ];

  return (
    <section className='py-20 bg-transparent'>
      <div className='max-w-5xl mx-auto px-4 text-center'>
        <h2 className='text-3xl font-bold mb-12'>How It Works</h2>
        <div className='grid sm:grid-cols-3 gap-8'>
          {steps.map(({ step, title }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className='rounded-3xl p-6 bg-white dark:bg-zinc-800'
              style={{ boxShadow: clayLightShadow }}
            >
              <span className='text-3xl'>{step}</span>
              <p className='mt-4 font-semibold'>{title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- Gamified Progress ------------------------ */
function GamifiedProgress() {
  return (
    <section className='py-20'>
      <div className='max-w-4xl mx-auto px-4'>
        <div
          className='rounded-3xl p-8 bg-white dark:bg-zinc-800'
          style={{ boxShadow: clayLightShadow }}
        >
          <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
            <Star className='text-indigo-600' /> Gamified Progress
          </h2>
          <p className='mb-6 text-gray-600 dark:text-gray-300'>
            “Saving $100 feels even better when it earns XP.”
          </p>

          {/* XP Bar */}
          <div className='w-full h-4 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden mb-4'>
            <div
              className='h-full bg-indigo-600'
              style={{ width: "65%" }}
            ></div>
          </div>
          <div className='flex justify-between text-sm font-medium'>
            <span>Level 6</span>
            <span>XP 650 / 1000</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------- AI Assistant Preview ---------------------- */
function AIAssistantPreview() {
  return (
    <section className='py-20'>
      <div className='max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center'>
        {/* Chat bubbles */}
        <div
          className='rounded-3xl p-6 bg-white dark:bg-zinc-800 space-y-4'
          style={{ boxShadow: clayLightShadow }}
        >
          <ChatBubble side='left' text='How much can I spend on food?' />
          <ChatBubble
            side='right'
            text='You can safely budget $120 for food this week without impacting your savings goals.'
          />
          <ChatBubble side='left' text='Did I overspend on Amazon?' />
        </div>

        <div>
          <h2 className='text-3xl font-bold mb-4 flex items-center gap-2'>
            <Bot className='text-indigo-600' /> FinFit AI Assistant
          </h2>
          <p className='text-gray-600 dark:text-gray-300 mb-6'>
            Ask anything about your money and get instant, friendly answers —
            like chatting with a financially savvy bestie.
          </p>
          <Link
            href='#ai'
            className='px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition-transform hover:-translate-y-1 active:translate-y-0'
          >
            Chat with FinFit AI
          </Link>
        </div>
      </div>
    </section>
  );
}

function ChatBubble({ side, text }: { side: "left" | "right"; text: string }) {
  return (
    <div
      className={`max-w-sm p-4 rounded-2xl text-sm shadow-inner bg-indigo-50 dark:bg-zinc-700 flex ${side === "right" ? "ml-auto" : ""}`}
    >
      {side === "left" && <Smile className='mr-2 text-indigo-600 shrink-0' />}
      <span>{text}</span>
    </div>
  );
}

/* ----------------------- Pricing Preview ------------------------ */
function PricingPreview() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: ["Budget tracking", "AI insights (limited)", "Basic goals"],
      highlighted: false,
    },
    {
      name: "FinFit+",
      price: "$5/mo",
      features: [
        "Unlimited AI",
        "XP Boosts",
        "Advanced goals",
        "Priority support",
      ],
      highlighted: true,
    },
  ];

  return (
    <section id='pricing' className='py-20 bg-transparent'>
      <div className='max-w-7xl mx-auto px-4 text-center'>
        <h2 className='text-3xl font-bold mb-12'>Level Up with FinFit+</h2>
        <div className='grid sm:grid-cols-2 gap-8'>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`rounded-3xl p-8 bg-white dark:bg-zinc-800 flex flex-col items-center ${
                plan.highlighted ? "ring-2 ring-indigo-600" : ""
              }`}
              style={{ boxShadow: clayLightShadow }}
            >
              <h3 className='text-2xl font-bold mb-2 flex items-center gap-2'>
                {plan.name}{" "}
                {plan.highlighted && <BadgeCheck className='text-indigo-600' />}
              </h3>
              <p className='text-4xl font-extrabold mb-6'>{plan.price}</p>
              <ul className='space-y-2 mb-6 text-left'>
                {plan.features.map((f) => (
                  <li key={f} className='flex items-center gap-2'>
                    <Checkmark /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href='#trial'
                className='px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition-transform hover:-translate-y-1 active:translate-y-0'
              >
                {plan.highlighted ? "Start Free Trial" : "Get Started"}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Checkmark() {
  return (
    <span className='inline-block w-2.5 h-2.5 bg-indigo-600 rounded-full'></span>
  );
}

/* ------------------------- Testimonials ------------------------- */
function Testimonials() {
  const testimonials = [
    {
      quote: "“I actually look forward to budgeting.”",
      name: "Kayla, 22 🎨",
    },
    {
      quote: "“The AI is helpful AND funny.”",
      name: "Zayn, 25 🧢",
    },
    {
      quote: "“The XP system keeps me hooked.”",
      name: "Arjun, 24 💻",
    },
  ];

  return (
    <section className='py-20 bg-transparent'>
      <div className='max-w-6xl mx-auto px-4 text-center'>
        <h2 className='text-3xl font-bold mb-12'>What Our Users Say</h2>
        <div className='grid gap-8 sm:grid-cols-3'>
          {testimonials.map(({ quote, name }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className='rounded-3xl p-6 bg-white dark:bg-zinc-800'
              style={{ boxShadow: clayLightShadow }}
            >
              <p className='mb-4 text-lg'>{quote}</p>
              <p className='font-semibold text-sm text-gray-600 dark:text-gray-400'>
                {name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Join Beta -------------------------- */
function JoinBeta() {
  return (
    <section id='join' className='py-20'>
      <div className='max-w-3xl mx-auto px-4 text-center'>
        <h2 className='text-3xl font-bold mb-6'>Join the Beta</h2>
        <p className='mb-8 text-gray-600 dark:text-gray-300'>
          We’ll slide into your inbox, not your DMs.
        </p>
        <form className='flex flex-col sm:flex-row gap-4 justify-center'>
          <input
            type='email'
            required
            placeholder='you@example.com'
            className='flex-1 px-4 py-3 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          />
          <button
            type='submit'
            className='px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition-transform hover:-translate-y-1 active:translate-y-0'
          >
            Join Beta
          </button>
        </form>
      </div>
    </section>
  );
}

/* --------------------------- Footer ---------------------------- */
function Footer() {
  return (
    <footer className='bg-white dark:bg-zinc-800 border-t border-indigo-100 dark:border-zinc-700 py-12'>
      <div className='max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-8'>
        <div className='flex flex-col items-center sm:items-start text-center sm:text-left gap-2'>
          <span className='font-bold text-lg flex items-center gap-1'>
            FinFit 💸
          </span>
          <p className='text-sm text-gray-600 dark:text-gray-400 max-w-xs'>
            Helping Gen Z master money, one quest at a time.
          </p>
        </div>

        <ul className='flex flex-wrap justify-center gap-6 text-sm font-medium'>
          <li>
            <Link
              href='#features'
              className='hover:text-indigo-600 transition-colors'
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              href='#pricing'
              className='hover:text-indigo-600 transition-colors'
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href='#blog'
              className='hover:text-indigo-600 transition-colors'
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href='#contact'
              className='hover:text-indigo-600 transition-colors'
            >
              Contact
            </Link>
          </li>
        </ul>

        <ul className='flex gap-4'>
          {/* Social icons as simple links */}
          <li>
            <Link
              href='#'
              aria-label='Instagram'
              className='hover:text-indigo-600 transition-colors'
            >
              <Instagram className='w-5 h-5' />
            </Link>
          </li>
          <li>
            <Link
              href='#'
              aria-label='Twitter'
              className='hover:text-indigo-600 transition-colors'
            >
              <Twitter className='w-5 h-5' />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
