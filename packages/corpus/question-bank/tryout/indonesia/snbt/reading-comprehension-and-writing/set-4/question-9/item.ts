import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "conclusion",
  },
  stimulus: "cassava-flour",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tepung singkong fermentasi dapat menggantikan terigu sepenuhnya pada semua kue.",
        },
        {
          correct: false,
          label:
            "Kue dari tepung terigu selalu lebih murah daripada kue dari tepung singkong.",
        },
        {
          correct: false,
          label:
            "Fermentasi membuat tepung singkong mengandung gluten seperti terigu.",
        },
        {
          correct: false,
          label:
            "Petani singkong di Kabupaten Wonosari tidak mendapat keuntungan dari tepung singkong.",
        },
        {
          correct: true,
          label:
            "Tepung singkong fermentasi dapat mengurangi pemakaian terigu, tetapi belum dapat menggantikannya sepenuhnya.",
        },
      ],
    },
  },
};

export default item;
