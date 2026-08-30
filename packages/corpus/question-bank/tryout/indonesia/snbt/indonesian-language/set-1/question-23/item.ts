import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kesiapan persenjataan" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Perlindungan terhadap pemimpin" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Jumlah tentara yang tersedia" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Ketersediaan rumah sakit dan obat-obatan" },
          ],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Biaya dan dampak perang" }],
        },
      ],
    },
  },
};

export default item;
