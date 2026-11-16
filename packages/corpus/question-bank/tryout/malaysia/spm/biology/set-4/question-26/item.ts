import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "sexual-reproduction-in-flowering-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Endosperm with $$30$$ chromosomes and genotype $$Aaa$$",
        },
        {
          correct: false,
          label: "Testa with $$20$$ chromosomes and genotype $$Aa$$",
        },
        {
          correct: false,
          label: "Embryo with $$30$$ chromosomes and genotype $$Aa$$",
        },
        {
          correct: true,
          label: "Endosperm with $$30$$ chromosomes and genotype $$AAa$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Endosperma dengan $$30$$ kromosom dan genotip $$Aaa$$",
        },
        {
          correct: false,
          label: "Testa dengan $$20$$ kromosom dan genotip $$Aa$$",
        },
        {
          correct: false,
          label: "Embrio dengan $$30$$ kromosom dan genotip $$Aa$$",
        },
        {
          correct: true,
          label: "Endosperma dengan $$30$$ kromosom dan genotip $$AAa$$",
        },
      ],
    },
  },
};

export default item;
