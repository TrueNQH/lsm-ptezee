import { CheckCircle2 } from "lucide-react";

const GRADIENTS = {
  primary: "linear-gradient(135deg, #3B82F6, #06B6D4)",
  secondary: "linear-gradient(135deg, #22D3EE, #3B82F6)",
};

function FeatureRow({ reverse = false, title, desc, bullets = [], img, icon }) {
  const gridClass = reverse 
    ? "lg:grid-cols-2 lg:gap-16 items-center" 
    : "lg:grid-cols-2 lg:gap-16 items-center";
  
  const contentOrder = reverse ? "lg:order-2" : "lg:order-1";
  const imageOrder = reverse ? "lg:order-1" : "lg:order-2";

  return (
    <div className={`grid ${gridClass}`}>
      {/* Content */}
      <div className={`space-y-6 ${contentOrder}`}>
        <div className="flex items-center gap-4">
          <div
            className="p-3 rounded-2xl text-white shadow-lg"
            style={{ background: GRADIENTS.secondary }}
          >
            {icon}
          </div>
          <h4 className="text-2xl font-bold text-slate-900">{title}</h4>
        </div>

        <p className="text-lg text-slate-600 leading-relaxed">{desc}</p>

        {bullets && bullets.length > 0 && (
          <ul className="space-y-3">
            {bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Image */}
      <div className={`relative ${imageOrder}`}>
        <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200 hover:shadow-2xl transition-all duration-500 hover:scale-105">
          <img
            src={img}
            alt={title}
            className="w-full h-80 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        
        {/* Floating accent */}
        <div
          className="absolute -inset-4 rounded-3xl blur-2xl opacity-20 -z-10"
          style={{ background: GRADIENTS.primary }}
        />
      </div>
    </div>
  );
}

export default FeatureRow;