import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A virtual image $$40\\text{ cm}$$ from the lens, magnified $$5$$ times, then $$5.0\\text{ cm}$$ for the upright image and $$20\\text{ cm}$$ for the real one",
        },
        {
          correct: false,
          label:
            "A real image $$40\\text{ cm}$$ from the lens, magnified $$5$$ times, then $$5.0\\text{ cm}$$ for the upright image and $$15\\text{ cm}$$ for the real one",
        },
        {
          correct: true,
          label:
            "A virtual image $$40\\text{ cm}$$ from the lens, magnified $$5$$ times, then $$5.0\\text{ cm}$$ for the upright image and $$15\\text{ cm}$$ for the real one",
        },
        {
          correct: false,
          label:
            "A virtual image $$40\\text{ cm}$$ from the lens, magnified $$5$$ times, then $$15\\text{ cm}$$ for the upright image and $$5.0\\text{ cm}$$ for the real one",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Imej maya $$40\\text{ cm}$$ dari kanta, dibesarkan $$5$$ kali, kemudian $$5.0\\text{ cm}$$ bagi imej tegak dan $$20\\text{ cm}$$ bagi imej nyata",
        },
        {
          correct: false,
          label:
            "Imej nyata $$40\\text{ cm}$$ dari kanta, dibesarkan $$5$$ kali, kemudian $$5.0\\text{ cm}$$ bagi imej tegak dan $$15\\text{ cm}$$ bagi imej nyata",
        },
        {
          correct: true,
          label:
            "Imej maya $$40\\text{ cm}$$ dari kanta, dibesarkan $$5$$ kali, kemudian $$5.0\\text{ cm}$$ bagi imej tegak dan $$15\\text{ cm}$$ bagi imej nyata",
        },
        {
          correct: false,
          label:
            "Imej maya $$40\\text{ cm}$$ dari kanta, dibesarkan $$5$$ kali, kemudian $$15\\text{ cm}$$ bagi imej tegak dan $$5.0\\text{ cm}$$ bagi imej nyata",
        },
      ],
    },
  },
};

export default item;
