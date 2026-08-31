import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Simulasi membandingkan pengaruh air bersuhu 35 derajat Celsius terhadap produksi gas pada campuran ragi, sambil mengendalikan faktor yang disebutkan tetapi menjadikan satu uji singkat sebagai bukti yang berlaku umum.",
        },
        {
          isCorrect: false,
          label:
            "Simulasi membandingkan pengaruh air bersuhu 35 derajat Celsius terhadap produksi gas pada campuran ragi, sambil menyebut keterbatasan tetapi mengeluarkan kondisi pembanding dari penafsiran hasil.",
        },
        {
          isCorrect: false,
          label:
            "Simulasi membandingkan pengaruh air bersuhu 35 derajat Celsius terhadap produksi gas pada campuran ragi, sambil menjadikan definisi istilah ilmiah sebagai hasil ukur yang menutup penelitian.",
        },
        {
          isCorrect: false,
          label:
            "Simulasi membandingkan pengaruh air bersuhu 35 derajat Celsius terhadap produksi gas pada campuran ragi, sambil memakai pembanding hanya untuk mengukuhkan hipotesis awal dan menghapus ketidakpastian yang tersisa.",
        },
        {
          isCorrect: true,
          label:
            "Simulasi membandingkan pengaruh air bersuhu 35 derajat Celsius terhadap produksi gas pada campuran ragi, sambil mengendalikan faktor lain dan mengakui keterbatasan pengukuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
