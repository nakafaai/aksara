import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "awan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Hujan buatan dapat diciptakan dari langit yang cerah dengan bantuan pesawat.",
        },
        {
          correct: false,
          label:
            "Serbuk garam adalah satu-satunya bahan yang dapat dipakai untuk hujan buatan, sehingga teknologi ini tidak dapat dilakukan tanpa garam.",
        },
        {
          correct: false,
          label: "Hujan buatan dipakai untuk memadamkan kebakaran hutan.",
        },
        {
          correct: true,
          label:
            "Modifikasi cuaca bekerja dengan menyemai awan yang sudah ada agar tetes air membesar dan jatuh sebagai hujan.",
        },
        {
          correct: false,
          label:
            "Uap air di awan selalu jatuh sebagai hujan tanpa bantuan apa pun.",
        },
      ],
    },
  },
};

export default item;
