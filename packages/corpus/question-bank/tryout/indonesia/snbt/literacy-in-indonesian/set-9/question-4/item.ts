import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "c4-photosynthesis",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$7{,}5$$ ton, sesuai dengan target para pendukung",
        },
        {
          correct: false,
          label:
            "$$6{,}05$$ ton, sesuai dengan simulasi pada kadar $$\\mathrm{CO_2}$$ yang lebih tinggi",
        },
        {
          correct: false,
          label: "$$1{,}6$$ ton, yaitu besar tambahan hasilnya",
        },
        {
          correct: false,
          label:
            "$$6{,}6$$ ton, atau $$0{,}9$$ ton lebih banyak daripada target para pendukung",
        },
        {
          correct: true,
          label:
            "$$6{,}6$$ ton, atau $$0{,}9$$ ton lebih sedikit daripada target para pendukung",
        },
      ],
    },
  },
};

export default item;
