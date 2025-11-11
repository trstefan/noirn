import Aurora from "@/components/Aurora";
import AuthenticationCard from "@/components/AuthForm";

export default function AuthPage() {
  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* Full-screen Prism background */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#5800FF", "#BEECFF", "#E77EDC", "#FF4C3E"]}
          blend={0.5}
          amplitude={1.5}
          speed={1.0}
        />
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
        <AuthenticationCard />
      </div>
    </div>
  );
}
