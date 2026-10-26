import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "noda membuat Laras menganggap peta awal tidak lagi berguna untuk pemeriksaan lapangan",
        },
        {
          correct: true,
          label:
            "noda memicu pemeriksaan yang mengubah rasa kesal menjadi kehati-hatian",
        },
        {
          correct: false,
          label:
            "noda membuat Laras menganggap jalur lama masih dapat dipakai tanpa pemeriksaan tambahan",
        },
        {
          correct: false,
          label: "noda menyebabkan warga menutup lorong baru",
        },
        {
          correct: false,
          label:
            "noda membuat Laras menganggap catatan lapangan tidak dapat dipercaya",
        },
      ],
    },
  },
  stimulus: "mapmakers-ink",
};

export default item;
