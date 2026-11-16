import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "sexual-reproduction-in-flowering-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$8$$ hours $$30$$ minutes, and one male gamete fuses with the egg cell while the other fuses with the two polar nuclei",
        },
        {
          correct: false,
          label:
            "$$9$$ hours $$20$$ minutes, and one male gamete fuses with the egg cell while the other fuses with the two polar nuclei",
        },
        {
          correct: false,
          label:
            "$$9$$ hours $$50$$ minutes, and both male gametes fuse with the egg cell",
        },
        {
          correct: true,
          label:
            "$$9$$ hours $$50$$ minutes, and one male gamete fuses with the egg cell while the other fuses with the two polar nuclei",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$8$$ jam $$30$$ minit, dan satu gamet jantan bersenyawa dengan sel telur manakala satu lagi bersenyawa dengan dua nukleus kutub",
        },
        {
          correct: false,
          label:
            "$$9$$ jam $$20$$ minit, dan satu gamet jantan bersenyawa dengan sel telur manakala satu lagi bersenyawa dengan dua nukleus kutub",
        },
        {
          correct: false,
          label:
            "$$9$$ jam $$50$$ minit, dan kedua-dua gamet jantan bersenyawa dengan sel telur",
        },
        {
          correct: true,
          label:
            "$$9$$ jam $$50$$ minit, dan satu gamet jantan bersenyawa dengan sel telur manakala satu lagi bersenyawa dengan dua nukleus kutub",
        },
      ],
    },
  },
};

export default item;
