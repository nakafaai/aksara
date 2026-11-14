import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  stimulus: "lost-girl",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Mbak Sari menyuruh Arif langsung pulang dari pasar.",
        },
        {
          correct: false,
          label: "Mbak Sari menyambut Arif dengan wajah masam.",
        },
        {
          correct: false,
          label: "Mbak Sari harus mengantar pesanan kue besok pagi.",
        },
        {
          correct: true,
          label:
            "Mbak Sari menaruh potongan kue terbesar di piring Arif dan meminta maaf.",
        },
        { correct: false, label: "Ibu Nisa membawa sepiring pisang goreng." },
      ],
    },
  },
};

export default item;
