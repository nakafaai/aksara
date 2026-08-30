import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mudah menerima citra yang ditentukan orang lain",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Berani meninggalkan dunia perfilman" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Tekun mengembangkan kemampuan aktingnya" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mengutamakan ketenaran daripada keterampilan",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tidak puas terhadap penghargaan yang diterimanya",
            },
          ],
        },
      ],
    },
  },
};

export default item;
