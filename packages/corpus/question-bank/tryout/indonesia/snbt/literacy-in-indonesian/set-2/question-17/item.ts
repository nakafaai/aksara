import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Tiga korban yang ditemukan di bagian hunian",
        },
        {
          correct: false,
          label: "Lukisan dinding mewah di atrium rumah",
        },
        {
          correct: false,
          label: "Prasasti pemilihan umum pada dinding bangunan",
        },
        {
          correct: true,
          label:
            "Jendela berjeruji dan satu-satunya jalan keluar menuju atrium",
        },
        {
          correct: false,
          label: "Oven besar dan wadah untuk mengaduk adonan",
        },
      ],
    },
  },
};

export default item;
