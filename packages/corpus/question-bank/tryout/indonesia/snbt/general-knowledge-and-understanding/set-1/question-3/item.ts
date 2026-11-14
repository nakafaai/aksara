import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "vocabulary",
    topic: "affix-meaning",
  },
  stimulus: "mikoriza",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "maknanya tetap karena *menjulur* dan *menjulurkan* sama-sama menyatakan gerak memanjang ke luar",
        },
        {
          correct: false,
          label:
            "kalimat menyatakan bahwa hifa memanjang ke luar untuk kepentingan tanaman",
        },
        {
          correct: false,
          label:
            "hifa menjadi pihak yang dijulurkan oleh jamur sehingga kalimat bermakna pasif",
        },
        {
          correct: true,
          label:
            "kata itu menuntut objek, yaitu benda yang dijulurkan oleh hifa, padahal objek itu tidak ada sehingga kalimat menjadi tidak lengkap",
        },
        {
          correct: false,
          label:
            "lapisan tanah yang sudah miskin fosfor menjadi benda yang dijulurkan oleh hifa",
        },
      ],
    },
  },
};

export default item;
