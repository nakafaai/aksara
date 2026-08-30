import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "status bibit dicatat sesuai kekuatan bukti agar hasil tidak terlalu pasti",
        },
        {
          isCorrect: false,
          label: "semua bibit yang hilang pasti mati",
        },
        {
          isCorrect: false,
          label: "pemantauan cukup dilakukan sekali",
        },
        {
          isCorrect: false,
          label: "penanda tidak perlu dicari setelah hilang",
        },
        {
          isCorrect: false,
          label: "arus tidak memengaruhi lokasi tanam",
        },
      ],
    },
  },
  stimulusKey: "mangrove-nursery",
};

export default item;
