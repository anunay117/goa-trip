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

  // Fit Check page (outfit ideas). Photos are free Pexels stock photos (id = Pexels photo id); shop links are Myntra category pages and search links.
  outfits: {
    intro: "Goa in early December is hot in the day (about 32°C) and mild at night (about 21°C). Think light cotton, linen and flowy fabrics, in whatever length and style you like.",
    ideas: [
      { title: "Travel-day kurta set", emoji: "✈️", when: "Day 1: the 05:00 flight and arrival", photo: 36311379,
        why: "Breathable cotton, easy to move in, and still looks put-together when you land at 07:35.",
        tips: "Pair with palazzos or leggings and keep the dupatta handy as a scarf for the cold flight.",
        shop: [{ label: "Kurta sets on Myntra", url: "https://www.myntra.com/kurta-sets" }, { label: "Palazzos", url: "https://www.myntra.com/palazzos" }] },
      { title: "Flowy white maxi", emoji: "🌊", when: "Beach walks and sunsets", photo: 9783413,
        why: "Covers you up, catches the sea breeze and photographs beautifully at golden hour.",
        tips: "Pick light colours or pastels, a full-length cotton or rayon blend, and wear shorts underneath for windy beaches.",
        shop: [{ label: "Maxi dresses on Myntra", url: "https://www.myntra.com/maxi-dresses" }] },
      { title: "Shirt dress + sun hat", emoji: "👒", when: "Cafes, markets and Fort Aguada", photo: 19684582,
        why: "A button-up linen or cotton shirt dress is cool, modest and works for both sightseeing and lunch.",
        tips: "Add sunglasses and a wide-brim hat, and wear comfy sandals for the walking.",
        shop: [{ label: "Shirt dresses", url: "https://www.myntra.com/shirt-dress" }, { label: "Sun hats", url: "https://www.myntra.com/sun-hat" }] },
      { title: "Breezy kaftan", emoji: "🌴", when: "Beach shack lunch and cover-up", photo: 7292974,
        why: "Loose, full-length and super comfortable. Easy to throw over your swim set and walk straight to lunch.",
        tips: "Choose one in cotton or viscose, and skip heavy embroidery in the heat.",
        shop: [{ label: "Kaftans on Myntra", url: "https://www.myntra.com/kaftan" }] },
      { title: "Mini sundress + hat", emoji: "🌞", when: "Cafe hopping and beach clubs", photo: 9214356,
        why: "Short, light and fun. A cotton or linen mini is the coolest thing you can wear at 32°C.",
        tips: "Add a straw hat and sunglasses, and carry a tote for sunscreen and a stole for the evening breeze.",
        shop: [{ label: "Mini dresses", url: "https://www.myntra.com/mini-dresses" }, { label: "Sundresses", url: "https://www.myntra.com/sundress" }, { label: "Sun hats", url: "https://www.myntra.com/sun-hat" }] },
      { title: "Floral summer dress", emoji: "🌸", when: "Market walks, lunch dates, golden-hour photos", photo: 4589436,
        why: "A short or knee-length floral dress is easy, pretty and photographs well in the Goa light.",
        tips: "Go for cotton or muslin with a smocked or adjustable top, so it stays comfortable all day.",
        shop: [{ label: "Short dresses", url: "https://www.myntra.com/short-dresses" }, { label: "Midi dresses", url: "https://www.myntra.com/midi-dresses" }] },
      { title: "Denim shorts + top", emoji: "👖", when: "Scooter rides, markets and beach hopping", photo: 6601926,
        why: "Shorts with a crop top or a knotted shirt are the easiest beach-day outfit and dry fast.",
        tips: "Light-wash or soft cotton shorts stay cooler than heavy denim, and a loose shirt on top protects from the sun.",
        shop: [{ label: "Women's shorts", url: "https://www.myntra.com/women-shorts" }, { label: "Crop tops", url: "https://www.myntra.com/crop-tops" }] },
      { title: "One-piece or swim dress", emoji: "🏊‍♀️", when: "Sea and pool time", photo: 17437768,
        why: "A one-piece, tankini or swim dress with shorts is comfortable in the water, dries fast and is easy to pair with a cover-up.",
        tips: "Pack two sets so you always have a dry one, and keep a kaftan or cotton dress handy to walk back to the shack in.",
        shop: [{ label: "One-piece swimwear", url: "https://www.myntra.com/one-piece-swimsuit" }, { label: "Swim dresses", url: "https://www.myntra.com/swim-dress" }, { label: "Tankinis", url: "https://www.myntra.com/tankini" }] },
      { title: "Co-ord set", emoji: "🧺", when: "Sightseeing and travel back", photo: 18665107,
        why: "A matching top and palazzo or trousers is the easiest outfit in your bag: one piece, no thinking.",
        tips: "Linen or cotton co-ords are comfortable on the 22:30 flight home too.",
        shop: [{ label: "Co-ords on Myntra", url: "https://www.myntra.com/co-ords" }, { label: "Palazzos", url: "https://www.myntra.com/palazzos" }] },
      { title: "Statement party maxi", emoji: "💃", when: "Beach club and night out", photo: 28488718,
        why: "One standout tiered dress is all you need for a night. It is covered, it moves well and it looks great in sunset photos.",
        tips: "Carry a light shrug for the breeze, and flats or wedges instead of heels on sand.",
        shop: [{ label: "Maxi dresses on Myntra", url: "https://www.myntra.com/maxi-dresses" }] },
      { title: "White jumpsuit", emoji: "🤍", when: "Dinner and evening", photo: 2699250,
        why: "Easy to dress up or down, comfortable and fully covered. Looks smart in the evening and stays cool.",
        tips: "A full-length one is more flattering with sandals, and a belt keeps it from looking shapeless.",
        shop: [{ label: "Jumpsuits on Myntra", url: "https://www.myntra.com/jumpsuit" }] },
      { title: "Modest midi for churches", emoji: "⛪", when: "Day 4: Old Goa churches", photo: 20544951,
        why: "Goa's old churches expect covered shoulders and knees, and a cotton midi or kurta handles that without being hot.",
        tips: "Carry a stole or dupatta so you can cover up quickly, and wear shoes that are easy to slip off at the entrance.",
        shop: [{ label: "Midi dresses", url: "https://www.myntra.com/midi-dresses" }, { label: "Kurta sets", url: "https://www.myntra.com/kurta-sets" }] }
    ],
    plan: [
      { day: "Day 1 (Thu 3 Dec)", looks: "Kurta set for the flight, then a flowy maxi for the sunset." },
      { day: "Day 2 (Fri 4 Dec)", looks: "Shirt dress and hat for the day, one-piece or swim dress for the sea, jumpsuit for dinner." },
      { day: "Day 3 (Sat 5 Dec)", looks: "Kaftan for lunch, mini sundress or shorts and a top for exploring, party maxi for the night." },
      { day: "Day 4 (Sun 6 Dec)", looks: "Modest midi or kurta for the churches, co-ord for the flight home." }
    ],
    tips: [
      "Pack 6 to 8 light pieces, not 20. Mix and match, and repeat with different accessories.",
      "Cotton, linen, rayon and muslin beat polyester and heavy denim in this heat.",
      "Pale colours stay cooler. Use dark prints for swimwear so wet patches don't show.",
      "Footwear: slides or flip-flops, flat sandals and one pair of sneakers. Skip heels on sand.",
      "Bring a stole or dupatta, a big tote, a hat, sunglasses and a quick-dry towel.",
      "Pack a small laundry bag for wet clothes, and a safety pin or two for windy-dress emergencies."
    ],
    inspo: [
      { label: "Pinterest: Goa outfits for women", url: "https://in.pinterest.com/search/pins/?q=goa%20outfits%20for%20women" },
      { label: "Pinterest: modest beach outfits India", url: "https://in.pinterest.com/search/pins/?q=modest%20beach%20outfits%20india" },
      { label: "Pinterest: Goa vacation outfit ideas", url: "https://in.pinterest.com/search/pins/?q=goa%20vacation%20outfit%20ideas" },
      { label: "Instagram: #goaoutfits", url: "https://www.instagram.com/explore/tags/goaoutfits/" },
      { label: "Instagram: #goavibes", url: "https://www.instagram.com/explore/tags/goavibes/" }
    ],
    boys: "Boys are too smart, they don't need suggestions. 😎"
  },

  photos: [                       // drop images in the photos/ folder, then list them here
    // { src: "photos/beach.jpg", caption: "Sunset at Vagator" },
  ]
};
