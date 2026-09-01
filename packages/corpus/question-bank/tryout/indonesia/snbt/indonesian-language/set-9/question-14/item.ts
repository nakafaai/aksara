import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Menjadikan keberadaan peta raba sebagai bukti otomatis bahwa jalur dapat digunakan semua orang.",
        },
        {
          isCorrect: false,
          label:
            "Mengarahkan pembaca agar hanya memakai persentase gabungan karena aksesibilitas merupakan sifat seluruh jalur.",
        },
        {
          isCorrect: true,
          label:
            "Mengubah tolok ukur dari sekadar kenaikan rata-rata menjadi kemampuan beragam kelompok memakai informasi secara mandiri.",
        },
        {
          isCorrect: false,
          label:
            "Menyamakan akses informasi dengan jumlah peserta sehingga kelompok terbesar otomatis menentukan keberhasilan.",
        },
        {
          isCorrect: false,
          label:
            "Membatasi penilaian pada kemampuan membaca huruf besar tanpa mempertimbangkan penggunaan informasi tersebut.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
