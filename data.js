// ============ EDIT THIS FILE to fill in your trip. Everything on the site comes from here. ============
// Items marked (SAMPLE) are placeholders. Replace them with the real details.
const TRIP = {
  name: "Goa Trip 2026",
  tagline: "6 besties. 1 villa. 0 braincells. Goa, we are NOT being normal about this 🌴",
  start: "2026-12-03",            // first day, YYYY-MM-DD
  end: "2026-12-06",              // last day
  from: "Home",                   // where everyone starts
  currency: "₹",

  flights: [                      // from the IndiGo ticket (GOA.pdf). Add friends' flights here too.
    { who: "Anunay", airline: "IndiGo", no: "6E 5341", date: "2026-12-03", from: "Delhi (DEL, T3)", to: "Goa (GOI, Dabolim)", dep: "05:00", arr: "07:35", dur: "2h 35m", note: "Bag drop closes 04:00" },
    { who: "Anunay", airline: "IndiGo", no: "6E 5008", date: "2026-12-06", from: "Goa (GOI, Dabolim)", to: "Delhi (DEL, T3)", dep: "22:30", arr: "01:05 (7 Dec)", dur: "2h 35m", note: "Bag drop closes 21:30" }
  ],

  crew: [
    { name: "Anunay",    emoji: "🧠", role: "The trip planner",              from: "", phone: "" },
    { name: "Shruti",    emoji: "🫶", role: "Mom on duty",                   from: "", phone: "" },
    { name: "Akriti",    emoji: "📱", role: "Influencer / content creator",  from: "", phone: "" },
    { name: "Deepak",    emoji: "🏔️", role: "Pahadi / vlogger",              from: "", phone: "" },
    { name: "Sarvpriya", emoji: "🤩", role: "Chief hype officer",            from: "", phone: "" },
    { name: "Abhishek",  emoji: "🏖️", role: "Beach bum / sunset chaser",   from: "", phone: "" },
    { name: "Arsi",      emoji: "👶", role: "Representing Arsenal in Goa",   from: "Youngest on the squad", phone: "", infant: true }   // infant: not counted in the budget split
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
    drivers: ["To be decided"],
    seats: 7, rentalTotal: 12000, fuelEstimate: 4000, deposit: 5000,   // TODO: real quote
    docs: ["Driving licence (original)", "Aadhaar / ID", "Booking confirmation"],
    tips: ["Take photos of the car before driving", "Keep to the speed limits, especially near beaches", "No drink-driving. Nominate a driver each night."]
  },

  // Budget: who paid and how much. Everything is split equally between all 6.
  budget: [                       // (SAMPLE) replace with real expenses as you go
    { cat: "Stay",     label: "Homero Villa (3 nights)", amount: 27000, paidBy: "Anunay" },
    { cat: "Travel",   label: "Car rental",        amount: 12000, paidBy: "Shruti" },
    { cat: "Travel",   label: "Fuel",              amount: 4000,  paidBy: "Shruti" },
    { cat: "Food",     label: "Welcome dinner",    amount: 6500,  paidBy: "Sarvpriya" },
    { cat: "Activity", label: "Water sports",      amount: 7200,  paidBy: "Akriti" },
    { cat: "Drinks",   label: "Beach shack bar",   amount: 5400,  paidBy: "Deepak" }
  ],
  planned: 90000,                 // total budget you aim for, for the whole group

  // Goa in early December: dry & sunny, hot days, mild nights, warm sea (averages, sources vary by 1-2 degrees)
  weather: { hi: "32°C", lo: "21°C", sea: "28°C", rain: "~0-1 days", sun: "~10 hrs", note: "Dry season and peak tourist season, so book dinner spots early. Check the 3-day forecast before you leave." },

  packing: [
    { group: "Docs & money", emoji: "🪪", items: ["Flight ticket (offline copy)", "Photo ID (Aadhaar / passport)", "Driving licence (original, for the car)", "Villa booking confirmation", "UPI set up + some cash for shacks, parking and tips", "Card / forex if needed"] },
    { group: "Sun & skin (UV is brutal)", emoji: "🧴", items: ["Sunscreen SPF 50+ (reef-safe if possible)", "Sunglasses", "Cap or hat", "Aloe vera gel for sunburn", "Lip balm with SPF", "Mosquito repellent (evenings near water)", "ORS / electrolyte sachets"] },
    { group: "Beach & pool", emoji: "🏖️", items: ["Swimwear x2 (one to dry)", "Quick-dry towel", "Flip-flops / slides", "Waterproof phone pouch", "Beach bag", "Rash guard if you burn easily"] },
    { group: "Clothes (light & breathable)", emoji: "👕", items: ["Cotton / linen tees and shorts", "1-2 going-out fits for the nights", "Light shirt or thin hoodie (nights ~21°C, breezy on bikes)", "Sneakers or sandals for walking forts and old town", "Sleepwear + enough underwear and socks", "Small laundry bag for wet clothes"] },
    { group: "Tech & misc", emoji: "🔌", items: ["Power bank", "Phone charger + spare cable", "Bluetooth speaker", "Earphones", "Basic meds (paracetamol, antacid, stomach-upset tablets)", "Hand sanitiser and wet wipes"] }
  ],
  skip: ["Heavy jacket or sweater", "Umbrella or raincoat (monsoon is long gone)", "Jeans for every day (too hot and slow to dry)"],

  photos: [                       // drop images in the photos/ folder, then list them here
    // { src: "photos/beach.jpg", caption: "Sunset at Vagator" },
  ]
};
