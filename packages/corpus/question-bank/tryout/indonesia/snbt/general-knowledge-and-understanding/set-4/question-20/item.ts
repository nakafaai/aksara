import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "rawa",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Lahan basah yang simpanan karbonnya paling besar adalah lahan basah yang paling menguntungkan iklim.",
        },
        {
          correct: false,
          label: "Hutan bakau tidak melepaskan gas rumah kaca ke udara.",
        },
        {
          correct: true,
          label:
            "Dua lahan basah yang simpanan karbonnya sama besar dapat berbeda perannya bagi iklim.",
        },
        {
          correct: false,
          label:
            "Membasahi kembali gambut kering menghentikan pelepasan gas rumah kaca dari gambut itu.",
        },
        {
          correct: false,
          label:
            "Karbon yang terlepas dari gambut kering akan tersimpan kembali dalam beberapa tahun setelah gambut itu dibasahi lagi.",
        },
      ],
    },
  },
};

export default item;
