import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Menggiling biji-bijian yang diperlukan untuk membuat roti",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Menjaga pintu masuk rumah dari pencuri" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Membawa hasil panen dari luar kota" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Menghias bagian hunian dengan lukisan dinding",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Menjual roti langsung kepada pembeli di jalan",
            },
          ],
        },
      ],
    },
  },
};

export default item;
