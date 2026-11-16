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
          label: "$$33.3$$ minutes, with the disc as the cathode",
        },
        {
          correct: false,
          label: "$$60.0$$ minutes, with the disc as the cathode",
        },
        {
          correct: true,
          label: "$$66.7$$ minutes, with the disc as the cathode",
        },
        {
          correct: false,
          label: "$$66.7$$ minutes, with the disc as the anode",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$33.3$$ minit, dengan cakera sebagai katod",
        },
        {
          correct: false,
          label: "$$60.0$$ minit, dengan cakera sebagai katod",
        },
        { correct: true, label: "$$66.7$$ minit, dengan cakera sebagai katod" },
        { correct: false, label: "$$66.7$$ minit, dengan cakera sebagai anod" },
      ],
    },
  },
};

export default item;
