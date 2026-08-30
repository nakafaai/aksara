import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Letak geografis Indonesia yang strategis" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Keunggulan produk pertanian Indonesia" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Indonesia menjadi pengekspor nomor satu dunia dan menuju negara maju",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Banyak masyarakat Indonesia yang berusia produktif",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Peningkatan produktivitas Indonesia" },
          ],
        },
      ],
    },
  },
};

export default item;
