import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "pinisi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Wisata bahari membuat kebutuhan kayu untuk membangun kapal pinisi baru terus berkurang.",
        },
        {
          correct: false,
          label:
            "Perajin pinisi berhenti membuat kapal baru karena kekurangan pembeli dari kalangan pedagang.",
        },
        {
          correct: false,
          label:
            "Kapal pinisi untuk wisata bahari kini dibuat dari bahan selain kayu.",
        },
        {
          correct: true,
          label:
            "Wisata bahari membuka pasar baru, tetapi bahan kayu untuk kapal makin sulit didapat.",
        },
        {
          correct: false,
          label:
            "Penetapan oleh UNESCO pada tahun 2017 menyebabkan kayu untuk kapal menjadi langka.",
        },
      ],
    },
  },
};

export default item;
