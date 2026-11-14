import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "lari",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Median waktu kelas XI A adalah $$14{,}25$$ detik.",
        },
        {
          correct: false,
          label: "Data waktu kelas XI A mempunyai tepat satu modus.",
        },
        {
          correct: true,
          label:
            "Jika waktu Raka tidak diikutkan, median waktu kelas XI A menjadi lebih besar.",
        },
        {
          correct: false,
          label:
            "Jika seorang siswa baru dengan waktu $$13{,}5$$ detik bergabung ke kelas XI A, median waktu kelas XI A tidak berubah.",
        },
        {
          correct: true,
          label:
            "Jika seorang siswa baru dengan waktu $$14{,}6$$ detik bergabung ke kelas XI A, data waktu kelas XI A mempunyai tepat satu modus.",
        },
      ],
    },
  },
};

export default item;
