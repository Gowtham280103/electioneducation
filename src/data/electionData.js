export const electionSteps = [
  {
    id: 1,
    icon: "📋",
    title: "Voter Registration",
    titleTa: "வாக்காளர் பதிவு",
    description: "Citizens register to vote by enrolling in the Electoral Roll. You must be 18+ and an Indian citizen.",
    descriptionTa: "குடிமக்கள் தேர்தல் பட்டியலில் பதிவு செய்கிறார்கள்.",
    details: ["Fill Form 6 online", "Submit proof of age and address", "Receive Voter ID card", "Verify name in electoral roll"],
    color: "from-blue-500 to-cyan-500",
    bgColor: "rgba(59,130,246,0.15)",
    duration: "Ongoing"
  },
  {
    id: 2,
    icon: "📢",
    title: "Election Announcement",
    titleTa: "தேர்தல் அறிவிப்பு",
    description: "Election Commission announces election dates. Model Code of Conduct comes into effect.",
    descriptionTa: "தேர்தல் ஆணையம் தேதிகளை அறிவிக்கிறது.",
    details: ["ECI announces schedule", "Model Code activated", "Dates set", "Parties prepare"],
    color: "from-purple-500 to-pink-500",
    bgColor: "rgba(168,85,247,0.15)",
    duration: "4-6 weeks before"
  },
  {
    id: 3,
    icon: "🏛️",
    title: "Nomination",
    titleTa: "வேட்புமனு",
    description: "Candidates file nomination papers with the Returning Officer.",
    descriptionTa: "வேட்பாளர்கள் வேட்புமனு தாக்கல் செய்கிறார்கள்.",
    details: ["File nomination", "Pay security deposit", "Scrutiny of papers", "Withdrawal period"],
    color: "from-orange-500 to-yellow-500",
    bgColor: "rgba(249,115,22,0.15)",
    duration: "2-3 weeks before"
  },
  {
    id: 4,
    icon: "🎤",
    title: "Campaign",
    titleTa: "பிரச்சாரம்",
    description: "Candidates campaign through rallies, speeches, and media.",
    descriptionTa: "வேட்பாளர்கள் பிரச்சாரம் செய்கிறார்கள்.",
    details: ["Public rallies", "Door-to-door", "Media ads", "Silent period 48hrs before"],
    color: "from-green-500 to-teal-500",
    bgColor: "rgba(34,197,94,0.15)",
    duration: "2 weeks"
  },
  {
    id: 5,
    icon: "🗳️",
    title: "Voting Day",
    titleTa: "வாக்களிப்பு",
    description: "Eligible voters cast their votes using Electronic Voting Machines.",
    descriptionTa: "வாக்காளர்கள் வாக்களிக்கிறார்கள்.",
    details: ["Bring Voter ID", "Ink mark on finger", "Use EVM", "VVPAT verification", "NOTA option"],
    color: "from-red-500 to-rose-500",
    bgColor: "rgba(239,68,68,0.15)",
    duration: "Single day"
  },
  {
    id: 6,
    icon: "🔢",
    title: "Vote Counting",
    titleTa: "எண்ணிக்கை",
    description: "Votes are counted at counting centers under strict supervision.",
    descriptionTa: "வாக்குகள் எண்ணப்படுகின்றன.",
    details: ["Counting starts 8 AM", "Postal ballots first", "EVM results tallied", "Winner declared"],
    color: "from-indigo-500 to-blue-500",
    bgColor: "rgba(99,102,241,0.15)",
    duration: "1-2 days after"
  },
  {
    id: 7,
    icon: "🏆",
    title: "Results & Government",
    titleTa: "முடிவுகள்",
    description: "Winning party forms the government.",
    descriptionTa: "வெற்றி கட்சி அரசு அமைக்கிறது.",
    details: ["Majority identified", "President invites", "PM/CM sworn in", "Cabinet formation"],
    color: "from-yellow-500 to-orange-500",
    bgColor: "rgba(234,179,8,0.15)",
    duration: "Within 2-3 weeks"
  }
];

export const quizQuestions = [
  {
    id: 1,
    question: "What is the minimum age to vote in India?",
    questionTa: "வாக்களிக்க குறைந்தபட்ச வயது?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    optionsTa: ["16 வயது", "18 வயது", "21 வயது", "25 வயது"],
    correct: 1,
    explanation: "In India, every citizen who is 18 years or older has the right to vote.",
    explanationTa: "18 வயது அல்லது அதற்கு மேல் வாக்களிக்கலாம்.",
    category: "Basics"
  },
  {
    id: 2,
    question: "What does EVM stand for?",
    questionTa: "EVM என்றால் என்ன?",
    options: ["Electronic Voting Machine", "Election Verification Method", "Electronic Vote Monitor", "Election Vote Manager"],
    correct: 0,
    explanation: "EVM stands for Electronic Voting Machine used in Indian elections.",
    category: "Technology"
  },
  {
    id: 3,
    question: "What is NOTA?",
    questionTa: "NOTA என்றால்?",
    options: ["None Of The Above", "National Order", "No Official Tally", "National Opposition"],
    correct: 0,
    explanation: "NOTA (None Of The Above) allows voters to reject all candidates.",
    category: "Voting"
  },
  {
    id: 4,
    question: "What is the Model Code of Conduct?",
    questionTa: "மாதிரி நடத்தை விதிகள்?",
    options: ["Rules for voters", "Guidelines for political parties", "Rules for counting", "Code for officials"],
    correct: 1,
    explanation: "MCC is guidelines for political parties during elections.",
    category: "Rules"
  },
  {
    id: 5,
    question: "What is VVPAT?",
    questionTa: "VVPAT என்றால்?",
    options: ["Voter Verified Paper Audit Trail", "Vote Verification Processing", "Verified Voting Paper", "Voter Validation Test"],
    correct: 0,
    explanation: "VVPAT prints a paper slip showing the candidate voted for.",
    category: "Technology"
  },
  {
    id: 6,
    question: "How many Lok Sabha constituencies in India?",
    questionTa: "லோக்சபா தொகுதிகள் எண்ணிக்கை?",
    options: ["442", "543", "545", "552"],
    correct: 1,
    explanation: "India has 543 Lok Sabha constituencies.",
    category: "Structure"
  },
  {
    id: 7,
    question: "Security deposit for Lok Sabha candidate?",
    questionTa: "பாதுகாப்பு வைப்பு?",
    options: ["₹10,000", "₹15,000", "₹25,000", "₹50,000"],
    correct: 2,
    explanation: "General category candidates must deposit ₹25,000.",
    category: "Process"
  },
  {
    id: 8,
    question: "Who heads the Election Commission?",
    questionTa: "தேர்தல் ஆணையத் தலைவர்?",
    options: ["President", "Chief Election Commissioner", "Prime Minister", "Chief Justice"],
    correct: 1,
    explanation: "The Chief Election Commissioner heads the ECI.",
    category: "Structure"
  }
];

export const didYouKnowFacts = [
  {
    id: 1,
    fact: "India has the world's largest democratic electorate with over 960 million registered voters!",
    factTa: "இந்தியாவில் 96 கோடி வாக்காளர்கள்!",
    icon: "🌍",
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    fact: "The first general election in India was held in 1951-52 and took 4 months!",
    factTa: "முதல் தேர்தல் 1951-52 இல் 4 மாதங்கள் ஆனது!",
    icon: "📅",
    color: "from-purple-500 to-pink-400"
  },
  {
    id: 3,
    fact: "India uses over 1.5 million EVMs in a single general election!",
    factTa: "15 லட்சம் EVM கள் பயன்படுத்தப்படுகின்றன!",
    icon: "🖥️",
    color: "from-orange-500 to-yellow-400"
  },
  {
    id: 4,
    fact: "The ink used on voters' fingers lasts 2-4 weeks!",
    factTa: "மை 2-4 வாரங்கள் நீடிக்கும்!",
    icon: "✍️",
    color: "from-green-500 to-teal-400"
  },
  {
    id: 5,
    fact: "Polling booths must be within 2 km of every voter's residence!",
    factTa: "வாக்குச்சாவடி 2 கி.மீ. தூரத்தில்!",
    icon: "📍",
    color: "from-red-500 to-rose-400"
  },
  {
    id: 6,
    fact: "India's Election Commission is one of the most respected electoral bodies!",
    factTa: "தேர்தல் ஆணையம் மிகவும் மதிக்கப்படுகிறது!",
    icon: "🏅",
    color: "from-indigo-500 to-blue-400"
  }
];

export const suggestedQuestions = [
  "How does voting work in India?",
  "What is NOTA and how to use it?",
  "Who can vote in Indian elections?",
  "How to register as a voter?",
  "What is the Election Commission?",
  "What are the stages of an election?",
  "What is Model Code of Conduct?",
  "How are votes counted?"
];

export const aiResponses = {
  "how does voting work": {
    title: "How Voting Works in India 🗳️",
    content: `Voting in India is simple:

**Step 1: Go to Polling Booth**
• Bring your Voter ID
• Find your booth using Voter Helpline (1950)

**Step 2: Verify Identity**
• Officials check your name
• Ink mark on finger
• Receive ballot slip

**Step 3: Cast Vote**
• Enter voting compartment
• Press button on EVM
• VVPAT slip confirms
• NOTA option available

Your vote is secret and secure! 🔒`,
    tags: ["Voting", "EVM"]
  },
  "what is nota": {
    title: "What is NOTA? 🚫",
    content: `**NOTA = None Of The Above**

NOTA lets you reject ALL candidates.

**Key Facts:**
• Introduced in October 2013
• Last option on EVM
• Vote is counted
• Empowers voters

**What if NOTA wins?**
Candidate with second-highest votes wins currently.`,
    tags: ["NOTA", "Voting Rights"]
  },
  "who can vote": {
    title: "Who Can Vote? 👥",
    content: `**You CAN vote if:**
• Indian citizen
• 18 years or older
• Registered in electoral roll
• Not disqualified

**You CANNOT vote if:**
• Non-citizen
• Under 18
• Not registered
• Serving prison sentence

Register at voters.eci.gov.in! 📱`,
    tags: ["Eligibility"]
  },
  "default": {
    title: "Election Process Educator 🗳️",
    content: `I'm here to help you understand Indian elections!

**I can explain:**
• How voting works
• Voter registration
• EVM and VVPAT
• Election Commission
• Model Code of Conduct
• Vote counting

Ask me anything! 👇`,
    tags: ["Help"]
  }
};

export const badges = [
  { id: 1, name: "First Vote", icon: "🗳️", description: "Asked first question", threshold: 1, type: "questions" },
  { id: 2, name: "Curious Citizen", icon: "🔍", description: "Asked 5 questions", threshold: 5, type: "questions" },
  { id: 3, name: "Democracy Scholar", icon: "📚", description: "Asked 10 questions", threshold: 10, type: "questions" },
  { id: 4, name: "Quiz Starter", icon: "✏️", description: "Completed first quiz", threshold: 1, type: "quizzes" },
  { id: 5, name: "Quiz Champion", icon: "🏆", description: "Scored 100%", threshold: 100, type: "score" },
  { id: 6, name: "Election Expert", icon: "⭐", description: "Completed timeline", threshold: 7, type: "timeline" }
];
