import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "school-meals",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Rute angkutan baru menjelaskan seluruh kenaikan di Kalirejo dan Sumberan, sehingga makan siang gratis tidak berpengaruh apa pun.",
        },
        {
          correct: true,
          label:
            "Kenaikan di sekolah yang mendapat keduanya jauh melebihi jumlah kenaikan karena masing-masing, jadi keduanya saling memperkuat.",
        },
        {
          correct: false,
          label:
            "Makan siang gratis tidak berpengaruh sama sekali, karena sekolah yang hanya mendapat makan siang naik kurang dari tiga poin.",
        },
        {
          correct: false,
          label:
            "Kenaikan di sekolah yang mendapat keduanya kira-kira sama dengan jumlah kenaikan karena makan siang dan karena rute angkutan.",
        },
        {
          correct: false,
          label:
            "Makan siang gratis lebih berpengaruh daripada rute angkutan, karena kenaikan terbesar justru terjadi di sekolah uji coba program.",
        },
      ],
    },
  },
};

export default item;
