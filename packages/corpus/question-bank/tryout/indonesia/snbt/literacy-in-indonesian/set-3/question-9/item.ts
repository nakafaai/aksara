import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "figurative-language",
  },
  stimulus: "sugar-tax",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ajakan agar pemerintah mencari kebijakan lain yang lebih sempurna daripada cukai.",
        },
        {
          correct: false,
          label:
            "Pengakuan bahwa cukai tidak terbukti mengubah perilaku produsen dan konsumen.",
        },
        {
          correct: false,
          label:
            "Peringatan bahwa iklan dan harga sayur lebih berpengaruh daripada cukai.",
        },
        {
          correct: true,
          label:
            "Kritik terhadap penolakan kebijakan yang bermanfaat hanya karena tidak sempurna.",
        },
        {
          correct: false,
          label:
            "Pernyataan bahwa masalah gizi tidak akan pernah dapat diselesaikan.",
        },
      ],
    },
  },
};

export default item;
