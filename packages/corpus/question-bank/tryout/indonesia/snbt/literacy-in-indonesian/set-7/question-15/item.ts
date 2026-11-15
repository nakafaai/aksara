import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "plastic-levy",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Teks A tetap benar bahwa kebiasaan berubah dan cukai berhasil mengurangi plastik, karena jumlah kantong tipis turun $$80\\%$$.",
        },
        {
          correct: false,
          label:
            "Temuan itu membuktikan bahwa penulis Teks B sejak awal menolak cukai kantong plastik.",
        },
        {
          correct: false,
          label:
            "Temuan itu menunjukkan bahwa angka penurunan $$80\\%$$ dalam Teks A salah hitung.",
        },
        {
          correct: true,
          label:
            "Jumlah kantong tipis tetap turun $$80\\%$$, tetapi keberhasilan yang diklaim Teks A tidak terbukti menurut ukuran yang diminta Teks B.",
        },
        {
          correct: false,
          label:
            "Temuan itu membuktikan bahwa cukai membuat berat plastik naik, sehingga kebijakan itu merugikan lingkungan.",
        },
      ],
    },
  },
};

export default item;
