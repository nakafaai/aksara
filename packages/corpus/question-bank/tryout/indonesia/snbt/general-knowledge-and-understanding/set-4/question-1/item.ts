import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "garam",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ikan asin yang sudah dijemur sampai kering tidak dapat lagi ditumbuhi bakteri pembusuk.",
        },
        {
          correct: false,
          label:
            "Garam yang bebas dari senyawa kalsium dan magnesium selalu membuat ikan lebih awet.",
        },
        {
          correct: false,
          label:
            "Bercak kemerahan pada ikan asin menandakan bahwa garam yang ditaburkan terlalu sedikit.",
        },
        {
          correct: true,
          label:
            "Ikan tebal yang lapisan luarnya sudah terasa asin belum tentu aman dari pembusukan di bagian tengahnya.",
        },
        {
          correct: false,
          label:
            "Bakteri pembusuk mati ketika air bebas di dalam daging ikan berkurang.",
        },
      ],
    },
  },
};

export default item;
