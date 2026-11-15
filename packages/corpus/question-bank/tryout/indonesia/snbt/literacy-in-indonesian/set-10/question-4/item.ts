import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "shorebird-flyway",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "sekitar $$62{,}5\\%$$ dan $$4{,}5\\%$$, jadi populasi burung di muara itu sudah turun lebih dari separuh",
        },
        {
          correct: false,
          label:
            "sekitar $$37{,}5\\%$$ dan $$95{,}5\\%$$, jadi burung lebih banyak meninggalkan lumpur daripada pematang",
        },
        {
          correct: false,
          label:
            "sekitar $$167\\%$$ dan $$4{,}8\\%$$, jadi gangguan terutama mengenai tempat bertengger",
        },
        {
          correct: false,
          label:
            "sekitar $$62{,}5\\%$$ dan $$50\\%$$, jadi kedua tempat sama-sama terganggu oleh sepeda motor",
        },
        {
          correct: true,
          label:
            "sekitar $$62{,}5\\%$$ dan $$4{,}5\\%$$, jadi gangguan terutama mengenai tempat bertengger, bukan tempat makan, walaupun ke mana burung itu bertengger belum diketahui",
        },
      ],
    },
  },
};

export default item;
