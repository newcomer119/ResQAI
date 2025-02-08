const EmergencyContactsMarquee = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-gradient-to-r from-blue-500 to-green-500 p-4">
      <p className="inline-block animate-marquee font-bold text-white">
        Emergency Contacts for India: 
        112 (Emergency), 100 (Police), 101 (Fire), 102 (Ambulance), 
        1860 266 2345 (Mental Health Helpline), 1800 233 3330 (Suicide Prevention)
      </p>
    </div>
  );
};

export default EmergencyContactsMarquee;