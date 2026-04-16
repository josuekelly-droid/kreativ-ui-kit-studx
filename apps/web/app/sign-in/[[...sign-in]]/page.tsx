import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 bg-gradient-to-br from-purple-600 to-pink-600">
      <div className="w-full max-w-md">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-2xl rounded-2xl w-full",
              headerTitle: "text-xl sm:text-2xl font-bold",
              headerSubtitle: "text-sm sm:text-base text-gray-600",
              formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
              socialButtonsBlockButton: "border-gray-300 hover:bg-gray-50",
              footerActionLink: "text-purple-600 hover:text-purple-700",
            },
          }}
        />
      </div>
    </div>
  );
}