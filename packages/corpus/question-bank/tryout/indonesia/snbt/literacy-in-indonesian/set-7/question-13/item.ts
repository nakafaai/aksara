import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Proporsi pasien yang tidak kembali meningkat $$14$$ persen karena selisih jumlah pasiennya adalah $$56$$ dikurangi $$42$$.",
        },
        {
          correct: false,
          label:
            "Proporsi pasien yang tidak kembali meningkat dari sekitar $$67$$ persen menjadi sekitar $$70$$ persen, yaitu $$3$$ poin persentase.",
        },
        {
          correct: false,
          label:
            "Dari seluruh $$60$$ pasien pada kondisi penanda baru, sekitar $$133$$ persen berhasil tanpa kembali karena $$56$$ dibagi $$42$$ bernilai sekitar $$1{,}33$$.",
        },
        {
          correct: true,
          label:
            "Proporsi pasien yang tidak kembali meningkat dari $$70$$ persen menjadi sekitar $$93{,}3$$ persen, sehingga selisihnya sekitar $$23{,}3$$ poin persentase.",
        },
        {
          correct: false,
          label:
            "Proporsi pasien yang tidak kembali meningkat $$33{,}3$$ poin persentase karena hasil penanda baru sekitar sepertiga lebih besar daripada hasil penanda lama.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
