import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "noise-hearing",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2$$ kali, karena volumenya turun dua kali $$3$$ dB",
        },
        {
          correct: false,
          label: "$$6$$ kali, sesuai dengan selisih desibelnya",
        },
        {
          correct: false,
          label: "sekitar $$1{,}07$$ kali, karena $$97$$ dibagi $$91$$",
        },
        {
          correct: true,
          label: "$$4$$ kali, dari $$30$$ menit menjadi $$2$$ jam",
        },
        {
          correct: false,
          label: "$$8$$ kali, dari $$15$$ menit menjadi $$2$$ jam",
        },
      ],
    },
  },
};

export default item;
