import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "kabin",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "kalimat itu menjadi menyebut istilah *efek rumah kaca* sebagai ungkapan tetap yang diwariskan turun-temurun",
        },
        {
          correct: true,
          label:
            "kalimat itu tidak lagi membandingkan atmosfer dengan rumah kaca, tetapi menyatakan bahwa efek rumah kaca di atmosfer hanya diandaikan dan bukan kenyataan",
        },
        {
          correct: false,
          label:
            "makna kalimat tidak berubah karena *perumpamaan* dan *pengandaian* sama-sama menyatakan sesuatu yang bukan makna sebenarnya",
        },
        {
          correct: false,
          label:
            "makna kalimat tidak berubah karena kata dasar keduanya, *umpama* dan *andai*, sama-sama dapat bermakna 'seandainya'",
        },
        {
          correct: false,
          label:
            "kalimat itu menjadi menganggap atmosfer sebagai salah satu contoh rumah kaca",
        },
      ],
    },
  },
};

export default item;
