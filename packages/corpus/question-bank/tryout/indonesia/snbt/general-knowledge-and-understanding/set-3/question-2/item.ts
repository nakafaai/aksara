import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Nilai pengukuran berulang tetap berada dalam rentang sempit meskipun waktu pengambilan berbeda.",
        },
        {
          correct: false,
          label:
            "Instrumen diuji untuk memastikan bahwa skor benar-benar mewakili konsep yang hendak diukur.",
        },
        {
          correct: false,
          label:
            "Data dikumpulkan menurut urutan langkah yang direncanakan dan diulang dengan aturan yang sama.",
        },
        {
          correct: false,
          label:
            "Penilai memakai rubrik yang ditetapkan sebelum mengetahui identitas peserta atau hasil akhirnya.",
        },
        {
          correct: true,
          label:
            "Satuan, aturan pembulatan, dan batas setiap kategori ditetapkan sebelum pencatatan dimulai.",
        },
      ],
    },
  },
};

export default item;
