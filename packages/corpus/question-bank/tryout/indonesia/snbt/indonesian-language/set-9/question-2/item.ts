import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Panel paling efektif pada $$250\\,\\text{Hz}$$ karena nilai $$68\\,\\text{dB}$$ paling dekat dengan hasil setelah panel dilepas, sehingga perbedaannya paling konsisten.",
        },
        {
          isCorrect: true,
          label:
            "Pada $$1{.}000\\,\\text{Hz}$$, selisih antara kondisi berpanel dan dua kondisi tanpa panel paling besar. Temuan itu tetap terbatas pada susunan dan ruang yang diuji.",
        },
        {
          isCorrect: false,
          label:
            "Karena semua angka dengan panel lebih rendah, besar penurunan energi bunyi dapat dihitung langsung sebagai persentase selisih desibel.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan satu desibel antara kondisi awal dan kondisi setelah panel dilepas membatalkan hubungan apa pun antara panel dan hasil pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Data $$4{.}000\\,\\text{Hz}$$ membuktikan bahwa panel akan menghasilkan penurunan $$11\\,\\text{dB}$$ di setiap auditorium yang memakai bahan dan ketebalan serupa.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
