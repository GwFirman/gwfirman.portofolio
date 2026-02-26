import Navigation from "@/components/Navigation";

type GuestLetter = {
    name: string;
    date: string;
    message: string;
    emoji: string;
    rotation: number;
};

const dummyLetters: GuestLetter[] = [
    {
        name: "Sarah Chen",
        date: "Feb 20, 2026",
        message:
            "Amazing portfolio! Your work on the contribution graph is really impressive. Keep up the great work! 🚀",
        emoji: "✉️",
        rotation: -2,
    },
    {
        name: "Alex Rivera",
        date: "Feb 18, 2026",
        message:
            "Love the clean design and attention to detail. The dark mode is chef's kiss! Would love to collaborate sometime.",
        emoji: "📨",
        rotation: 1.5,
    },
    {
        name: "Yuki Tanaka",
        date: "Feb 15, 2026",
        message:
            "Great UI/UX skills! The animations are smooth and the overall experience feels very polished. Inspiring work!",
        emoji: "💌",
        rotation: -1,
    },
    {
        name: "Marcus Johnson",
        date: "Feb 12, 2026",
        message:
            "Stumbled upon your portfolio and I'm blown away. The project cards look fantastic. Bookmarked for inspiration!",
        emoji: "📬",
        rotation: 2,
    },
    {
        name: "Emily Park",
        date: "Feb 10, 2026",
        message:
            "Fellow developer here — your tech stack choices are solid and the code quality shows in the final product. Well done!",
        emoji: "📩",
        rotation: -1.5,
    },
    {
        name: "David Okafor",
        date: "Feb 8, 2026",
        message:
            "Visited after seeing your hackathon project. The innovation award was well deserved. Keep building cool stuff!",
        emoji: "✉️",
        rotation: 0.5,
    },
];

export default function GuestBookPage() {
    return (
        <>
            <Navigation />
            <div className="min-h-screen dark:bg-gray-950 pt-28 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-2xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 font-mono-nl italic mb-2 sm:mb-4">
                            Guest Book
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 font-mono-nl text-sm">
                            Messages from visitors — leave your mark!
                        </p>
                    </div>

                    {/* Letters Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dummyLetters.map((letter, idx) => (
                            <LetterCard key={idx} letter={letter} index={idx} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

function LetterCard({
    letter,
    index,
}: {
    letter: GuestLetter;
    index: number;
}) {
    return (
        <div
            className="group relative"
            style={{
                transform: `rotate(${letter.rotation}deg)`,
                animationDelay: `${index * 80}ms`,
            }}
        >
            {/* Folder */}
            <div className="relative rounded-lg overflow-visible">
                {/* Folder tab */}
                <div className="absolute -top-3 left-4 w-20 h-5 rounded-t-md bg-amber-200 dark:bg-amber-900/60 border border-b-0 border-amber-300 dark:border-amber-700/50 z-0" />

                {/* Folder body */}
                <div className="relative rounded-lg bg-amber-100 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 pt-4 pb-2 px-3 z-10 shadow-sm">
                    {/* Paper / Letter */}
                    <div
                        className="relative bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700/50 p-4 shadow-sm 
              transition-all duration-300 ease-out
              group-hover:-translate-y-3 group-hover:shadow-md group-hover:shadow-amber-200/30 dark:group-hover:shadow-amber-900/20"
                    >
                        {/* Content */}
                        <div className="relative z-10">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{letter.emoji}</span>
                                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 font-mono-nl">
                                        {letter.name}
                                    </span>
                                </div>
                                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono-nl">
                                    {letter.date}
                                </span>
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px bg-gray-100 dark:bg-gray-800 mb-3" />

                            {/* Message */}
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono-nl leading-relaxed">
                                {letter.message}
                            </p>
                        </div>

                        {/* Paper fold corner */}
                        <div className="absolute top-0 right-0 w-0 h-0 
              border-l-[16px] border-l-transparent 
              border-t-[16px] border-t-gray-100 dark:border-t-gray-800 
              rounded-bl-sm" />
                    </div>
                </div>
            </div>
        </div>
    );
}
