import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            'Karena langkah "siswa membandingkan susunan seri dan paralel sambil menjaga jenis baterai tetap sama" dapat diulang, model sudah mencakup faktor yang hilang ketika model memakai tegangan rendah dan tidak mewakili instalasi rumah dan dapat menggantikan pengamatan lapangan.',
        },
        {
          correct: false,
          label:
            "Keterbatasan bahwa model memakai tegangan rendah dan tidak mewakili instalasi rumah membuat hubungan bahwa susunan komponen menentukan jalur arus dan perilaku setiap lampu tidak dapat diperiksa, bahkan di dalam model.",
        },
        {
          correct: false,
          label:
            "Hubungan bahwa susunan komponen menentukan jalur arus dan perilaku setiap lampu dapat diterapkan langsung pada keadaan nyata selama urutan model diulang dengan cara yang sama.",
        },
        {
          correct: true,
          label:
            "Pengulangan model dapat menguji hubungan susunan dan perilaku lampu, tetapi hasilnya menjadi hipotesis untuk pengamatan nyata karena model bertegangan rendah dan bukan instalasi rumah.",
        },
        {
          correct: false,
          label:
            "Definisi istilah pada akhir bacaan sudah cukup membuktikan hubungan sebab dalam rangkaian listrik dengan dua lampu, meskipun bagian model tidak dibandingkan.",
        },
      ],
    },
  },
};

export default item;
