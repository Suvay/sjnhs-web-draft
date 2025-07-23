export default function Gallery() {
  const galleryItems = [
    {
      image: "https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Campus+Facilities",
      title: "Campus Facilities",
      description: "Modern learning environment"
    },
    {
      image: "https://via.placeholder.com/400x300/10B981/FFFFFF?text=Collaborative+Learning",
      title: "Collaborative Learning",
      description: "Students working together"
    },
    {
      image: "https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Achievement",
      title: "Achievement",
      description: "Celebrating success"
    },
    {
      image: "https://via.placeholder.com/800x300/8B5CF6/FFFFFF?text=Hands-on+Learning",
      title: "Hands-on Learning",
      description: "Science and technology programs",
      span: "md:col-span-2"
    },
    {
      image: "https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Outdoor+Learning",
      title: "Outdoor Learning",
      description: "Nature-integrated education"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our School Life</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Experience the vibrant community at San Jose National High School</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-xl ${item.span || ''}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black from-0% to-transparent to-70% opacity-60"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm opacity-90">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
