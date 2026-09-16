import Image from "next/image";
import { FiMail, FiSmartphone, FiPhone } from "react-icons/fi";

const ContactAddresses = () => {
  const addresses = [
    {
      city: "Dubai Address",
      address: "702, Warsan Tower, Near Media Rotana, Tecom, Barsha Heights, Dubai, UAE.",
      contacts: [
        { icon: <FiMail className="w-4 h-4" />, text: "Info@adaptsmedia.com" },
        { icon: <FiSmartphone className="w-4 h-4" />, text: "+971 58 560 1701" },
        { icon: <FiPhone className="w-4 h-4" />, text: "+971 043257279" },
      ]
    },
    {
      city: "London Address",
      address: "Surbiton KT5, London, UK",
      contacts: [
        { icon: <FiMail className="w-4 h-4" />, text: "Email: Info@adaptsmedia.com" },
        { icon: <FiSmartphone className="w-4 h-4" />, text: "Number: +44719813096" },
      ]
    },
    {
      city: "United States Address",
      address: "2807 Allen St Dallas, Texas 75204, United States",
      contacts: [
        { icon: <FiMail className="w-4 h-4" />, text: "Info@adaptsmedia.com" },
        { icon: <FiPhone className="w-4 h-4" />, text: "(256) 286-1817" },
      ]
    },
    {
      city: "India Address",
      address: "Gurugram: 3rd Floor, Woxa IT Park Tower, Plot No. 463, Phase V, Udyog Vihar, Sector 19, Gurugram, Haryana 122016",
      contacts: [
        { icon: <FiMail className="w-4 h-4" />, text: "Info@adaptsmedia.com" },
        { icon: <FiSmartphone className="w-4 h-4" />, text: "+91 9818706696" },
      ]
    },
    {
      city: "India Address - Bilaspur",
      address: "G-9, G-10, Commercial Complex, Phase III, Ramalife City, Sakri Road, Bilaspur, Chhattisgrah. Pin- 495001",
      contacts: [
        { icon: <FiMail className="w-4 h-4" />, text: "Ankita@adaptsmedia.com" },
        { icon: <FiSmartphone className="w-4 h-4" />, text: "+91 9818706696" },
      ]
    },
    {
      city: "Philippines Address",
      address: "Julia Vargas Avenue, Ortigas Pasig City, Philippines",
      contacts: [
        { icon: <FiMail className="w-4 h-4" />, text: "Info@adaptsmedia.com" },
        { icon: <FiPhone className="w-4 h-4" />, text: "+639 95 308 2820" },
      ]
    },
    {
      city: "Indonesia Address",
      address: "Jl Malaka Biru VI No 11, Jakarta 13460, Indonesia",
      contacts: [
        { icon: <FiMail className="w-4 h-4" />, text: "Info@adaptsmedia.com" },
      ]
    }
  ];

  return (
    <section className="relative w-full bg-white py-24 overflow-hidden">
      
      {/* Background Logo */}
      <div className="absolute right-[-2%] bottom-[5%] w-[280px] h-[280px] md:w-[400px] md:h-[400px] opacity-100 pointer-events-none z-0">
        <Image
          src="/images/ContactAdaptsLogo.png"
          alt="Adapts Logo Background"
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-[1350px] 2xl:max-w-[1600px] mx-auto px-8 md:px-16 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-0">
          {addresses.map((item, idx) => {
            // Apply border-b to the first 5 items to match the exact line cut-off in the screenshot
            const hasBorder = idx < 5;
            
            return (
              <div 
                key={idx} 
                className={`flex flex-col py-10 ${hasBorder ? 'border-b border-gray-200/80' : ''}`}
              >
                <h3 className="text-[20px] font-semibold text-[#3b82f6] mb-5 tracking-wide">{item.city}</h3>
                <p className="text-[#333333] text-[14px] font-medium leading-relaxed mb-6 min-h-[60px] pr-4">
                  {item.address}
                </p>
                <div className="flex flex-col gap-2.5 mt-auto">
                  {item.contacts.map((contact, cidx) => (
                    <div key={cidx} className="flex items-center gap-3 text-[#38bdf8] text-[13px] font-medium">
                      <span className="text-gray-500">{contact.icon}</span>
                      <span className="text-[#38bdf8]">{contact.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactAddresses;
