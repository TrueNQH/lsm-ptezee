import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  GraduationCap,
  BookOpen,
  LineChart,
  Clock,
  Users,
  Shield,
  Sparkles,
  ArrowRight,
  Globe,
  Phone,
  Mail,
  MapPin,
  Star,
  PlayCircle,
} from "lucide-react";

// ===================== THEME HELPERS =====================
const Container = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const PrimaryButton = ({ children, href = "#", onClick, to }) => {
  if (to) {
    return (
      <Link
        to={to}
        className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
        style={{ background: "linear-gradient(135deg, #0284c7, #06b6d4)" }}
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
      style={{ background: "linear-gradient(135deg, #0284c7, #06b6d4)" }}
    >
      {children}
    </a>
  );
};

const SecondaryButton = ({ children, href = "#", to }) => {
  if (to) {
    return (
      <Link
        to={to}
        className="inline-flex items-center gap-2 rounded-2xl border border-sky-200/70 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-2xl border border-sky-200/70 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
    >
      {children}
    </a>
  );
};

// --- i18n (vi/en)
const LANGS = [
  { code: "vi", label: "Tiếng Việt" },
  { code: "en", label: "English" },
];

const dict = {
  vi: {
    brand: "DLA LMS",
    tagline: "Nền tảng học tập thông minh cho trung tâm tiếng Anh",
    subTag: "Tinh gọn vận hành – cá nhân hoá lộ trình – theo dõi tiến độ",
    navAbout: "About us",
    navMaterials: "Learning Material",
    navAuth: "Sign up/Sign in",
    heroCta1: "Dùng thử miễn phí",
    heroCta2: "Xem demo",
    storyTitle: "The story of us",
    storyBody:
      "DLA LMS ra đời từ nhu cầu thực tế tại các trung tâm ngoại ngữ: cần một hệ thống đơn giản, dễ triển khai nhưng đủ sâu để theo sát việc học của từng học viên. Chúng tôi tập trung vào trải nghiệm học tập, tính minh bạch của dữ liệu và hiệu quả vận hành.",
    featuresTitle: "Product Features",
    f1: "Trung tâm học viên (Daily Tasks)",
    f2: "Bài học & Sách số",
    f3: "Luyện tập & Kiểm tra",
    f4: "Lớp học & Điểm danh",
    f5: "Báo cáo & Quản trị",
    f6: "Tích hợp & Dịch vụ",
    clientsTitle: "Our clients and partners",
    successTitle: "Success stories",
    registerTitle: "Registration Form",
    registerDesc:
      "Đăng ký để nhận tư vấn triển khai trong 24h và dùng thử miễn phí.",
    name: "Họ và tên",
    email: "Email",
    phone: "Số điện thoại",
    center: "Tên trung tâm (nếu có)",
    role: "Vai trò",
    roleAdmin: "Chủ trung tâm / Quản lý",
    roleTeacher: "Giáo viên",
    roleStudent: "Học viên",
    message: "Ghi chú",
    submit: "Gửi đăng ký",
    placementTitle: "Placement Test (Free)",
    placementDesc:
      "Đánh giá nhanh trình độ hiện tại (Reading/Listening) để gợi ý lộ trình phù hợp.",
    startTest: "Bắt đầu làm bài",
    ctaSubTitle: "Sẵn sàng tăng tốc cho trung tâm của bạn?",
    ctaSubDesc:
      "Chọn gói phù hợp – có thể nâng cấp bất kỳ lúc nào. Hỗ trợ di trú dữ liệu và đào tạo đội ngũ.",
    startNow: "Bắt đầu ngay",
    footerCompany: "CÔNG TY CỔ PHẦN XINKGROUP",
    address: "Lô 8B2, An Thượng 37, Ngũ Hành Sơn, Đà Nẵng, Việt Nam",
  },
  en: {
    brand: "DLA LMS",
    tagline: "Smart learning platform for language centers",
    subTag: "Lean operations, personalized paths, transparent progress",
    navAbout: "About us",
    navMaterials: "Learning Material",
    navAuth: "Sign up/Sign in",
    heroCta1: "Start free",
    heroCta2: "Watch demo",
    storyTitle: "The story of us",
    storyBody:
      "DLA LMS was born from real classroom needs: simple to deploy yet deep enough to track each learner. We focus on learner experience, data transparency, and operational efficiency.",
    featuresTitle: "Product Features",
    f1: "Student Center (Daily Tasks)",
    f2: "Lessons & Digital Books",
    f3: "Practice & Tests",
    f4: "Classes & Attendance",
    f5: "Reports & Admin",
    f6: "Integrations & Services",
    clientsTitle: "Our clients and partners",
    successTitle: "Success stories",
    registerTitle: "Registration Form",
    registerDesc: "Register to get a 24h onboarding consultation and free trial.",
    name: "Full name",
    email: "Email",
    phone: "Phone number",
    center: "Center name (optional)",
    role: "Role",
    roleAdmin: "Owner / Manager",
    roleTeacher: "Teacher",
    roleStudent: "Student",
    message: "Message",
    submit: "Submit",
    placementTitle: "Placement Test (Free)",
    placementDesc:
      "Quickly assess current level (Reading/Listening) to propose a tailored path.",
    startTest: "Start test",
    ctaSubTitle: "Ready to accelerate your school?",
    ctaSubDesc:
      "Pick a plan — upgrade anytime. We assist with data migration and staff training.",
    startNow: "Start now",
    footerCompany: "XINKGROUP JSC",
    address: "An Thuong 37, Ngu Hanh Son, Da Nang, Vietnam",
  },
};

function useI18n() {
  const [lang, setLang] = useState("vi");
  const t = useMemo(
    () => (key) => (dict[lang] && dict[lang][key]) || dict.en[key] || key,
    [lang]
  );
  return { lang, setLang, t };
}

const BrandLogo = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 64 64" width="32" height="32" aria-hidden>
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#g)" />
    <path d="M18 40L30 22l8 10 8-10 2 28H18Z" fill="white" opacity="0.95" />
  </svg>
);

function LanguageMenu({ lang, onChange }) {
  const [open, setOpen] = useState(false);
  const current = LANGS.find((l) => l.code === lang) || LANGS[0];
  return (
    <div className="relative">
      <button
        className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-white/90 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="h-4 w-4 text-sky-600" /> {current.label}
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-sky-200 bg-white p-1 shadow-2xl"
        >
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                role="option"
                aria-selected={l.code === lang}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-sky-50 ${
                  l.code === lang ? "bg-sky-50" : ""
                }`}
                onClick={() => {
                  onChange(l.code);
                  setOpen(false);
                }}
              >
                <span className="h-2 w-2 rounded-full bg-sky-500" /> {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`py-16 sm:py-24 ${className}`}>{children}</section>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-sky-100 bg-white/95 p-6 shadow-sm ring-1 ring-sky-50 ${className}`}>{children}</div>
);

// ===================== PAGE =====================
export default function HomePro() {
  const { lang, setLang, t } = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50 text-slate-800">
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white/85 shadow-sm backdrop-blur">
        <div className="h-0.5 w-full bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-400" />
        <Container className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo className="h-8 w-8" />
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">{t("brand")}</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#about" className="text-[15px] sm:text-base text-slate-600 hover:text-slate-900">
              {t("navAbout")}
            </a>
            <a href="#materials" className="text-[15px] sm:text-base text-slate-600 hover:text-slate-900">
              {t("navMaterials")}
            </a>
           
          </nav>
          <div className="flex items-center gap-3">
            <LanguageMenu lang={lang} onChange={setLang} />
            <SecondaryButton href="/login">Sign in</SecondaryButton>
            <PrimaryButton href="#register">
              Sign up <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
          </div>
        </Container>
      </header>

      {/* ===================== HERO 100vh WITH VIDEO ===================== */}
      <section className="relative min-h-[100svh] overflow-hidden">
        {/* Background video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          poster="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-sky-900/50" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 400px at 10% -10%, rgba(56,189,248,0.25), transparent 60%), radial-gradient(700px 360px at 90% -20%, rgba(6,182,212,0.3), transparent 55%)",
          }}
        />

        <Container className="relative z-10 grid min-h-[100svh] place-items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center text-white"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> {t("brand")} — EdTech for everyone
            </div>
            <h1 className="mb-4 text-5xl font-extrabold tracking-tight sm:text-7xl">
              {t("tagline")}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base text-white/90 sm:text-lg">
              {t("subTag")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <PrimaryButton href="#register">{t("heroCta1")} <ArrowRight className="h-4 w-4" /></PrimaryButton>
              <SecondaryButton href="#reel">{t("heroCta2")} <PlayCircle className="h-4 w-4" /></SecondaryButton>
            </div>
          </motion.div>

          <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-white/90 sm:flex">
            <span className="text-xs">Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
              <ArrowRight className="rotate-90" />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===================== REEL: STICKY VIDEO + TEXT ===================== */}
      <section id="reel" className="relative bg-white">
        <Container className="grid gap-8 py-16 lg:grid-cols-2">
          {/* Sticky video */}
          <div className="lg:sticky lg:top-20">
            <Card>
              <div className="aspect-video overflow-hidden rounded-xl">
                <video
                  className="h-full w-full object-cover"
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
              <div className="mt-3 text-sm text-slate-600">Demo quy trình học tập & quản trị trên DLA LMS</div>
            </Card>
          </div>
          {/* Step text */}
          <div className="space-y-6">
            {[
              {
                title: "1. Student Center",
                desc: "Nhiệm vụ mỗi ngày, nhắc lịch, chấm điểm tự động.",
                Icon: Clock,
              },
              {
                title: "2. Lessons & Digital Books",
                desc: "Video, tài liệu, sách số – theo dõi % tiến độ.",
                Icon: BookOpen,
              },
              {
                title: "3. Practice & Tests",
                desc: "Ngân hàng luyện tập, phân tích điểm/tiến bộ.",
                Icon: LineChart,
              },
              {
                title: "4. Classes & Attendance",
                desc: "Điểm danh, phản hồi sau buổi học, cảnh báo vắng.",
                Icon: Users,
              },
              { title: "5. Reports & Admin", desc: "Phân quyền, báo cáo doanh thu.", Icon: Shield },
            ].map(({ title, desc, Icon }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                viewport={{ once: true, margin: "-80px" }}
                className="group rounded-2xl border border-sky-100 bg-white/95 p-6 shadow-sm ring-1 ring-sky-50"
              >
                <div className="mb-1 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100 group-hover:scale-110 transition">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-lg font-semibold text-slate-900">{title}</div>
                </div>
                <p className="text-sm text-slate-600">{desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================== STORY (100vh SECTION) ===================== */}
      <Section id="about" className="min-h-[100svh] bg-gradient-to-b from-sky-50 to-white">
        <Container>
          <div className="mx-auto grid h-full items-center gap-8 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="mb-4 text-3xl font-bold text-slate-900">{t("storyTitle")}</h2>
              <p className="text-lg leading-8 text-slate-700">{t("storyBody")}</p>
              <div className="mt-6 flex gap-3">
                <PrimaryButton href="#register">{t("heroCta1")} <ArrowRight className="h-4 w-4" /></PrimaryButton>
                <SecondaryButton href="#materials">Explore materials</SecondaryButton>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-3"
            >
              <img className="h-48 w-full rounded-2xl object-cover shadow" src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=60" />
              <img className="h-48 w-full rounded-2xl object-cover shadow" src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=60" />
              <img className="h-48 w-full rounded-2xl object-cover shadow" src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=60" />
              <div className="relative h-48 w-full overflow-hidden rounded-2xl shadow">
                <video className="h-full w-full object-cover" src="https://www.w3schools.com/html/mov_bbb.mp4" autoPlay muted loop playsInline />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ===================== FEATURES (REVEAL CARDS) ===================== */}
      <Section id="features" className="bg-white">
        <Container>
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">{t("featuresTitle")}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { Icon: Clock, title: t("f1"), desc: "Tự động giao nhiệm vụ, nhắc lịch, theo dõi trạng thái hoàn thành." },
              { Icon: BookOpen, title: t("f2"), desc: "Video + phụ đề/ghi chú, sách số, đánh dấu đọc & % tiến độ." },
              { Icon: LineChart, title: t("f3"), desc: "Ngân hàng luyện tập, Progress/Final Test, thống kê điểm." },
              { Icon: Users, title: t("f4"), desc: "Quản lý lớp, điểm danh, cảnh báo vắng, phản hồi sau giờ học." },
              { Icon: Shield, title: t("f5"), desc: "Phân quyền, kiểm duyệt, báo cáo doanh thu & hiệu suất." },
              { Icon: GraduationCap, title: t("f6"), desc: "Google Calendar, APEUni, đăng ký thi & hỗ trợ 24/7." },
            ].map(({ Icon, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                viewport={{ once: true, margin: "-60px" }}
                className="group rounded-2xl border border-sky-100 bg-white p-6 shadow-sm ring-1 ring-sky-50 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100 group-hover:scale-110 transition">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                </div>
                <p className="text-sm text-slate-600">{desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===================== MATERIALS ===================== */}
      <Section id="materials" className="bg-gradient-to-b from-white to-sky-50">
        <Container>
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">Learning Material</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { cat: "Reading", img: "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?auto=format&fit=crop&w=800&q=60" },
              { cat: "Listening", img: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?auto=format&fit=crop&w=800&q=60" },
              { cat: "Grammar", img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=60" },
            ].map(({ cat, img }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-sky-100 bg-white/95 p-4 shadow-sm"
              >
                <div className="overflow-hidden rounded-xl">
                  <img src={img} alt={cat} className="h-40 w-full transform object-cover transition group-hover:scale-105" />
                </div>
                <div className="mt-3 text-base font-semibold text-slate-900">{cat}</div>
                <p className="text-sm text-slate-600">Kho học liệu số theo chủ đề, kèm ví dụ & bài luyện liên quan.</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===================== REGISTER (SHORT) ===================== */}
      <Section id="register" className="bg-white">
        <Container>
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 text-center text-3xl font-bold text-slate-900">{t("registerTitle")}</h2>
            <p className="mb-8 text-center text-slate-600">{t("registerDesc")}</p>

            {/* Gradient frame */}
            <div className="rounded-3xl bg-gradient-to-r from-sky-200 to-cyan-200 p-1 shadow-sm">
              <div className="rounded-[22px] bg-white">
                <div className="grid gap-0 md:grid-cols-5">
                  {/* LEFT: FORM */}
                  <div className="md:col-span-3 p-6 sm:p-8">
                    <div className="mb-6 flex items-center gap-2 text-slate-500">
                      <div className="h-2 w-2 rounded-full bg-sky-500" /><div className="h-2 w-2 rounded-full bg-cyan-500" /><div className="h-2 w-2 rounded-full bg-sky-400" />
                      <span className="text-sm">Thông tin liên hệ</span>
                    </div>

                    <form
                      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        alert("Submitted!");
                      }}
                    >
                      <div className="sm:col-span-1">
                        <label className="mb-1 block text-sm font-medium text-slate-700">{t("name")}</label>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-sky-500">
                            <Users className="h-4 w-4" />
                          </div>
                          <input
                            required
                            className="w-full rounded-xl border border-sky-200 bg-white pl-9 pr-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                            placeholder="Nguyễn Văn A"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-1">
                        <label className="mb-1 block text-sm font-medium text-slate-700">{t("email")}</label>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-sky-500">
                            <Mail className="h-4 w-4" />
                          </div>
                          <input
                            type="email"
                            required
                            className="w-full rounded-xl border border-sky-200 bg-white pl-9 pr-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-1">
                        <label className="mb-1 block text-sm font-medium text-slate-700">{t("phone")}</label>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-sky-500">
                            <Phone className="h-4 w-4" />
                          </div>
                          <input
                            className="w-full rounded-xl border border-sky-200 bg-white pl-9 pr-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                            placeholder="09xx xxx xxx"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-1">
                        <label className="mb-1 block text-sm font-medium text-slate-700">{t("center")}</label>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-sky-500">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <input
                            className="w-full rounded-xl border border-sky-200 bg-white pl-9 pr-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                            placeholder="Tên trung tâm"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-1">
                        <label className="mb-1 block text-sm font-medium text-slate-700">{t("role")}</label>
                        <select className="w-full rounded-xl border border-sky-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400">
                          <option>{t("roleAdmin")}</option>
                          <option>{t("roleTeacher")}</option>
                          <option>{t("roleStudent")}</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="mb-1 block text-sm font-medium text-slate-700">{t("message")}</label>
                        <textarea
                          rows={4}
                          className="w-full rounded-xl border border-sky-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                          placeholder="Nhu cầu, quy mô, thời gian triển khai…"
                        />
                      </div>

                      <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        
                        <div className="flex items-center justify-end gap-3">
                          <SecondaryButton href="#">Tải brochure</SecondaryButton>
                          <PrimaryButton>
                            {t("submit")} <ArrowRight className="h-4 w-4" />
                          </PrimaryButton>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* RIGHT: INFO PANEL */}
                  <div className="md:col-span-2 rounded-b-[22px] md:rounded-r-[22px] md:rounded-bl-none bg-gradient-to-b from-sky-50 to-white p-6 sm:p-8">
                    <div className="mb-4 text-sm font-semibold text-sky-700">Bạn sẽ nhận được</div>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-600"/>Tư vấn triển khai 1-1 trong 24h</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-600"/>Dùng thử miễn phí & demo theo nhu cầu</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-600"/>Hỗ trợ di trú dữ liệu & đào tạo đội ngũ</li>
                    </ul>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      <div className="rounded-2xl border border-sky-100 bg-white p-3 text-center text-xs text-slate-700"><span className="font-semibold">10+</span> trung tâm</div>
                      <div className="rounded-2xl border border-sky-100 bg-white p-3 text-center text-xs text-slate-700"><span className="font-semibold">98%</span> hài lòng</div>
                      <div className="rounded-2xl border border-sky-100 bg-white p-3 text-center text-xs text-slate-700"><span className="font-semibold">24h</span> on-boarding</div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-sky-100 bg-white p-4 text-sm text-slate-600">
                      <div className="mb-2 text-slate-900 font-semibold">Liên hệ nhanh</div>
                      <div className="flex flex-wrap items-center gap-3 text-slate-700">
                        <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-sky-600"/> +84 236 000 000</span>
                        <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-sky-600"/> hello@dla-lms.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ===================== FOOTER ===================== */}
      <footer id="footer" className="bg-[#0b1220] text-slate-100">
  <Container className="py-12">
    <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
      <div>
        <div className="text-2xl font-bold">DLA LMS</div>
        <div className="mt-4 space-y-2 text-[15px] text-slate-300">
          <p>CÔNG TY CỔ PHẦN XINKGROUP</p>
          <p>Mã số DN: 0402241823. Giấy ĐKKD do Sở KH&ĐT Đà Nẵng cấp lần đầu ngày 12/07/2024.</p>
          <p>Tầng 4, Tòa nhà ICT1, Khu Công viên Phần mềm số 2, đường Như Nguyệt, phường Hải Châu, TP. Đà Nẵng, Việt Nam</p>
        </div>
        <div className="mt-6 flex gap-4">
          <a href="#contact" className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10"><Phone className="h-5 w-5"/></a>
          <a href="mailto:hello@dla-lms.com" className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10"><Mail className="h-5 w-5"/></a>
          <a href="#map" className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10"><MapPin className="h-5 w-5"/></a>
        </div>
      </div>
      <div>
        <div className="text-lg font-semibold">Sản phẩm</div>
        <ul className="mt-4 space-y-3 text-slate-300">
          <li><a className="hover:text-white" href="#features">Tính năng</a></li>
          <li><a className="hover:text-white" href="#pricing">Bảng giá</a></li>
          <li><a className="hover:text-white" href="#success">Khách hàng nói gì</a></li>
          <li><a className="hover:text-white" href="#reel">Demo</a></li>
        </ul>
      </div>
      <div>
        <div className="text-lg font-semibold">Hỗ trợ</div>
        <ul className="mt-4 space-y-3 text-slate-300">
          <li><a className="hover:text-white" href="#faq">FAQ</a></li>
          <li><a className="hover:text-white" href="#contact">Liên hệ</a></li>
          <li><a className="hover:text-white" href="#docs">Tài liệu</a></li>
          <li><a className="hover:text-white" href="#guide">Hướng dẫn</a></li>
        </ul>
      </div>
    </div>

    <div className="mt-10 border-t border-white/10 pt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2 text-slate-400 text-sm">
        <img src="https://cdn-icons-png.flaticon.com/512/833/833593.png" alt="" className="h-5 w-5"/>
        <span>© 2025 XinKGroup. Bảo lưu mọi quyền.</span>
      </div>
      <div className="flex gap-6 text-sm text-slate-300">
        <a className="hover:text-white" href="#terms">Điều khoản</a>
        <a className="hover:text-white" href="#privacy">Bảo mật</a>
        <a className="hover:text-white" href="#policy">Chính sách</a>
      </div>
    </div>
  </Container>
</footer>
    </div>
  );
}
