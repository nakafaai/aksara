import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Simulasi membandingkan pengaruh pemasangan panel peneduh selama empat jam siang terhadap suhu air kolam mini, sambil mengendalikan faktor yang disebutkan tetapi menjadikan satu uji singkat sebagai bukti yang berlaku umum.",
        },
        {
          correct: false,
          label:
            "Simulasi membandingkan pengaruh pemasangan panel peneduh selama empat jam siang terhadap suhu air kolam mini, sambil menyebut keterbatasan tetapi mengeluarkan kondisi pembanding dari penafsiran hasil.",
        },
        {
          correct: false,
          label:
            "Simulasi membandingkan pengaruh pemasangan panel peneduh selama empat jam siang terhadap suhu air kolam mini, sambil menjadikan definisi istilah ilmiah sebagai hasil ukur yang menutup penelitian.",
        },
        {
          correct: false,
          label:
            "Simulasi membandingkan pengaruh pemasangan panel peneduh selama empat jam siang terhadap suhu air kolam mini, sambil memakai pembanding hanya untuk mengukuhkan hipotesis awal dan menghapus ketidakpastian yang tersisa.",
        },
        {
          correct: true,
          label:
            "Simulasi membandingkan pengaruh pemasangan panel peneduh selama empat jam siang terhadap suhu air kolam mini, sambil mengendalikan faktor lain dan mengakui keterbatasan pengukuran.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
