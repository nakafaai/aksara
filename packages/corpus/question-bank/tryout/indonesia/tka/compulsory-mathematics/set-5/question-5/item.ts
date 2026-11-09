import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Tarif A selalu lebih murah daripada tarif B.",
        },
        {
          correct: false,
          label: "Tarif A dan tarif B sama untuk lama parkir $$3$$ jam.",
        },
        {
          correct: false,
          label:
            "Tarif B lebih murah tepat untuk lama parkir lebih dari $$3$$ jam.",
        },
        {
          correct: true,
          label:
            "Tarif A lebih murah tepat untuk lama parkir lebih dari $$2$$ jam.",
        },
        {
          correct: false,
          label:
            "Tarif A lebih murah tepat untuk lama parkir paling sedikit $$2$$ jam.",
        },
      ],
    },
  },
};

export default item;
