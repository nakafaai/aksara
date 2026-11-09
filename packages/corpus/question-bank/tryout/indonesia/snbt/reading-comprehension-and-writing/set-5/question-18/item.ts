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
            "Hasil percobaan ini akan dipresentasikan pada hari sabtu tanggal 14 November di aula sekolah.",
        },
        {
          correct: true,
          label:
            "Hasil percobaan ini akan dipresentasikan pada hari Sabtu tanggal 14 November di aula sekolah.",
        },
        {
          correct: false,
          label:
            "Hasil percobaan ini akan dipresentasikan pada Hari Sabtu Tanggal 14 November di aula sekolah.",
        },
        {
          correct: false,
          label:
            "Hasil percobaan ini akan dipresentasikan pada hari Sabtu tanggal 14 november di Aula Sekolah.",
        },
        {
          correct: false,
          label:
            "Hasil percobaan ini akan di presentasikan pada hari Sabtu tanggal 14 November di aula sekolah.",
        },
      ],
    },
  },
};

export default item;
