import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "daily-relevance",
  },
  stimulus: "study-breaks",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menerapkan jeda lima menit sebagai aturan tetap sebelum memeriksa perbedaan individu",
        },
        {
          correct: false,
          label:
            "mengganti latihan tanpa jeda dengan urutan sesi yang sama bagi setiap peserta",
        },
        {
          correct: true,
          label: "mencoba jeda terencana sambil memantau hasil pribadi",
        },
        {
          correct: false,
          label: "menyatakan hasil simulasi sebagai nasihat medis",
        },
        {
          correct: false,
          label: "mengabaikan perbedaan kebutuhan peserta",
        },
      ],
    },
  },
};

export default item;
