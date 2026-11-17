import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "nutrition-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$22\\text{ mg}$$ of carbon dioxide per $$\\text{dm}^2$$ per hour, and $$40\\%$$ is exported",
        },
        {
          correct: false,
          label:
            "$$17.6\\text{ mg}$$ of carbon dioxide per $$\\text{dm}^2$$ per hour, and $$50\\%$$ is exported",
        },
        {
          correct: false,
          label:
            "$$13.2\\text{ mg}$$ of carbon dioxide per $$\\text{dm}^2$$ per hour, and $$67\\%$$ is exported",
        },
        {
          correct: false,
          label:
            "$$22\\text{ mg}$$ of carbon dioxide per $$\\text{dm}^2$$ per hour, and $$50\\%$$ is exported",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$22\\text{ mg}$$ karbon dioksida bagi setiap $$\\text{dm}^2$$ sejam, dan $$40\\%$$ dieksport",
        },
        {
          correct: false,
          label:
            "$$17.6\\text{ mg}$$ karbon dioksida bagi setiap $$\\text{dm}^2$$ sejam, dan $$50\\%$$ dieksport",
        },
        {
          correct: false,
          label:
            "$$13.2\\text{ mg}$$ karbon dioksida bagi setiap $$\\text{dm}^2$$ sejam, dan $$67\\%$$ dieksport",
        },
        {
          correct: false,
          label:
            "$$22\\text{ mg}$$ karbon dioksida bagi setiap $$\\text{dm}^2$$ sejam, dan $$50\\%$$ dieksport",
        },
      ],
    },
  },
};

export default item;
