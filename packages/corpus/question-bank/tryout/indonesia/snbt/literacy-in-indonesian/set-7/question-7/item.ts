import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "interpretation",
  },
  stimulus: "tide-poem",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Keluarga aku dahulu menyesuaikan jam makan dan tidur dengan naik turunnya air.",
        },
        {
          column: 2,
          label:
            "Ayah berhenti melaut karena tidak lagi bisa membaca tanda-tanda pasang.",
        },
        {
          column: 1,
          label:
            "Walaupun tidak melaut lagi, ayah masih menjalankan sebagian kebiasaannya yang lama.",
        },
        {
          column: 2,
          label: "Ayah biasanya berangkat melaut ketika air mulai surut.",
        },
        {
          column: 2,
          label: "Aku sudah pandai membaca pasang dalam hidupnya di kota.",
        },
      ],
    },
  },
};

export default item;
