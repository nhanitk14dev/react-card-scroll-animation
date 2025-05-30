import { FeatureCardsWithScrollEffects } from "@/components/FeatureCardsWithScrollEffects";

function LandingPage() {
  const features = [
    { title: "🚀 Fast Performance", key: 1 },
    { title: "🔒 Secure Features", key: 2 },
    { title: "📱 Mobile Friendly", key: 3 },
    { title: "⚙️ Easy Integration", key: 4 },
    { title: "🎨 Beautiful Design", key: 5 },
    { title: "📈 Scalable Architecture", key: 6 },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-20">
      <h1 className="text-4xl font-bold text-center mb-12">
        React & GSAP Effect
      </h1>

      {features.map((feature, index) => (
        <section key={index} className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            {feature.title}
          </h2>
          <FeatureCardsWithScrollEffects />
        </section>
      ))}
    </div>
  );
}


export default LandingPage;