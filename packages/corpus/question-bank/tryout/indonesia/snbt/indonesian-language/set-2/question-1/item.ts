import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Mencuci beras sebelum dimasak" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Harga beras di Indonesia" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Beras memiliki daya tarik universal" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Pengolahan beras" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Evangeline Mantzioris, ahli diet terakreditasi",
            },
          ],
        },
      ],
    },
  },
};

export default item;
