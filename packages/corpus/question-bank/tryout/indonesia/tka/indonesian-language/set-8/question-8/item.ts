import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "main-supporting-ideas",
  },
  stimulus: "lost-vote",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kirana memenangi pemilihan ketua OSIS dengan suara terbanyak",
        },
        {
          correct: true,
          label:
            "kekalahan Kirana justru membuka kesempatan untuk mewujudkan programnya bersama pemenang",
        },
        {
          correct: false,
          label:
            "Bagas mengejek program kampanye Kirana di depan teman-temannya",
        },
        {
          correct: false,
          label:
            "tim kampanye Kirana bertengkar setelah pengumuman hasil pemilihan",
        },
        {
          correct: false,
          label: "kepala sekolah membatalkan hasil pemilihan ketua OSIS",
        },
      ],
    },
  },
};

export default item;
