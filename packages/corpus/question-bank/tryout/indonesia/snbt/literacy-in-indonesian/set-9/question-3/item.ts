import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "c4-photosynthesis",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pada kadar $$\\mathrm{CO_2}$$ yang tinggi, pompa C4 berhenti bekerja karena tidak ada $$\\mathrm{CO_2}$$ yang perlu dipompa.",
        },
        {
          correct: false,
          label:
            "Pada kadar $$\\mathrm{CO_2}$$ yang tinggi, padi C4 kehilangan lebih banyak air untuk setiap gram gula yang dibuatnya.",
        },
        {
          correct: true,
          label:
            "Pada kadar $$\\mathrm{CO_2}$$ yang tinggi, Rubisco padi biasa lebih jarang mengikat oksigen, sehingga keunggulan pompa C4 ikut mengecil.",
        },
        {
          correct: false,
          label:
            "Pada kadar $$\\mathrm{CO_2}$$ yang tinggi, Rubisco padi biasa makin sering mengikat oksigen, sehingga padi C4 makin unggul.",
        },
        {
          correct: false,
          label:
            "Pada kadar $$\\mathrm{CO_2}$$ yang tinggi, suhu daun turun sehingga fotorespirasi sama sekali tidak terjadi.",
        },
      ],
    },
  },
};

export default item;
