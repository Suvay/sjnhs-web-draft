export default function Gallery() {
  const galleryItems = [
    {
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      title: "Campus Facilities",
      description: "Modern learning environment"
    },
    {
      image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      title: "Collaborative Learning",
      description: "Students working together"
    },
    {
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      title: "Achievement",
      description: "Celebrating success"
    },
    {
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      title: "Hands-on Learning",
      description: "Science and technology programs",
      span: "md:col-span-2"
    },
    {
      image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      title: "Outdoor Learning",
      description: "Nature-integrated education"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our School Life</h2>
          <p className="text-xl text-gray-600">Experience the vibrant community at San Jose National High School</p>
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
