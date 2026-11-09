import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "explicit-information",
  },
  stimulus: "suspension-bridge",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "tidak perlu lagi menempuh jalan memutar untuk sampai ke pasar",
        },
        {
          correct: false,
          label:
            "dapat menjual hasil kebun kepada dua ratus orang yang melintas setiap hari",
        },
        {
          correct: false,
          label: "mendapat kabel baja dari pemerintah kabupaten",
        },
        {
          correct: false,
          label: "dapat menyeberang dengan rakit bambu pada musim hujan",
        },
        {
          correct: false,
          label: "tidak perlu lagi membayar ongkos menyeberang dengan rakit",
        },
      ],
    },
  },
};

export default item;
