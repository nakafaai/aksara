import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "transport-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "At about 1:50 pm" },
        { correct: false, label: "At 3:00 pm" },
        { correct: true, label: "At 5:00 pm" },
        {
          correct: false,
          label: "Never, because the roots keep absorbing water",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Kira-kira pukul 1:50 petang" },
        { correct: false, label: "Pukul 3:00 petang" },
        { correct: true, label: "Pukul 5:00 petang" },
        {
          correct: false,
          label: "Tidak akan layu, kerana akar terus menyerap air",
        },
      ],
    },
  },
};

export default item;
