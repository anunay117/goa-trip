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
    totalCost: 28000, nights: 3,
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

  // Budget: everything is split equally between the 6 friends (Arsi is not counted).
  budget: [                       // Villa and flights are real. Car rental, fuel, dinner, water sports and bar are SAMPLE amounts. "exclude" = people who do not share that cost, "only" = just these people pay it
    { cat: "Stay",     label: "Homero Villa (3 nights)", amount: 28000 },
    { cat: "Travel",   label: "Flights (IndiGo, Delhi-Goa-Delhi)", amount: 123135, exclude: ["Deepak"] },   // Deepak has a separate ticket
    { cat: "Travel",   label: "Arsi's flight (infant fare + tax)", amount: 4000, only: ["Anunay"], short: "Arsi" },   // charged to Anunay only
    { cat: "Travel",   label: "Car rental",        amount: 12000 },
    { cat: "Travel",   label: "Fuel",              amount: 4000 },
    { cat: "Food",     label: "Welcome dinner",    amount: 6500 },
    { cat: "Activity", label: "Water sports",      amount: 7200 },
    { cat: "Drinks",   label: "Beach shack bar",   amount: 5400 }
  ],
  planned: null,                  // optional: set a total target (e.g. 250000) to show a progress bar

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

  // Car playlists. "sp" = Spotify playlist id, "yt" = YouTube playlist id (opens in YouTube Music). All links were checked on 31 Oct 2026.
  playlists: [
    { name: "Highway Hindi",        emoji: "🚗", lang: "Hindi",         vibe: "Bollywood road-trip hits for the long drive",
      sp: "02d3dszOlM4I9ZQAajDVbv", spName: "Highway road trip Hindi songs",
      yt: "PLQdfb6nEJz_X-0Tkwec2N2Sj83d_DM36d", ytName: "Top 100 Travel Songs of Bollywood" },
    { name: "Sing-Along Roadtrip",  emoji: "🎸", lang: "English",       vibe: "Classics everyone knows the words to",
      sp: "68q3IjJ17gHA7r9NdijiUU", spName: "Road Trip Songs: The Ultimate Throwback Playlist",
      yt: "PLNjVKDn-Jmf6VtU8oto01VwRQvDrhJFGf", ytName: "Roadtrip songs everyone knows" },
    { name: "Beach & Sunset Chill", emoji: "🌴", lang: "English / chill", vibe: "Tropical, laid-back, golden hour",
      sp: "5Yk5sbKKHlxKbuyiBSPoyR", spName: "Sunset Beats, Island Chill, Beach Vibes",
      yt: "PLNjVKDn-Jmf6Kf7GBrg_1JPcLbTfaKLXj", ytName: "Beach Music: Summer Vibes 2026" },
    { name: "Bollywood Party",      emoji: "🎉", lang: "Hindi",         vibe: "Dance-in-your-seat Goa party songs",
      sp: "21pf3g03K0dcNM6nq79rb2", spName: "GOA - party songs (Bollywood)",
      yt: "PLyJ-hYl35pVK6m7HqSM0P6bUxpZBvrnpC", ytName: "Desi Bollywood songs to dance to at 3 am" },
    { name: "English Party",        emoji: "🕺", lang: "English",       vibe: "Big party anthems and recent hits",
      sp: "5xS3Gi0fA3Uo6RScucyct6", spName: "Party Songs 2010-2026 Hits",
      yt: "PLO7-VO1D0_6N2ePPlPE9NKCgUBA15aOk2", ytName: "English Songs 2026: Trending" },
    { name: "English Hits",         emoji: "🇮🇳", lang: "English",       vibe: "The English songs Indians stream the most",
      sp: "2cXI31t2XnElhPLj7aVJlD", spName: "Most Popular English Songs (India)",
      yt: "PLOfGUSnj9XxQuiy8B50WGfvMUmAITKC0B", ytName: "Best English Songs (a general hits list, not India-specific)" },
    { name: "Punjabi Hits",         emoji: "🔥", lang: "Punjabi",       vibe: "Karan Aujla, Diljit Dosanjh, AP Dhillon, Shubh and more",
      sp: "06dPsSrdu6C5gaQyPLm4Lx", spName: "Punjabi Pop Reloaded 2026 (Diljit, Karan Aujla, Guru Randhawa)",
      yt: "PLO7-VO1D0_6NYoMAN0XncJu4tvibirSmN", ytName: "Punjabi Song Playlist 2026 (Karan Aujla, Diljit, AP Dhillon, Shubh)" },
    { name: "Hindi Rap",            emoji: "🎤", lang: "Hindi",         vibe: "Desi hip-hop for the back seat",
      sp: "572Hmii6eSuDai46ZJXgIe", spName: "The Sound of Hindi Hip Hop (by Spotify)",
      yt: "PLJtpjlkBVF4wneUJqC9SZPhBiEBQmmEsi", ytName: "Top Hindi Rap Songs of All Time" }
  ],

  photos: [                       // drop images in the photos/ folder, then list them here
    // { src: "photos/beach.jpg", caption: "Sunset at Vagator" },
  ]
};
