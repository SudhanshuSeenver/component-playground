import ComponentRenderer from "./ComponentRenderer";
import Link from "next/link";

export default async function ComponentPage({ params }) {
  const { name } = await params;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{name}</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 flex items-center justify-center min-h-[400px]">
          <ComponentRenderer name={name} />
        </div>
      </div>
    </div>
  );
}
