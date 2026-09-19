import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Model jaring-jaring makanan di kebun sekolah menyederhanakan proses agar dapat diperiksa sambil tetap memiliki batas representasi.",
        },
        {
          isCorrect: false,
          label:
            "Model menggambarkan pengaruh musim dan penyakit secara lengkap sehingga pola pada kartu dapat langsung diterapkan di kebun.",
        },
        {
          isCorrect: false,
          label:
            "Model hanya membantu menghafal nama makhluk hidup tanpa menunjukkan hubungan makan antarpopulasi.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan langkah pada model memastikan bahwa seluruh keadaan lapangan akan menghasilkan pola yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Faktor yang tidak digambarkan membuat model tidak berguna untuk menjelaskan prinsip atau menyusun pertanyaan baru.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
