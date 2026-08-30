import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "daily-relevance",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "menganggap jeda lima menit wajib bagi semua tugas",
        },
        {
          isCorrect: false,
          label: "menghapus seluruh latihan tanpa jeda",
        },
        {
          isCorrect: false,
          label: "menyatakan hasil simulasi sebagai nasihat medis",
        },
        {
          isCorrect: false,
          label: "mengabaikan perbedaan kebutuhan peserta",
        },
        {
          isCorrect: true,
          label: "mencoba jeda terencana sambil memantau hasil pribadi",
        },
      ],
    },
  },
  stimulusKey: "study-breaks",
};

export default item;
