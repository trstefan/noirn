import AuthenticationCard from "@/components/AuthForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 via-black to-blue-900/20" />

      {/* Subtle overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="flex-1 flex items-center justify-center">
        <AuthenticationCard />
      </div>
    </div>
  );
}
