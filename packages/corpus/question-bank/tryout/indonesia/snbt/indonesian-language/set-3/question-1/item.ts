import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Simulasi membandingkan pengaruh pencahayaan enam jam terhadap perkecambahan kacang hijau dengan jarak lampu dijaga tetap, sambil mengendalikan faktor yang disebutkan tetapi menjadikan satu uji singkat sebagai bukti yang berlaku umum.",
        },
        {
          isCorrect: false,
          label:
            "Simulasi membandingkan pengaruh pencahayaan enam jam terhadap perkecambahan kacang hijau dengan jarak lampu dijaga tetap, sambil menyebut keterbatasan tetapi mengeluarkan kondisi pembanding dari penafsiran hasil.",
        },
        {
          isCorrect: false,
          label:
            "Simulasi membandingkan pengaruh pencahayaan enam jam terhadap perkecambahan kacang hijau dengan jarak lampu dijaga tetap, sambil menjadikan definisi istilah ilmiah sebagai hasil ukur yang menutup penelitian.",
        },
        {
          isCorrect: true,
          label:
            "Simulasi membandingkan pengaruh pencahayaan enam jam terhadap perkecambahan kacang hijau dengan jarak lampu dijaga tetap, sambil mengendalikan faktor lain dan mengakui keterbatasan pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Simulasi membandingkan pengaruh pencahayaan enam jam terhadap perkecambahan kacang hijau dengan jarak lampu dijaga tetap, sambil memakai pembanding hanya untuk mengukuhkan hipotesis awal dan menghapus ketidakpastian yang tersisa.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
