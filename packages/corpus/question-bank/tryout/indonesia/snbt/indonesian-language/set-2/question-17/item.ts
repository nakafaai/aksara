import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tiga korban yang ditemukan di bagian hunian",
        },
        { isCorrect: false, label: "Lukisan dinding mewah di atrium rumah" },
        {
          isCorrect: false,
          label: "Prasasti pemilihan umum pada dinding bangunan",
        },
        {
          isCorrect: true,
          label:
            "Jendela berjeruji dan satu-satunya jalan keluar menuju atrium",
        },
        {
          isCorrect: false,
          label: "Oven besar dan wadah untuk mengaduk adonan",
        },
      ],
    },
  },
};

export default item;
