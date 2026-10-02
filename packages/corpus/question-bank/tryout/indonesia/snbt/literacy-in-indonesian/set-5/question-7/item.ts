import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Karena langkah "siswa membandingkan susunan seri dan paralel sambil menjaga jenis baterai tetap sama" dapat diulang, model sudah mencakup faktor yang hilang ketika model memakai tegangan rendah dan tidak mewakili instalasi rumah dan dapat menggantikan pengamatan lapangan.',
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bahwa model memakai tegangan rendah dan tidak mewakili instalasi rumah membuat hubungan bahwa susunan komponen menentukan jalur arus dan perilaku setiap lampu tidak dapat diperiksa, bahkan di dalam model.",
        },
        {
          isCorrect: false,
          label:
            "Hubungan bahwa susunan komponen menentukan jalur arus dan perilaku setiap lampu dapat diterapkan langsung pada keadaan nyata selama urutan model diulang dengan cara yang sama.",
        },
        {
          isCorrect: true,
          label:
            "Pengulangan model dapat menguji hubungan susunan dan perilaku lampu, tetapi hasilnya menjadi hipotesis untuk pengamatan nyata karena model bertegangan rendah dan bukan instalasi rumah.",
        },
        {
          isCorrect: false,
          label:
            "Definisi istilah pada akhir bacaan sudah cukup membuktikan hubungan sebab dalam rangkaian listrik dengan dua lampu, meskipun bagian model tidak dibandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
