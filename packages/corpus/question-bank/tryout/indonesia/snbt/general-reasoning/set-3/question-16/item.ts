import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Apel mengandung lemak lebih sedikit daripada bengkuang.",
        },
        {
          isCorrect: false,
          label:
            "Bengkuang memberikan energi $$14\\,\\text{kkal}$$ lebih sedikit daripada apel.",
        },
        {
          isCorrect: false,
          label:
            "Bengkuang mengandung protein $$0{,}46\\,\\text{g}$$ lebih banyak daripada apel.",
        },
        {
          isCorrect: false,
          label:
            "Kedua pangan mengandung protein kurang dari $$1\\,\\text{g}$$ per $$100\\,\\text{g}$$.",
        },
        {
          isCorrect: false,
          label:
            "Kedua pangan mengandung lemak kurang dari $$1\\,\\text{g}$$ per $$100\\,\\text{g}$$.",
        },
      ],
    },
  },
};

export default item;
