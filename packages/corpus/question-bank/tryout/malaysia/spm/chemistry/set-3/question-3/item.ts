import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "There is no difference in neutrons, and both samples hold the same number of protons",
        },
        {
          correct: false,
          label:
            "Heavy water holds $$1.20 \\times 10^{23}$$ more neutrons, and ordinary water holds more protons",
        },
        {
          correct: true,
          label:
            "Heavy water holds $$6.69 \\times 10^{22}$$ more neutrons, and ordinary water holds more protons",
        },
        {
          correct: false,
          label:
            "Heavy water holds $$6.69 \\times 10^{22}$$ more neutrons, and heavy water also holds more protons",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tiada perbezaan bilangan neutron, dan kedua-dua sampel mengandungi bilangan proton yang sama",
        },
        {
          correct: false,
          label:
            "Air berat mengandungi $$1.20 \\times 10^{23}$$ neutron lebih banyak, dan air biasa mengandungi lebih banyak proton",
        },
        {
          correct: true,
          label:
            "Air berat mengandungi $$6.69 \\times 10^{22}$$ neutron lebih banyak, dan air biasa mengandungi lebih banyak proton",
        },
        {
          correct: false,
          label:
            "Air berat mengandungi $$6.69 \\times 10^{22}$$ neutron lebih banyak, dan air berat juga mengandungi lebih banyak proton",
        },
      ],
    },
  },
};

export default item;
