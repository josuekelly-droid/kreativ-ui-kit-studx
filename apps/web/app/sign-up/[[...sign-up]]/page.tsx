import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-[95%] sm:max-w-md md:max-w-lg">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
          <SignUp />
        </div>
      </div>
    </div>
  );
}