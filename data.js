// ============ EDIT THIS FILE to fill in your trip. Everything on the site comes from here. ============
// Items marked (SAMPLE) are placeholders. Replace them with the real details.
const TRIP = {
  name: "Goa Trip 2026",
  tagline: "6 friends. 1 villa. Zero plans (okay, a few plans).",
  start: "2026-12-03",            // first day, YYYY-MM-DD
  end: "2026-12-06",              // last day
  from: "Home",                   // where everyone starts
  currency: "₹",

  flights: [                      // from the IndiGo ticket (GOA.pdf). Add friends' flights here too.
    { who: "Anunay", airline: "IndiGo", no: "6E 5341", date: "2026-12-03", from: "Delhi (DEL, T3)", to: "Goa (GOI, Dabolim)", dep: "05:00", arr: "07:35", dur: "2h 35m", note: "Bag drop closes 04:00" },
    { who: "Anunay", airline: "IndiGo", no: "6E 5008", date: "2026-12-06", from: "Goa (GOI, Dabolim)", to: "Delhi (DEL, T3)", dep: "22:30", arr: "01:05 (7 Dec)", dur: "2h 35m", note: "Bag drop closes 21:30" }
  ],

  crew: [                         // (SAMPLE) add the 6 real people. role/emoji are just for fun
    { name: "Friend 1 (me)", emoji: "😎", role: "Trip planner",   from: "Bengaluru", phone: "" },
    { name: "Friend 2",      emoji: "🚗", role: "Chief driver",   from: "Delhi",     phone: "" },
    { name: "Friend 3",      emoji: "📸", role: "Photographer",   from: "Mumbai",    phone: "" },
    { name: "Friend 4",      emoji: "🎧", role: "Playlist DJ",    from: "Pune",      phone: "" },
    { name: "Friend 5",      emoji: "🍹", role: "Food & drinks",  from: "Hyderabad", phone: "" },
    { name: "Friend 6",      emoji: "🧭", role: "Navigator",      from: "Chennai",   phone: "" }
  ],

  itinerary: [                    // (SAMPLE activities) one object per day; dates are worked out from "start"
    { title: "Arrival & sunset", items: [
      { t: "07:35", text: "Land at Dabolim (IndiGo 6E 5341 from Delhi)", note: "Pick up the Innova Hycross" },
      { t: "10:00", text: "Breakfast, then drop bags at Homero Villa", note: "Check-in is only from 3 PM, so ask the host about early access" },
      { t: "15:00", text: "Check in at Homero Villa", note: "" },
      { t: "17:30", text: "Sunset at Vagator / Chapora Fort", note: "" },
      { t: "20:30", text: "Dinner and welcome drinks", note: "" } ]},
    { title: "North Goa day", items: [
      { t: "09:00", text: "Breakfast at the villa", note: "" },
      { t: "11:00", text: "Baga & Calangute beaches, water sports", note: "Budget for activities" },
      { t: "16:00", text: "Fort Aguada", note: "" },
      { t: "21:00", text: "Night market / club", note: "" } ]},
    { title: "South Goa & chill", items: [
      { t: "10:00", text: "Drive to Palolem / Agonda", note: "" },
      { t: "13:00", text: "Beach shack lunch", note: "" },
      { t: "18:00", text: "Sunset kayaking", note: "" },
      { t: "21:00", text: "Farewell dinner", note: "" } ]},
    { title: "Old Goa & head home", items: [
      { t: "11:00", text: "Check out of the villa, leave bags with the host", note: "" },
      { t: "12:00", text: "Basilica of Bom Jesus, Fontainhas walk, lunch", note: "" },
      { t: "17:00", text: "Last beach stop and shopping", note: "" },
      { t: "19:30", text: "Return the car with a full tank", note: "" },
      { t: "20:30", text: "Reach Dabolim airport (bag drop closes 21:30)", note: "" },
      { t: "22:30", text: "Fly home (IndiGo 6E 5008), land Delhi 01:05 on 7 Dec", note: "" } ]}
  ],

  stay: {                         // (SAMPLE) your Airbnb
    name: "Homero Villa",
    address: "Add the full address here",   // TODO
    mapLink: "https://maps.google.com",
    link: "https://www.airbnb.co.in",
    checkIn: "3:00 PM", checkOut: "11:00 AM",
    host: "Host name", hostPhone: "",
    bedrooms: 3, beds: "3 double beds",
    wifi: "Network / password",
    pricePerNight: 9000, nights: 3,   // TODO: real price per night
    perks: ["Add the real perks from the listing, e.g. pool, kitchen, parking"],   // TODO
    rules: ["Add the host's house rules from the listing"]   // TODO
  },

  ride: {                         // (SAMPLE) the hire car
    car: "Toyota Innova Hycross (to be finalised)",
    company: "To be decided",
    phone: "",
    pickup: "To be decided, 3 Dec",
    dropoff: "To be decided, 6 Dec",
    drivers: ["Friend 2", "Friend 1"],
    seats: 7, rentalTotal: 12000, fuelEstimate: 4000, deposit: 5000,   // TODO: real quote
    docs: ["Driving licence (original)", "Aadhaar / ID", "Booking confirmation"],
    tips: ["Take photos of the car before driving", "Keep to the speed limits, especially near beaches", "No drink-driving. Nominate a driver each night."]
  },

  // Budget: who paid and how much. Everything is split equally between all 6.
  budget: [                       // (SAMPLE) replace with real expenses as you go
    { cat: "Stay",     label: "Homero Villa (3 nights)", amount: 27000, paidBy: "Friend 1 (me)" },
    { cat: "Travel",   label: "Car rental",        amount: 12000, paidBy: "Friend 2" },
    { cat: "Travel",   label: "Fuel",              amount: 4000,  paidBy: "Friend 2" },
    { cat: "Food",     label: "Welcome dinner",    amount: 6500,  paidBy: "Friend 5" },
    { cat: "Activity", label: "Water sports",      amount: 7200,  paidBy: "Friend 3" },
    { cat: "Drinks",   label: "Beach shack bar",   amount: 5400,  paidBy: "Friend 4" }
  ],
  planned: 90000,                 // total budget you aim for, for the whole group

  packing: ["Sunscreen", "Swimwear", "Sunglasses", "Power bank", "ID & licence", "Cash & UPI ready", "Flip-flops", "Light jacket for nights", "Chargers", "Waterproof pouch"],

  photos: [                       // drop images in the photos/ folder, then list them here
    // { src: "photos/beach.jpg", caption: "Sunset at Vagator" },
  ]
};
