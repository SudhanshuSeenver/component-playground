import Link from 'next/link'

const components = [
  { name: 'Button', path: '/component/Button' },
  { name: 'Carousel', path: '/component/Carousel' },
  { name: 'Carousel1', path: '/component/Carousel1' },
  { name: 'Slider', path: '/component/Slider' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Component Playground
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Select a component to view and interact with it
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {components.map((component) => (
            <Link
              key={component.name}
              href={component.path}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-500"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {component.name}
              </h2>
              <p className="text-gray-600 text-sm">
                Click to view the {component.name} component
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
