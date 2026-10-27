import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Panel paling efektif pada $$250\\,\\text{Hz}$$ karena nilai $$68\\,\\text{dB}$$ paling dekat dengan hasil setelah panel dilepas, sehingga perbedaannya paling konsisten.",
        },
        {
          correct: true,
          label:
            "Pada $$1{.}000\\,\\text{Hz}$$, selisih antara kondisi berpanel dan dua kondisi tanpa panel paling besar. Temuan itu tetap terbatas pada susunan dan ruang yang diuji.",
        },
        {
          correct: false,
          label:
            "Karena semua angka dengan panel lebih rendah, besar penurunan energi bunyi dapat dihitung langsung sebagai persentase selisih desibel.",
        },
        {
          correct: false,
          label:
            "Perbedaan satu desibel antara kondisi awal dan kondisi setelah panel dilepas membatalkan hubungan apa pun antara panel dan hasil pengukuran.",
        },
        {
          correct: false,
          label:
            "Data $$4{.}000\\,\\text{Hz}$$ membuktikan bahwa panel akan menghasilkan penurunan $$11\\,\\text{dB}$$ di setiap auditorium yang memakai bahan dan ketebalan serupa.",
        },
      ],
    },
  },
};

export default item;
