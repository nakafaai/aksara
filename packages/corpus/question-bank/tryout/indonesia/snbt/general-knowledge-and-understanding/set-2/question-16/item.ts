import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "inference",
  },
  stimulus: "gang",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Penulis menganggap kekurangan kampung kota tidak perlu dibenahi karena kampung itu bermanfaat bagi para pendatang.",
        },
        {
          correct: false,
          label:
            "Penulis mengakui kekurangan kampung kota, tetapi tidak menganggapnya sebagai alasan yang cukup untuk menggusur.",
        },
        {
          correct: false,
          label:
            "Bagi penulis, kepadatan kampung kota sekaligus menjadi sumber kekurangan dan sumber manfaatnya.",
        },
        {
          correct: false,
          label:
            "Menurut penulis, seandainya kampung kota tidak sepadat itu, sewa kamarnya belum tentu semurah sekarang.",
        },
        {
          correct: false,
          label:
            "Penulis memandang sebagian kekurangan kampung kota sebagai hal yang dapat dibenahi tanpa memindahkan warganya.",
        },
      ],
    },
  },
};

export default item;
