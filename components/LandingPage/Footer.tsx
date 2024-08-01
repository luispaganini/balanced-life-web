// components/Footer.tsx
const Footer: React.FC = () => {
    return (
      <footer className="bg-cyan-bg text-white py-4" id="contact">
        <div className="container mx-auto text-center">
          <p className="mb-2">&copy; 2024 My Company. All rights reserved.</p>
          <p>
            Contact us at <a href="mailto:info@mycompany.com" className="underline">info@mycompany.com</a>
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  