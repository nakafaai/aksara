import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-3",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menjadikan keberadaan peta raba sebagai bukti otomatis bahwa jalur dapat digunakan semua orang.",
        },
        {
          correct: false,
          label:
            "Mengarahkan pembaca agar hanya memakai persentase gabungan karena aksesibilitas merupakan sifat seluruh jalur.",
        },
        {
          correct: true,
          label:
            "Mengubah tolok ukur dari sekadar kenaikan proporsi gabungan menjadi kemampuan beragam kelompok memakai informasi secara mandiri.",
        },
        {
          correct: false,
          label:
            "Menyamakan akses informasi dengan jumlah peserta sehingga kelompok terbesar otomatis menentukan keberhasilan.",
        },
        {
          correct: false,
          label:
            "Membatasi penilaian pada kemampuan membaca huruf besar tanpa mempertimbangkan penggunaan informasi tersebut.",
        },
      ],
    },
  },
};

export default item;
