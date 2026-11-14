import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "serapan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Saat *gambut* dicantumkan sebagai padanan *peat*, pedoman itu memandang bahasa Indonesia belum menyediakan kata yang tepat untuk konsep itu.",
        },
        {
          correct: false,
          label:
            "Sebelum *gambut* dicantumkan, bahasa Indonesia sama sekali tidak memiliki kata apa pun untuk menyebut benda yang dalam bahasa Inggris disebut *peat*.",
        },
        {
          correct: false,
          label:
            "*Gambut* dicantumkan karena pedoman itu mendahulukan kata dari bahasa daerah daripada kata dari bahasa Indonesia.",
        },
        {
          correct: false,
          label:
            "*Peat* tidak diserap karena pedoman itu melarang bahasa asing dijadikan sumber istilah bahasa Indonesia.",
        },
        {
          correct: false,
          label:
            "*Gambut* sudah menjadi kosakata bahasa Indonesia yang mapan sejak kata itu dicantumkan dalam pedoman.",
        },
      ],
    },
  },
};

export default item;
