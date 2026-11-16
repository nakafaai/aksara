import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Monomer $$\\text{CF}_2$$, $$1000$$ units and $$2000$$ fluorine atoms per chain, and $$760\\text{ g}$$ of fluorine",
        },
        {
          correct: false,
          label:
            "Monomer $$\\text{C}_2\\text{F}_4$$, $$500$$ units and $$1000$$ fluorine atoms per chain, and $$760\\text{ g}$$ of fluorine",
        },
        {
          correct: true,
          label:
            "Monomer $$\\text{C}_2\\text{F}_4$$, $$500$$ units and $$2000$$ fluorine atoms per chain, and $$760\\text{ g}$$ of fluorine",
        },
        {
          correct: false,
          label:
            "Monomer $$\\text{C}_2\\text{F}_4$$, $$500$$ units and $$2000$$ fluorine atoms per chain, and $$380\\text{ g}$$ of fluorine",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Monomer $$\\text{CF}_2$$, $$1000$$ unit dan $$2000$$ atom fluorin setiap rantai, dan $$760\\text{ g}$$ fluorin",
        },
        {
          correct: false,
          label:
            "Monomer $$\\text{C}_2\\text{F}_4$$, $$500$$ unit dan $$1000$$ atom fluorin setiap rantai, dan $$760\\text{ g}$$ fluorin",
        },
        {
          correct: true,
          label:
            "Monomer $$\\text{C}_2\\text{F}_4$$, $$500$$ unit dan $$2000$$ atom fluorin setiap rantai, dan $$760\\text{ g}$$ fluorin",
        },
        {
          correct: false,
          label:
            "Monomer $$\\text{C}_2\\text{F}_4$$, $$500$$ unit dan $$2000$$ atom fluorin setiap rantai, dan $$380\\text{ g}$$ fluorin",
        },
      ],
    },
  },
};

export default item;
