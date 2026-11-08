import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "mobile-library",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "kecewa karena merasa sudah dibohongi oleh Dimas selama berminggu-minggu",
        },
        {
          correct: true,
          label:
            "menjaga perasaan Dimas sambil diam-diam membantunya belajar membaca",
        },
        {
          correct: false,
          label: "ingin melaporkan kemampuan membaca Dimas kepada kepala dusun",
        },
        {
          correct: false,
          label:
            "mengabaikan anak-anak lain agar dapat mengajari Dimas sepanjang hari",
        },
        {
          correct: false,
          label: "mungkin akan berhenti membawa buku ikan paus ke dusun itu",
        },
      ],
    },
  },
};

export default item;
