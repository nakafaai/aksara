import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$120$$ minutes, with the spoon as the cathode",
        },
        {
          correct: false,
          label: "$$6.0$$ minutes, with the spoon as the cathode",
        },
        {
          correct: true,
          label: "$$60.0$$ minutes, with the spoon as the cathode",
        },
        {
          correct: false,
          label: "$$60.0$$ minutes, with the spoon as the anode",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$120$$ minit, dengan sudu sebagai katod" },
        { correct: false, label: "$$6.0$$ minit, dengan sudu sebagai katod" },
        { correct: true, label: "$$60.0$$ minit, dengan sudu sebagai katod" },
        { correct: false, label: "$$60.0$$ minit, dengan sudu sebagai anod" },
      ],
    },
  },
};

export default item;
