import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "inheritance",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\frac{1}{16}$$ heterozygous and $$\\frac{1}{4}$$ with the recessive phenotype",
        },
        {
          correct: true,
          label:
            "$$\\frac{1}{16}$$ heterozygous and $$\\frac{15}{32}$$ with the recessive phenotype",
        },
        {
          correct: false,
          label:
            "$$\\frac{1}{8}$$ heterozygous and $$\\frac{7}{16}$$ with the recessive phenotype",
        },
        {
          correct: false,
          label:
            "$$\\frac{1}{2}$$ heterozygous and $$\\frac{1}{4}$$ with the recessive phenotype",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\frac{1}{16}$$ heterozigot dan $$\\frac{1}{4}$$ dengan fenotip resesif",
        },
        {
          correct: true,
          label:
            "$$\\frac{1}{16}$$ heterozigot dan $$\\frac{15}{32}$$ dengan fenotip resesif",
        },
        {
          correct: false,
          label:
            "$$\\frac{1}{8}$$ heterozigot dan $$\\frac{7}{16}$$ dengan fenotip resesif",
        },
        {
          correct: false,
          label:
            "$$\\frac{1}{2}$$ heterozigot dan $$\\frac{1}{4}$$ dengan fenotip resesif",
        },
      ],
    },
  },
};

export default item;
