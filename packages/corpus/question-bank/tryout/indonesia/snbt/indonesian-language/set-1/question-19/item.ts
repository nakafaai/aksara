import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Tekun mengembangkan kemampuan aktingnya",
        },
        {
          isCorrect: false,
          label: "Mudah menerima citra yang ditentukan orang lain",
        },
        {
          isCorrect: false,
          label: "Berani meninggalkan dunia perfilman",
        },
        {
          isCorrect: false,
          label: "Mengutamakan ketenaran daripada keterampilan",
        },
        {
          isCorrect: false,
          label: "Tidak puas terhadap penghargaan yang diterimanya",
        },
      ],
    },
  },
};

export default item;
