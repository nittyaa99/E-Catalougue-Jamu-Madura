import React, { useEffect } from "react";
import logoJamu from "../pages/user/Logo jamu madura.png";

const FooterUser: React.FC = () => {
  // Efek untuk animasi scroll-in pada footer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-animate-footer');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.hide-animate-footer');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <footer className="w-full relative flex flex-col z-20 mt-8 sm:mt-12">
      {/* Definisi Animasi Khusus untuk Footer */}
      <style>
        {`
          .hide-animate-footer {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          .show-animate-footer {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        `}
      </style>
      {/* Main Content Area (White Background) */}
      <div className="bg-white w-full pt-12 pb-4 flex flex-col items-center text-center px-4 relative z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.03)]">
        
        {/* Banner Tab (Menempel persis di atas background putih) */}
        <div className="hide-animate-footer absolute bottom-full left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl bg-[#34C759] rounded-t-2xl py-4 px-6 text-center z-30" style={{transitionDelay: '0.1s'}}>
          <p className="font-semibold text-gray-900 text-[15px] sm:text-[17px] leading-relaxed drop-shadow-sm">
            🌿 Jangan lupa minum jamu yaa 🍵✨ Sehat terus, semangat terus 💪😊{" "}
            <br className="hidden sm:block" />
            Stay healthy and keep smiling yaa ✨😊
          </p>
        </div>
        {/* Logo and Title */}
        <div className="hide-animate-footer flex items-center gap-5 mb-8" style={{transitionDelay: '0.2s'}}>
          {/* Actual Logo */}
          <div className="w-[80px] sm:w-[100px] h-[80px] sm:h-[100px] bg-[#E8E8E8] rounded-[20px] flex items-center justify-center shadow-inner overflow-hidden border border-gray-100">
            <img src={logoJamu} alt="Jamu Madura Logo" className="w-[80%] h-[80%] object-contain" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif font-bold text-[36px] sm:text-[42px] text-gray-800 leading-tight tracking-tight">JamuMadura</span>
            <span className="font-serif font-bold text-[36px] sm:text-[42px] text-gray-800 leading-tight tracking-tight -mt-2">Kita</span>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-[#333] text-[15px] max-w-[550px] mb-8 leading-relaxed font-medium">
          Kritik dan saran Anda sangat berarti bagi kami. Silakan klik tombol di
          bawah ini untuk memberikan masukan.
        </p>

        {/* Contact Us Button */}
        <button 
          onClick={() => window.open('https://wa.me/6287889817650', '_blank')}
          className="bg-[#007BFF] hover:bg-blue-600 text-white font-medium py-3 px-10 rounded-full transition-colors mb-10 shadow-md"
        >
          Contact Us
        </button>
      </div>

      {/* Wave Background and Icons */}
      <div className="relative w-full h-[180px] sm:h-[220px]">
        {/* SVG Waves Background */}
        <svg
          className="absolute bottom-0 w-full h-full object-cover"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Light wave layer */}
          <path
            fill="#69d885"
            fillOpacity="0.5"
            d="M0,160L48,176C96,192,192,224,288,218.7C384,213,480,171,576,154.7C672,139,768,149,864,176C960,203,1056,245,1152,240C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          {/* Darker main wave layer */}
          <path
            fill="#34C759"
            d="M0,224L48,229.3C96,235,192,245,288,229.3C384,213,480,171,576,170.7C672,171,768,213,864,229.3C960,245,1056,235,1152,213.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

        <div className="absolute bottom-10 w-full flex justify-center px-8 z-10">
          {/* Social Icons */}
          <div className="flex gap-4 items-center justify-center w-full">
            {[
              {
                icon: (
                  <svg
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                ),
                label: "Facebook",
              },
              {
                icon: (
                  <svg
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 5.53 2h.02a.43.43 0 0 1 .4.27l2.45 7.51h7.2l2.45-7.51A.42.42 0 0 1 18.46 2h.02a.43.43 0 0 1 .4.27l2.44 7.51 1.22 3.78a.84.84 0 0 1-.3.94z" />
                  </svg>
                ),
                label: "GitLab",
              },
              {
                icon: (
                  <svg
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                ),
                label: "GitHub",
              },
              {
                icon: (
                  <svg
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.543 2.904L2.343 10.3C1.037 10.823 1.05 11.554 2.103 11.876l4.92 1.536 11.39-7.18c.537-.323 1.028-.15 .618.214l-9.22 8.324-.352 5.253c.517 0 .768-.236 1.063-.524l2.55-2.48 5.3 3.914c.978.54 1.678.263 1.922-.907l3.475-16.364c.334-1.332-.505-1.93-1.426-1.544z" />
                  </svg>
                ),
                label: "Telegram",
              },
              {
                icon: (
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                ),
                label: "Instagram",
              },
              {
                icon: (
                  <svg
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.11 6.556a3.778 3.778 0 1 0-3.777-3.778V6.556h3.777zm0 10.888a3.778 3.778 0 1 1-3.777-3.777v3.777h3.777zM8.556 6.556a3.778 3.778 0 1 1 3.777-3.778H8.556v3.778zM8.556 13.778A3.778 3.778 0 1 1 12.333 10H8.556v3.778zM12.333 10v3.778h3.777a3.778 3.778 0 1 0-3.777-3.778z" />
                  </svg>
                ),
                label: "Figma",
              },
            ].map((item, index) => (
              <a
                key={index}
                href="#"
                aria-label={item.label}
                className="w-8 h-8 bg-white text-[#34C759] rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
              >
                {item.icon}
              </a>
            ))}
          </div>

          {/* Back to top button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="absolute right-8 bottom-0 w-10 h-10 rounded-full border-[1.5px] border-white flex items-center justify-center text-white hover:bg-white hover:text-[#34C759] transition-colors"
            aria-label="Back to top"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FooterUser;
