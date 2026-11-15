import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "theme",
  },
  stimulus: "night-bus-driver",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Kalimat itu menggemakan nasihat sopir lama dengan mengganti jalannya, dari pantura menjadi jalan tol, tetapi tetap mempertahankan perhatian kepada penumpang.",
        },
        {
          correct: false,
          label:
            "Kalimat itu menggemakan nasihat sopir lama dengan mengganti kendaraannya, dari bus menjadi travel, tetapi tetap mempertahankan kecepatan tiba.",
        },
        {
          correct: false,
          label:
            "Kalimat itu menggemakan ucapan Bu Tarmi dengan mengganti jalannya, dari pantura menjadi jalan tol, tetapi tetap mempertahankan perhatian kepada penumpang.",
        },
        {
          correct: false,
          label:
            "Kalimat itu menggemakan nasihat sopir lama dengan mengganti perhatian kepada penumpang, tetapi tetap mempertahankan jalan yang ditempuh.",
        },
        {
          correct: false,
          label:
            "Kalimat itu menggemakan nasihat sopir lama dengan mengganti jalannya, dari pantura menjadi jalan tol, tetapi tetap mempertahankan ketepatan waktu tiba.",
        },
      ],
    },
  },
};

export default item;
