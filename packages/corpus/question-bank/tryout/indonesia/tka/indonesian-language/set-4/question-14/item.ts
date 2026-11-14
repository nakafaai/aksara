import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "language-suitability",
  },
  stimulus: "classroom-noise",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Papan gabus terbukti menghilangkan seluruh kebisingan di kelas.",
        },
        {
          correct: false,
          label:
            "Berkat percobaan ini, siswa tidak akan pernah gaduh lagi di dalam kelas.",
        },
        {
          correct: false,
          label: "Gaung berkurang 0,8 detik setelah bahan peredam dipasang.",
        },
        {
          correct: false,
          label:
            "Kelas yang penuh siswa pasti lebih bergaung daripada kelas kosong.",
        },
        {
          correct: true,
          label:
            "Setelah dinding belakang dan jendela diberi bahan peredam, bunyi tepukan di kelas kosong lenyap lebih cepat menurut aplikasi ponsel.",
        },
      ],
    },
  },
};

export default item;
