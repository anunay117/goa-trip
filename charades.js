// Titles for the Dumb Charades game (Game Night page). c = category (used for the category filter), t = the title to act out.
// Keep titles real and well known so the other team can guess them.
const CHARADES = [
  // Bollywood movies
  ...["Sholay", "Dilwale Dulhania Le Jayenge", "Kuch Kuch Hota Hai", "Kabhi Khushi Kabhie Gham", "Lagaan", "3 Idiots", "Dangal", "PK",
    "Zindagi Na Milegi Dobara", "Dil Chahta Hai", "Jab We Met", "Yeh Jawaani Hai Deewani", "Queen", "Andhadhun", "Gully Boy", "Chak De India",
    "Taare Zameen Par", "Munna Bhai MBBS", "Lage Raho Munna Bhai", "Hera Pheri", "Phir Hera Pheri", "Golmaal", "Andaz Apna Apna", "Dhamaal",
    "Welcome", "Bhool Bhulaiyaa", "Stree", "Kal Ho Naa Ho", "Kabir Singh", "Pathaan", "Jawan", "Animal", "Rockstar", "Barfi", "Piku",
    "Badhaai Ho", "Bajrangi Bhaijaan", "Sultan", "Krrish", "Koi Mil Gaya", "Om Shanti Om", "Dhoom", "Don", "Gangs of Wasseypur", "Drishyam",
    "Baahubali", "RRR", "KGF", "Pushpa", "Housefull", "Singham", "Chennai Express", "Dil Dhadakne Do", "Go Goa Gone", "Dear Zindagi",
    "Wake Up Sid", "Rang De Basanti", "Swades", "Hum Aapke Hain Koun", "Maine Pyar Kiya", "Mughal-e-Azam", "Padosan", "Chupke Chupke",
    "Anand", "Deewaar", "Mr India", "Jo Jeeta Wohi Sikandar", "Rangeela", "Dil To Pagal Hai", "Mohabbatein", "Devdas", "Veer-Zaara",
    "Kaho Naa Pyaar Hai", "Gadar", "Border", "Shershaah", "12th Fail", "Laapataa Ladies", "Tanu Weds Manu", "Bareilly Ki Barfi",
    "Hindi Medium", "Fukrey", "Delhi Belly", "Brahmastra", "Dil Se", "Ek Tha Tiger", "Bunty Aur Babli", "Jaane Tu Ya Jaane Na",
    "Student of the Year", "Ae Dil Hai Mushkil", "Kabhi Haan Kabhi Naa", "Dilwale", "Race", "Bodyguard", "Ready", "Dabangg"
  ].map(t => ({ c: "Bollywood movies", t })),
  // Bollywood songs
  ...["Chaiyya Chaiyya", "Tujhe Dekha To", "Kajra Re", "Sheila Ki Jawani", "Munni Badnaam Hui", "Badtameez Dil", "London Thumakda",
    "Gallan Goodiyaan", "Kala Chashma", "Lungi Dance", "Nagada Sang Dhol", "Tum Hi Ho", "Senorita", "Ilahi", "Kabira", "Jai Ho",
    "Koi Kahe Kehta Rahe", "Desi Girl", "Dola Re Dola", "Mere Sapno Ki Rani", "Yeh Dosti", "Pal Pal Dil Ke Paas", "Ek Do Teen",
    "Tip Tip Barsa Paani", "Tamma Tamma", "Saki Saki", "Dilbar", "Naatu Naatu", "Srivalli", "Oo Antava", "Chaleya", "Jhoome Jo Pathaan",
    "Kesariya", "Apna Bana Le", "What Jhumka", "Tauba Tauba", "Aankh Marey", "Malhari", "Ghoomar", "Gerua", "Bom Diggy", "Dance Basanti",
    "Hookah Bar", "Party All Night", "Subha Hone Na De", "Khaike Paan Banaraswala", "Mehndi Laga Ke Rakhna", "Sooraj Hua Maddham",
    "Pehla Nasha", "Goa Wale Beach Pe", "Zingaat", "Kar Gayi Chull", "Abhi Toh Party Shuru Hui Hai", "Swag Se Swagat", "Balam Pichkari",
    "Dhoom Machale", "Chammak Challo", "Jumma Chumma De De", "Mauja Hi Mauja", "Ainvayi Ainvayi"
  ].map(t => ({ c: "Bollywood songs", t })),
  // Shows and web series
  ...["Sacred Games", "Mirzapur", "Panchayat", "Kota Factory", "The Family Man", "Scam 1992", "Made in Heaven", "Four More Shots Please",
    "Delhi Crime", "Paatal Lok", "Taarak Mehta Ka Ooltah Chashmah", "Kaun Banega Crorepati", "Bigg Boss", "Shark Tank India", "CID",
    "Shaktimaan", "Mahabharat", "Ramayan", "Sarabhai vs Sarabhai", "Kyunki Saas Bhi Kabhi Bahu Thi", "The Kapil Sharma Show",
    "Indian Idol", "Roadies", "Splitsvilla", "Heeramandi", "Gullak", "Aspirants", "Pitchers", "Permanent Roommates", "Farzi",
    "Money Heist", "Friends", "Game of Thrones", "Squid Game", "Stranger Things", "Breaking Bad"
  ].map(t => ({ c: "Shows & series", t })),
  // Goa trip things (easy, good warm-up round)
  ...["Parasailing", "Scuba diving", "Banana boat ride", "Beach shack", "Sunset selfie", "Feni", "Fish curry rice", "Scooter ride",
    "Flea market bargaining", "Casino night", "Sunburn", "Lost flip-flop", "Missed the flight", "Airport security check", "Packing a suitcase",
    "Building a sandcastle", "Jet ski", "Dolphin spotting", "Coconut water", "Beach volleyball", "Church visit", "Fort Aguada",
    "Selfie with a cow on the beach", "Waiting for the bill", "Group photo with a timer"
  ].map(t => ({ c: "Goa trip", t }))
];
