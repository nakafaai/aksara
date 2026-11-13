import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kejadian $$A$$ dan $$B$$ saling lepas.",
        },
        {
          correct: true,
          label: "Kejadian $$A$$ dan $$B$$ saling bebas.",
        },
        {
          correct: false,
          label: "$$P(A\\mid B)=0{,}4$$",
        },
        {
          correct: true,
          label:
            "Peluang kejadian $$A$$ dan kejadian $$B$$ sama-sama tidak terjadi adalah $$0{,}3$$.",
        },
        {
          correct: true,
          label:
            "Peluang tepat satu dari kejadian $$A$$ dan $$B$$ terjadi adalah $$0{,}5$$.",
        },
      ],
    },
  },
};

export default item;
