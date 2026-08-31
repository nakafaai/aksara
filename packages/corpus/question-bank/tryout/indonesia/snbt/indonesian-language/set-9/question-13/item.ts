import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nilai 34 membuktikan bahwa tanda jarak memenuhi kebutuhan semua pengunjung, termasuk mereka yang belum terwakili dalam uji.",
        },
        {
          isCorrect: false,
          label:
            "Keterlibatan pemandu dan petugas taman membuat pengamatan langsung terhadap pengguna dengan hambatan penglihatan tidak diperlukan.",
        },
        {
          isCorrect: true,
          label:
            "Nilai 34 dibandingkan 23 mendukung penerusan tanda jarak secara terbatas, tetapi hasil belum dapat digeneralisasi kepada pengunjung dengan hambatan penglihatan.",
        },
        {
          isCorrect: false,
          label:
            "Karena jadwal dan jumlah petugas tetap, kenaikan nilai pasti sepenuhnya disebabkan tanda jarak pada setiap jalur wisata.",
        },
        {
          isCorrect: false,
          label:
            "Nilai dasar 22 dan pembanding 23 menunjukkan bahwa aksesibilitas sudah memadai sebelum perubahan.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
