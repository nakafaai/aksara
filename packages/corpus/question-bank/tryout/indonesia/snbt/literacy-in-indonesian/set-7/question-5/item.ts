import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "gut-bacteria",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "yakin bahwa bakteri usus adalah penyebab utama obesitas pada manusia",
        },
        {
          correct: true,
          label:
            "mengakui ada hubungan, tetapi berhati-hati soal sebab-akibatnya pada manusia",
        },
        {
          correct: false,
          label:
            "menolak semua penelitian yang memakai tikus sebagai hewan percobaan",
        },
        {
          correct: false,
          label:
            "menganggap mikrobioma tidak berperan apa pun dalam kesehatan manusia",
        },
        {
          correct: false,
          label:
            "menyarankan agar setiap orang gemuk segera menjalani pemindahan bakteri usus",
        },
      ],
    },
  },
};

export default item;
