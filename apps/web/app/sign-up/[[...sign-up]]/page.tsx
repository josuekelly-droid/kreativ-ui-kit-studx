import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-600 to-pink-600">
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl">
          <SignUp />
        </div>
      </div>
    </div>
  );
}