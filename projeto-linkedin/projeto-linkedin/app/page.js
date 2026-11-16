import Image from "next/image";

// Reusable SVG Icons for LinkedIn Interface
function LinkedInLogo() {
  return (
    <svg className="w-8 h-8 md:w-9 md:h-9 text-[#0A66C2] shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.32a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 9v2h-2v7a3 3 0 0 1-3 3h-4v-6h-4v6H6a3 3 0 0 1-3-3v-7H1V9l11-7z" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 16v6H9v-6H8a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-1v6h-3v-6zm0-12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    </svg>
  );
}

function JobsIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 6V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H2a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a1 1 0 0 0-1-1h-5zM9 4h6v2H9V4zm11 15H4v-5h3v2h2v-2h6v2h2v-2h3v5z" />
    </svg>
  );
}

function MessagingIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 4H8a7 7 0 0 0-7 7c0 2.5 1.3 4.7 3.3 6L4 21l4.4-1.3c1.1.3 2.3.4 3.6.4 5.5 0 10-4.5 10-10a7 7 0 0 0-6-6.1z" />
    </svg>
  );
}

function NotificationsIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 13.5V8a7 7 0 1 0-14 0v5.5L3 17v1h18v-1l-2-3.5zM12 22a2.5 2.5 0 0 0 2.5-2.5h-5A2.5 2.5 0 0 0 12 22z" />
    </svg>
  );
}

function WorkGridIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h4v4H3V3zm7 0h4v4h-4V3zm7 0h4v4h-4V3zM3 10h4v4H3v-4zm7 0h4v4h-4v-4zm7 0h4v4h-4v-4zM3 17h4v4H3v-4zm7 0h4v4h-4v-4zm7 0h4v4h-4v-4z" />
    </svg>
  );
}

function ReactionsBadge({ count = 124, comments = 5 }) {
  return (
    <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-[#38434F]/30 mt-2">
      <div className="flex items-center gap-1.5">
        <div className="flex -space-x-1 items-center">
          <span className="w-4 h-4 rounded-full bg-[#0A66C2] flex items-center justify-center text-[10px] text-white">👍</span>
          <span className="w-4 h-4 rounded-full bg-[#DF704D] flex items-center justify-center text-[10px] text-white">❤️</span>
          <span className="w-4 h-4 rounded-full bg-[#5F9B4D] flex items-center justify-center text-[10px] text-white">💡</span>
        </div>
        <span className="hover:text-[#70b5f9] hover:underline cursor-pointer">{count}</span>
      </div>
      <span className="hover:text-[#70b5f9] hover:underline cursor-pointer">{comments} comentários</span>
    </div>
  );
}

// 1. Navigation Header
function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#1D2226] border-b border-[#38434F]/50 px-4 md:px-6">
      <div className="max-w-[1128px] mx-auto h-[53px] flex items-center justify-between gap-2 md:gap-4">
        {/* Left Side: Logo & Search */}
        <div className="flex items-center gap-2 flex-1 md:flex-initial">
          <a href="#" aria-label="LinkedIn Home" className="shrink-0">
            <LinkedInLogo />
          </a>
          <div className="relative w-full max-w-[280px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Pesquisar"
              className="w-full pl-9 pr-4 py-1.5 bg-[#101418] text-sm text-gray-200 placeholder-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-gray-300 border border-transparent focus:border-gray-500 transition-all"
            />
          </div>
        </div>

        {/* Right Side: Navigation Items */}
        <nav className="flex items-center gap-1 sm:gap-3 md:gap-6 overflow-x-auto no-scrollbar">
          <a href="#" className="flex flex-col items-center justify-center text-gray-300 hover:text-white transition-colors min-w-[50px] py-1 border-b-2 border-white">
            <HomeIcon />
            <span className="text-[11px] hidden sm:inline-block">Início</span>
          </a>
          <a href="#" className="flex flex-col items-center justify-center text-gray-400 hover:text-gray-200 transition-colors min-w-[50px] py-1 border-b-2 border-transparent">
            <NetworkIcon />
            <span className="text-[11px] hidden sm:inline-block">Minha rede</span>
          </a>
          <a href="#" className="flex flex-col items-center justify-center text-gray-400 hover:text-gray-200 transition-colors min-w-[50px] py-1 border-b-2 border-transparent">
            <JobsIcon />
            <span className="text-[11px] hidden sm:inline-block">Vagas</span>
          </a>
          <a href="#" className="flex flex-col items-center justify-center text-gray-400 hover:text-gray-200 transition-colors min-w-[50px] py-1 border-b-2 border-transparent">
            <MessagingIcon />
            <span className="text-[11px] hidden sm:inline-block">Mensagens</span>
          </a>
          <a href="#" className="flex flex-col items-center justify-center text-gray-400 hover:text-gray-200 transition-colors min-w-[50px] py-1 border-b-2 border-transparent">
            <NotificationsIcon />
            <span className="text-[11px] hidden sm:inline-block">Notificações</span>
          </a>

          <div className="h-8 w-[1px] bg-[#38434F]/60 hidden md:block" />

          <a href="#" className="hidden sm:flex flex-col items-center justify-center text-gray-400 hover:text-gray-200 transition-colors min-w-[50px] py-1 border-b-2 border-transparent">
            <div className="flex items-center gap-0.5">
              <WorkGridIcon />
              <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 12 12">
                <path d="M6 8.5L2 4.5h8z" />
              </svg>
            </div>
            <span className="text-[11px]">Soluções</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

// 2. Profile Main Card
function ProfileHeaderCard() {
  return (
    <section className="bg-[#1D2226] rounded-lg border border-[#38434F]/40 overflow-hidden shadow-sm">
      {/* Cover Banner */}
      <div className="relative w-full h-36 sm:h-48 md:h-52 bg-[#121622]">
        <Image
          src="/banner.svg"
          alt="Banner de capa com editor de código"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Profile Details Container */}
      <div className="px-4 sm:px-6 pb-6 pt-0 relative">
        {/* Profile Picture Overlap */}
        <div className="relative -mt-16 sm:-mt-20 md:-mt-24 mb-3 inline-block">
          <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 border-[#1D2226] bg-[#1a1e23] overflow-hidden shadow-md">
            <Image
              src="/profile.svg"
              alt="Foto de perfil de Nome Sobrenome"
              width={160}
              height={160}
              priority
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info Grid: Left bio / Right affiliations */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          {/* Left Column: Personal info */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Nome Sobrenome
            </h1>
            <p className="text-sm sm:text-base text-gray-200 font-normal mt-0.5 leading-snug">
              Desenvolvedora | HTML | CSS | Typescript | Node
            </p>
            <p className="text-xs text-gray-400 mt-1.5">
              Fala sobre #javascript, #frontend, #reactjs, e #backend
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1.5 flex flex-wrap items-center gap-1">
              <span>Cidade, estado e país</span>
              <span>·</span>
              <a href="#" className="text-[#70b5f9] font-semibold hover:underline">
                Informações de contato
              </a>
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 flex flex-wrap items-center gap-1">
              <a href="#" className="text-[#70b5f9] font-semibold hover:underline">
                ??? seguidores
              </a>
              <span>·</span>
              <a href="#" className="text-[#70b5f9] font-semibold hover:underline">
                ??? conexões
              </a>
            </p>

            {/* Interaction Buttons */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <button
                type="button"
                className="bg-[#70b5f9] hover:bg-[#8ec7fc] text-[#0A101D] font-semibold text-sm px-4 py-1.5 rounded-full transition-colors duration-150 flex items-center justify-center shadow"
              >
                Mensagem
              </button>
              <button
                type="button"
                className="border border-gray-400 hover:border-white hover:bg-white/10 text-white font-semibold text-sm px-5 py-1.5 rounded-full transition-colors duration-150"
              >
                Mais
              </button>
            </div>
          </div>

          {/* Right Column: Company and Education Preview */}
          <div className="w-full md:w-auto flex flex-col gap-2.5 pt-1 md:self-start">
            <a href="#experiencias" className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 rounded shrink-0 overflow-hidden bg-[#242b35] p-0.5 border border-[#38434F]/60">
                <Image src="/company.svg" alt="Logo da empresa" width={32} height={32} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-[#70b5f9] group-hover:underline">
                Empresa
              </span>
            </a>
            <a href="#formacao" className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 rounded shrink-0 overflow-hidden bg-[#242b35] p-0.5 border border-[#38434F]/60">
                <Image src="/education.svg" alt="Logo da instituição de ensino" width={32} height={32} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-[#70b5f9] group-hover:underline">
                Instituição de ensino
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// 3. Featured Section Card
function FeaturedCard() {
  const highlights = [
    {
      id: 1,
      caption: "Legenda da primeira publicação...",
      likes: 124,
      comments: 5,
    },
    {
      id: 2,
      caption: "Legenda da segunda publicação...",
      likes: 124,
      comments: 5,
    },
    {
      id: 3,
      caption: "Legenda da terceira publicação...",
      likes: 124,
      comments: 5,
    },
  ];

  return (
    <section className="bg-[#1D2226] rounded-lg border border-[#38434F]/40 p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
        Destaques
      </h2>

      {/* Grid of 3 Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {highlights.map((item) => (
          <article
            key={item.id}
            className="bg-[#15191C] border border-[#38434F]/40 rounded-lg p-3 flex flex-col justify-between hover:border-gray-500 transition-colors"
          >
            <div>
              <span className="text-[11px] text-gray-400 font-medium">Publicação</span>
              <p className="text-xs sm:text-sm text-gray-200 font-medium mt-1 truncate">
                {item.caption}
              </p>
              <div className="w-full h-28 relative rounded overflow-hidden mt-2 bg-[#0c0e14] border border-[#2a303c]">
                <Image
                  src="/code-preview.svg"
                  alt={`Preview do destaque ${item.id}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <ReactionsBadge count={item.likes} comments={item.comments} />
          </article>
        ))}
      </div>
    </section>
  );
}

// 4. Activity Section Card
function ActivityCard() {
  const activities = [
    {
      id: 1,
      action: "Nome Sobrenome publicou isso · 1 sem",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu...",
      likes: 124,
      comments: 5,
    },
    {
      id: 2,
      action: "Nome Sobrenome compartilhou isso · 1 sem",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu...",
      likes: 124,
      comments: 5,
    },
  ];

  return (
    <section className="bg-[#1D2226] rounded-lg border border-[#38434F]/40 p-4 sm:p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-white">Atividades</h2>
        <a href="#" className="text-xs sm:text-sm text-[#70b5f9] font-medium hover:underline">
          ??? seguidores
        </a>
      </div>

      <div className="space-y-4">
        {activities.map((act, index) => (
          <article key={act.id} className={index > 0 ? "pt-4 border-t border-[#38434F]/40" : ""}>
            <p className="text-xs text-gray-400 mb-2">{act.action}</p>
            <div className="flex gap-3 items-start">
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 relative rounded overflow-hidden bg-[#0c0e14] border border-[#2a303c]">
                <Image
                  src="/code-preview.svg"
                  alt="Miniatura de publicação"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-3 flex-1">
                {act.text}
              </p>
            </div>
            <ReactionsBadge count={act.likes} comments={act.comments} />
          </article>
        ))}
      </div>

      {/* Footer link to all activities */}
      <div className="mt-4 pt-3 border-t border-[#38434F]/40 text-center">
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-300 hover:text-[#70b5f9] transition-colors"
        >
          <span>Exibir todas as atividades</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}

// 5. About Section Card
function AboutCard() {
  return (
    <section className="bg-[#1D2226] rounded-lg border border-[#38434F]/40 p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-3">Sobre</h2>
      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
    </section>
  );
}

// 6. Experience Section Card
function ExperienceCard() {
  const experiences = [
    {
      id: 1,
      role: "Full Stack Developer",
      type: "Tempo integral",
      period: "jan de 2022 - o momento · 6 meses",
      location: "Cidade, estado e país",
      current: true,
    },
    {
      id: 2,
      role: "Full Stack Developer (JR)",
      type: "Tempo integral",
      period: "jun de 2021 - jan de 2022 · 8 meses",
      location: "Cidade, estado e país",
      current: false,
    },
    {
      id: 3,
      role: "Front-end Developer",
      type: "Tempo integral",
      period: "jan de 2021 - jun de 2021 · 6 meses",
      location: "Cidade, estado e país",
      current: false,
    },
  ];

  return (
    <section id="experiencias" className="bg-[#1D2226] rounded-lg border border-[#38434F]/40 p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Experiências</h2>

      {/* Company Header */}
      <div className="flex items-start gap-3 mb-2">
        <div className="w-12 h-12 rounded overflow-hidden shrink-0 bg-[#242b35] border border-[#38434F]/60 p-0.5">
          <Image src="/company.svg" alt="Logo da Empresa" width={48} height={48} />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-white">Empresa</h3>
          <p className="text-xs text-gray-400">1 a 7 m</p>
        </div>
      </div>

      {/* Timeline with vertical line connecting roles */}
      <div className="relative pl-6 sm:pl-7 ml-5 sm:ml-6 mt-3 border-l-2 border-[#38434F]/60 space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Timeline Bullet */}
            <span
              className={`absolute -left-[31px] sm:-left-[35px] top-1.5 w-3 h-3 rounded-full border-2 border-[#1D2226] ${exp.current ? "bg-[#70b5f9]" : "bg-gray-400"
                }`}
            />

            <h4 className="text-sm sm:text-base font-semibold text-white leading-tight">
              {exp.role}
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">{exp.type}</p>
            <p className="text-xs text-gray-400 mt-0.5">{exp.period}</p>
            <p className="text-xs text-gray-400 mt-0.5">{exp.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// 7. Education Section Card
function EducationCard() {
  return (
    <section id="formacao" className="bg-[#1D2226] rounded-lg border border-[#38434F]/40 p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Formação acadêmica</h2>

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded overflow-hidden shrink-0 bg-[#242b35] border border-[#38434F]/60 p-0.5">
          <Image src="/education.svg" alt="Logo da Instituição de ensino" width={48} height={48} />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-white">
            Instituição de ensino
          </h3>
          <p className="text-xs sm:text-sm text-gray-200 mt-0.5">
            Nome do curso
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            2016 a 2019
          </p>
        </div>
      </div>
    </section>
  );
}

// 8. Languages Section Card
function LanguagesCard() {
  return (
    <section className="bg-[#1D2226] rounded-lg border border-[#38434F]/40 p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Idiomas</h2>

      <div className="space-y-3">
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-white">Português</h3>
          <p className="text-xs text-gray-400 mt-0.5">Fluente ou nativo</p>
        </div>

        <div className="border-t border-[#38434F]/40 pt-3">
          <h3 className="text-sm sm:text-base font-semibold text-white">Inglês</h3>
          <p className="text-xs text-gray-400 mt-0.5">Intermediário</p>
        </div>
      </div>
    </section>
  );
}

// 9. Sidebar: People Also Viewed
function PeopleAlsoViewedCard() {
  const people = [
    { id: 1, avatar: "/avatar-1.svg" },
    { id: 2, avatar: "/avatar-2.svg" },
    { id: 3, avatar: "/avatar-3.svg" },
    { id: 4, avatar: "/avatar-4.svg" },
    { id: 5, avatar: "/avatar-5.svg" },
  ];

  return (
    <aside className="bg-[#1D2226] rounded-lg border border-[#38434F]/40 p-4 shadow-sm">
      <h3 className="text-sm sm:text-base font-semibold text-white mb-4">
        As pessoas também viram
      </h3>

      <div className="space-y-4">
        {people.map((person, index) => (
          <div
            key={person.id}
            className={`flex items-start gap-3 ${index > 0 ? "pt-4 border-t border-[#38434F]/40" : ""}`}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#38434F]/40 bg-[#161a1e]">
              <Image src={person.avatar} alt="Foto de perfil" width={48} height={48} className="object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white truncate hover:text-[#70b5f9] hover:underline cursor-pointer">
                Nome e sobrenome
              </h4>
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-2 leading-tight">
                Título, cargo e tecnologias. Lorem Ipsum Dolor sit Amet
              </p>
              <button
                type="button"
                className="mt-2.5 inline-flex items-center gap-1.5 border border-gray-400 hover:border-white hover:bg-white/10 text-gray-200 text-xs font-semibold px-3 py-1 rounded-full transition-colors"
              >
                <MessagingIcon />
                <span>Enviar mensagem</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

// 10. Sidebar: People You May Know
function PeopleYouMayKnowCard() {
  const people = [
    { id: 1, avatar: "/avatar-2.svg" },
    { id: 2, avatar: "/avatar-1.svg" },
    { id: 3, avatar: "/avatar-4.svg" },
    { id: 4, avatar: "/avatar-3.svg" },
    { id: 5, avatar: "/avatar-5.svg" },
  ];

  return (
    <aside className="bg-[#1D2226] rounded-lg border border-[#38434F]/40 p-4 shadow-sm">
      <h3 className="text-sm sm:text-base font-semibold text-white mb-4">
        Pessoas que talvez você conheça
      </h3>

      <div className="space-y-4">
        {people.map((person, index) => (
          <div
            key={person.id}
            className={`flex items-start gap-3 ${index > 0 ? "pt-4 border-t border-[#38434F]/40" : ""}`}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#38434F]/40 bg-[#161a1e]">
              <Image src={person.avatar} alt="Foto de perfil" width={48} height={48} className="object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white truncate hover:text-[#70b5f9] hover:underline cursor-pointer">
                Nome e sobrenome
              </h4>
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-2 leading-tight">
                Título, cargo e tecnologias. Lorem Ipsum Dolor sit Amet
              </p>
              <button
                type="button"
                className="mt-2.5 inline-flex items-center gap-1.5 border border-gray-400 hover:border-white hover:bg-white/10 text-gray-200 text-xs font-semibold px-4 py-1 rounded-full transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
                <span>Conectar</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

// 11. Footer
function Footer() {
  return (
    <footer className="mt-8 pb-10 text-center text-xs text-gray-500">
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-[600px] mx-auto mb-2">
        <a href="#" className="hover:text-[#70b5f9] hover:underline">Sobre</a>
        <a href="#" className="hover:text-[#70b5f9] hover:underline">Acessibilidade</a>
        <a href="#" className="hover:text-[#70b5f9] hover:underline">Central de Ajuda</a>
        <a href="#" className="hover:text-[#70b5f9] hover:underline">Privacidade e Termos</a>
        <a href="#" className="hover:text-[#70b5f9] hover:underline">Preferências de anúncios</a>
        <a href="#" className="hover:text-[#70b5f9] hover:underline">Publicidade</a>
      </div>
      <p className="flex items-center justify-center gap-1.5">
        <span className="font-semibold text-gray-400">LinkedIn Corporation</span> © {new Date().getFullYear()}
      </p>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#f3f2ef]">
      {/* Top Global Navigation */}
      <Header />

      {/* Main Container: 2-column layout */}
      <div className="max-w-[1128px] mx-auto px-2 sm:px-4 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Main Left Column (Profile & Sections) */}
          <main className="lg:col-span-8 space-y-4">
            <ProfileHeaderCard />
            <FeaturedCard />
            <ActivityCard />
            <AboutCard />
            <ExperienceCard />
            <EducationCard />
            <LanguagesCard />
          </main>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <PeopleAlsoViewedCard />
            <PeopleYouMayKnowCard />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
