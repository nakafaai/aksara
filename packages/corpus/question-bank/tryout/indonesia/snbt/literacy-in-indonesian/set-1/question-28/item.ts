import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "salt-field",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pembeli di pasar berbuat curang ketika menimbang garam.",
        },
        {
          correct: false,
          label:
            "Garam dari ladang itu bermutu rendah sehingga dihargai murah.",
        },
        {
          correct: true,
          label:
            "Harga jual garam tidak sebanding dengan kerja keras keluarga petambak.",
        },
        {
          correct: false,
          label:
            "Ayah sengaja menjual garam dengan harga murah agar cepat laku.",
        },
        {
          correct: false,
          label: "Keringat para petambak membuat garam terasa lebih asin.",
        },
      ],
    },
  },
};

export default item;
