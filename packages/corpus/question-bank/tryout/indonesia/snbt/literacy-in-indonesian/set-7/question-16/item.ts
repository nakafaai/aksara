import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "rooftop-solar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Panel hanya bekerja pada siang hari, padahal rumah juga memakai listrik malam hari.",
        },
        {
          correct: false,
          label: "Panel Rumah S rusak selama sebagian besar bulan itu.",
        },
        {
          correct: false,
          label:
            "Koperasi mewajibkan setiap anggota membeli listrik dari jaringan.",
        },
        {
          correct: false,
          label:
            "Kapasitas panel Rumah S terlalu kecil dibandingkan dengan rumah lain.",
        },
        {
          correct: false,
          label:
            "Listrik dari panel surya lebih mahal daripada listrik yang dibeli dari jaringan.",
        },
      ],
    },
  },
};

export default item;
