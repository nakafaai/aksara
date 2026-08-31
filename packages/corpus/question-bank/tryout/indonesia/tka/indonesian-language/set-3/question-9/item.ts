import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "noda membuat Laras menganggap peta awal tidak lagi berguna untuk pemeriksaan lapangan",
        },
        {
          isCorrect: true,
          label:
            "noda memicu pemeriksaan yang mengubah rasa kesal menjadi kehati-hatian",
        },
        {
          isCorrect: false,
          label:
            "noda membuat Laras menganggap jalur lama masih dapat dipakai tanpa pemeriksaan tambahan",
        },
        {
          isCorrect: false,
          label: "noda menyebabkan warga menutup lorong baru",
        },
        {
          isCorrect: false,
          label:
            "noda membuat Laras menganggap catatan lapangan tidak dapat dipercaya",
        },
      ],
    },
  },
  stimulusKey: "mapmakers-ink",
};

export default item;
