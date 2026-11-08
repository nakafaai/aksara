import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "bambu",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Semua jenis bambu bertambah tinggi hampir satu meter setiap hari.",
        },
        {
          column: 1,
          label: "Bambu dapat dipanen jauh lebih cepat daripada pohon jati.",
        },
        {
          column: 2,
          label:
            "Bambu yang sudah direndam tetap awet walaupun terus-menerus terkena tanah lembap.",
        },
        {
          column: 1,
          label:
            "Mengurangi kandungan pati dapat membuat bambu lebih tahan terhadap kumbang bubuk.",
        },
      ],
    },
  },
};

export default item;
