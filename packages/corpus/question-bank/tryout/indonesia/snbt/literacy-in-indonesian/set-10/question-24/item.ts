import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Menunjukkan bahwa empati perlu tampak dalam pemeriksaan asumsi dan respons terhadap umpan balik, bukan berhenti pada niat merasa peduli.",
        },
        {
          correct: false,
          label:
            "Membuktikan Tari dapat memahami kebutuhan anak hanya dengan membayangkan dirinya berada dalam situasi mereka.",
        },
        {
          correct: false,
          label:
            "Mengubah semua permintaan peserta menjadi aturan tetap yang tidak boleh diuji kembali.",
        },
        {
          correct: false,
          label:
            "Menetapkan bahwa pencatatan hambatan merupakan tanda kegagalan empati karena masalah masih tersisa.",
        },
        {
          correct: false,
          label:
            "Menjelaskan perasaan tiga anak secara lengkap meskipun cerita hanya menunjukkan beberapa pilihan mereka.",
        },
      ],
    },
  },
  stimulus: "passage-5",
};

export default item;
