import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "sentence-meaning",
    topic: "referent",
  },
  stimulus: "mikroplastik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "ikan yang memangsa hewan berukuran kecil",
        },
        {
          correct: false,
          label: "butiran penggosok dalam produk pembersih wajah",
        },
        {
          correct: false,
          label: "serat pakaian yang terbawa air limbah",
        },
        {
          correct: true,
          label: "plankton dan kerang yang memakan mikroplastik",
        },
        {
          correct: false,
          label: "manusia yang memakan ikan dari laut",
        },
      ],
    },
  },
};

export default item;
