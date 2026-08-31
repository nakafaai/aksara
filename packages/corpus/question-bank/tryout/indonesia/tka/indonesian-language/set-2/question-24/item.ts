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
          label:
            "menerapkan jeda lima menit sebagai aturan tetap sebelum memeriksa perbedaan individu",
        },
        {
          isCorrect: false,
          label:
            "mengganti latihan tanpa jeda dengan urutan sesi yang sama bagi setiap peserta",
        },
        {
          isCorrect: true,
          label: "mencoba jeda terencana sambil memantau hasil pribadi",
        },
        {
          isCorrect: false,
          label: "menyatakan hasil simulasi sebagai nasihat medis",
        },
        {
          isCorrect: false,
          label: "mengabaikan perbedaan kebutuhan peserta",
        },
      ],
    },
  },
  stimulusKey: "study-breaks",
};

export default item;
