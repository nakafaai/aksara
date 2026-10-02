import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Menunjukkan bahwa empati perlu tampak dalam pemeriksaan asumsi dan respons terhadap umpan balik, bukan berhenti pada niat merasa peduli.",
        },
        {
          isCorrect: false,
          label:
            "Membuktikan Tari dapat memahami kebutuhan anak hanya dengan membayangkan dirinya berada dalam situasi mereka.",
        },
        {
          isCorrect: false,
          label:
            "Mengubah semua permintaan peserta menjadi aturan tetap yang tidak boleh diuji kembali.",
        },
        {
          isCorrect: false,
          label:
            "Menetapkan bahwa pencatatan hambatan merupakan tanda kegagalan empati karena masalah masih tersisa.",
        },
        {
          isCorrect: false,
          label:
            "Menjelaskan perasaan tiga anak secara lengkap meskipun cerita hanya menunjukkan beberapa pilihan mereka.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
