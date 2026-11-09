import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "spelling",
  },
  stimulus: "seed-soak",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Hasil percobaan ini akan dipresentasikan kepada tiga kelas-kelas lain pada pekan depan.",
        },
        {
          correct: true,
          label:
            "Hasil percobaan ini akan dipresentasikan kepada tiga kelas lain pada pekan depan.",
        },
        {
          correct: false,
          label:
            "Hasil percobaan ini akan di presentasikan kepada tiga kelas lain pada pekan depan.",
        },
        {
          correct: false,
          label:
            "Hasil percobaan ini akan dipresentasikan kepada tiga kelas lain pada Pekan Depan.",
        },
        {
          correct: false,
          label:
            "Hasil percobaan ini akan dipresentasikan kepada 3 kelas-kelas lain pada pekan depan.",
        },
      ],
    },
  },
};

export default item;
