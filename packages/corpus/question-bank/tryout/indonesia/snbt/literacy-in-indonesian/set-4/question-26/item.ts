import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "choice-overload",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "pembeli $$10$$ kali lipat, pengunjung yang berhenti $$1{,}5$$ kali lipat",
        },
        {
          correct: true,
          label:
            "pembeli sekitar $$6{,}7$$ kali lipat, pengunjung yang berhenti $$1{,}5$$ kali lipat",
        },
        {
          correct: false,
          label:
            "pembeli sekitar $$6{,}7$$ kali lipat, pengunjung yang berhenti sekitar $$0{,}67$$ kali lipat",
        },
        {
          correct: false,
          label:
            "pembeli $$10$$ kali lipat, pengunjung yang berhenti $$1{,}2$$ kali lipat",
        },
        {
          correct: false,
          label:
            "pembeli $$1{,}5$$ kali lipat, pengunjung yang berhenti sekitar $$6{,}7$$ kali lipat",
        },
      ],
    },
  },
};

export default item;
