import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "truth-teller",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pelakunya Kirana, sedangkan pernyataan yang benar adalah milik Lutfi.",
        },
        {
          correct: false,
          label:
            "Pelakunya Joko, sedangkan pernyataan yang benar adalah milik Kirana.",
        },
        {
          correct: false,
          label:
            "Pelakunya Maya, sedangkan pernyataan yang benar adalah milik Joko.",
        },
        {
          correct: false,
          label:
            "Pelakunya Kirana, sedangkan pernyataan yang benar adalah milik Maya.",
        },
        {
          correct: false,
          label:
            "Pelakunya Lutfi, sedangkan pernyataan yang benar adalah milik Joko.",
        },
      ],
    },
  },
};

export default item;
