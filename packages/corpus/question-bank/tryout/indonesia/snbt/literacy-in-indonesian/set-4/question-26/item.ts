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
            "$$15$$ orang di stan $$24$$ rasa dan $$150$$ orang di stan $$6$$ rasa",
        },
        {
          correct: true,
          label:
            "$$9$$ orang di stan $$24$$ rasa dan $$60$$ orang di stan $$6$$ rasa",
        },
        {
          correct: false,
          label:
            "$$300$$ orang di stan $$24$$ rasa dan $$200$$ orang di stan $$6$$ rasa",
        },
        {
          correct: false,
          label:
            "$$1{,}8$$ orang di stan $$24$$ rasa dan $$12$$ orang di stan $$6$$ rasa",
        },
        {
          correct: false,
          label:
            "$$60$$ orang di stan $$24$$ rasa dan $$9$$ orang di stan $$6$$ rasa",
        },
      ],
    },
  },
};

export default item;
