import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "author-purpose",
  },
  stimulus: "silted-pond",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "mengajak pemerintah membangun embung baru di setiap desa",
        },
        {
          correct: false,
          label: "menceritakan sejarah pembangunan embung di Desa Watugede",
        },
        {
          correct: true,
          label:
            "menjelaskan penyebab dangkalnya embung dan upaya warga memulihkannya",
        },
        {
          correct: false,
          label: "membandingkan embung dengan sumur sebagai sumber air",
        },
        {
          correct: false,
          label: "mengkritik warga yang menebang pohon di lereng bukit",
        },
      ],
    },
  },
};

export default item;
