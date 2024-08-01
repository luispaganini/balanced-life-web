// components/Features.tsx
const Features: React.FC = () => {
    return (
      <section className="py-12 bg-white" id="features">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Features</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Feature One</h3>
                <p>Details about feature one.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Feature Two</h3>
                <p>Details about feature two.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Feature Three</h3>
                <p>Details about feature three.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Features;
  