import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "coffee-plots",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pohon pelindung merugikan karena hasil biji turun 120 kilogram per hektare.",
        },
        {
          correct: true,
          label:
            "Hasil turun, tetapi harga per kilogram naik sehingga pendapatan bertambah.",
        },
        {
          correct: false,
          label:
            "Pohon pelindung tidak berpengaruh karena skor kedua kebun sama-sama di bawah 85.",
        },
        {
          correct: false,
          label:
            "Pohon pelindung menaikkan hasil dan skor cita rasa sekaligus.",
        },
        {
          correct: false,
          label: "Pohon pelindung hanya berguna di ketinggian 1.400 mdpl.",
        },
      ],
    },
  },
};

export default item;
