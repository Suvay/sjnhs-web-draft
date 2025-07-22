import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-950">
      <Card className="w-full max-w-md mx-4 shadow-lg bg-gray-800 border-gray-700">
        <CardContent className="pt-6 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="h-8 w-8 text-red-400" />
            <h1 className="text-2xl font-bold text-white">404 – Page Not Found</h1>
          </div>

          <p className="text-sm text-gray-300 mb-2">
            This page is currently under construction by <strong className="text-yellow-400">Team Secret – Sophia Nicole G.</strong> Please check again at a later time.
          </p>
          <p className="text-sm text-gray-400">
            The page you’re looking for doesn’t exist or is under construction. Please check the URL or return to the homepage.
          </p>

          <div className="mt-6">
            <a
              href="/"
              className="inline-block text-sm text-blue-400 hover:text-blue-300 hover:underline transition"
            >
              ← Back to Home
            </a>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
