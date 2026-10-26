import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Model jaring-jaring makanan di kebun sekolah menyederhanakan proses agar dapat diperiksa sambil tetap memiliki batas representasi.",
        },
        {
          correct: false,
          label:
            "Model menggambarkan pengaruh musim dan penyakit secara lengkap sehingga pola pada kartu dapat langsung diterapkan di kebun.",
        },
        {
          correct: false,
          label:
            "Model hanya membantu menghafal nama makhluk hidup tanpa menunjukkan hubungan makan antarpopulasi.",
        },
        {
          correct: false,
          label:
            "Pengulangan langkah pada model memastikan bahwa seluruh keadaan lapangan akan menghasilkan pola yang sama.",
        },
        {
          correct: false,
          label:
            "Faktor yang tidak digambarkan membuat model tidak berguna untuk menjelaskan prinsip atau menyusun pertanyaan baru.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
