import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Hamparan diselimuti kristal es.",
        },
        {
          isCorrect: false,
          label: "Mereka diselimuti kristal es.",
        },
        {
          isCorrect: true,
          label: "Para pengunjung terpesona.",
        },
        {
          isCorrect: false,
          label: "Terpesona kecantikan hamparan kristal es",
        },
        {
          isCorrect: false,
          label: "Diselimuti kristal es bening.",
        },
      ],
    },
  },
};

export default item;
