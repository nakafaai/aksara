import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  responses: {
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Jembatan bambu patah.",
        },
        {
          isCorrect: true,
          label: "Papan penyeberangan licin.",
        },
        {
          isCorrect: true,
          label: "Pagar baru menutup jalan.",
        },
        {
          isCorrect: false,
          label:
            "Lebar jalur pada peta dianggap cukup untuk memperkirakan akses kursi roda.",
        },
      ],
    },
  },
  stimulusKey: "mapmakers-ink",
};

export default item;
