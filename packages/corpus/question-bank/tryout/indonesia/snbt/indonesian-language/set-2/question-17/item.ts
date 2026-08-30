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
              text: "Tiga korban yang ditemukan di bagian hunian",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Lukisan dinding mewah di atrium rumah" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Prasasti pemilihan umum pada dinding bangunan",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Jendela berjeruji dan satu-satunya jalan keluar menuju atrium",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Oven besar dan wadah untuk mengaduk adonan",
            },
          ],
        },
      ],
    },
  },
};

export default item;
