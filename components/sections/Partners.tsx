export default function Partners() {
  const partners = [
    {
      name: "Walter.",
      stats: [
        { value: "200+", label: "Digital experiences built" },
        { value: "67%", label: "More qualified rate" }
      ]
    },
    {
      name: "monosen",
      stats: [
        { value: "200+", label: "Engaging user interfaces" },
        { value: "75%", label: "Higher retention rate" }
      ]
    },
    {
      name: "Overcut",
      stats: [
        { value: "80+", label: "Innovative solutions" },
        { value: "90%", label: "Conversion rate" }
      ]
    }
  ];

  return (
    <section className="bg-[#0a0a0a] text-white py-20 md:py-32 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Headline */}
        <div className="mb-20 md:mb-32">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight max-w-2xl tracking-tight">
            Partnering with startups and tech teams shaping the future.
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="flex flex-col gap-8">
              
              {/* Partner Name / Logo Placeholder */}
              <div className="flex items-center gap-2">
                {/* Generic abstract shape for logo */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 22H22L12 2Z" fill="white" fillOpacity="0.8"/>
                </svg>
                <span className="text-xl font-semibold tracking-wide">{partner.name}</span>
              </div>

              {/* Stats Pair */}
              <div className="grid grid-cols-2 gap-4">
                {partner.stats.map((stat, sIndex) => (
                  <div key={sIndex} className="flex flex-col gap-2">
                    <span className="text-3xl md:text-4xl font-bold">{stat.value}</span>
                    <span className="text-white/50 text-xs md:text-sm font-medium pr-4 leading-snug">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
