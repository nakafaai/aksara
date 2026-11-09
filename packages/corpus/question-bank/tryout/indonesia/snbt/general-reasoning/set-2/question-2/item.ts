import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "strengthening",
  },
  stimulus: "sekolah",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Di sekolah yang memundurkan jam masuk, penurunan keterlambatan paling besar terjadi pada siswa yang rumahnya paling jauh.",
        },
        {
          correct: false,
          label:
            "Pada tahun yang sama, sekolah yang memundurkan jam masuk juga memperberat sanksi bagi siswa yang datang terlambat ke sekolah.",
        },
        {
          correct: false,
          label:
            "Siswa di kedua kelompok sekolah memakai jenis transportasi yang beragam.",
        },
        {
          correct: false,
          label:
            "Sebagian siswa tetap terlambat walaupun jam masuk sudah dimundurkan.",
        },
        {
          correct: false,
          label:
            "Nilai ujian semester tidak bergantung pada jam masuk sekolah.",
        },
      ],
    },
  },
};

export default item;
