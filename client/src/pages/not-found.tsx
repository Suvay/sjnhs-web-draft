import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4 shadow-lg">
        <CardContent className="pt-6 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 – Page Not Found</h1>
          </div>

          <p className="text-sm text-gray-600 mb-2">
            This page is currently under construction by <strong>Team Secret – Sophia Nicole G.</strong> Please check again at a later time.
          </p>
          <p className="text-sm text-gray-500">
            The page you’re looking for doesn’t exist or is under construction. Please check the URL or return to the homepage.
          </p>

          <div className="mt-6">
            <a
              href="/"
              className="inline-block text-sm text-blue-600 hover:underline transition"
            >
              ← Back to Home
            </a>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
