import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "fish-auction",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Nilai lelang total naik sekitar $$16{,}7\\%$$, dan nilai rata-rata per perahu juga ikut naik." },
        { correct: true, label: "Nilai lelang total naik sekitar $$16{,}7\\%$$, tetapi nilai rata-rata per perahu turun sekitar $$27\\%$$." },
        { correct: false, label: "Nilai lelang total naik $$25\\%$$ karena beratnya naik, tetapi nilai rata-rata per perahu turun sekitar $$27\\%$$." },
        { correct: false, label: "Nilai lelang total turun sekitar $$6{,}7\\%$$, dan nilai rata-rata per perahu juga turun." },
        { correct: false, label: "Nilai lelang total naik sekitar $$16{,}7\\%$$, sedangkan nilai rata-rata per perahu tidak berubah." },
      ],
    },
  },
};

export default item;
