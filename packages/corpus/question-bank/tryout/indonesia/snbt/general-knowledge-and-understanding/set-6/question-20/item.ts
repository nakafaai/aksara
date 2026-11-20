import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "word-relation",
    topic: "antonym",
  },
  stimulus: "biopori",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Bekal air minum untuk pendakian itu sudah *mencukupi*.",
        },
        {
          correct: true,
          label:
            "Jumlah tenaga medis di pulau itu masih *kurang* dibandingkan jumlah penduduknya.",
        },
        {
          correct: false,
          label: "*Banyak* warga hadir dalam rapat RT semalam.",
        },
        {
          correct: false,
          label: "Jawaban siswa itu *tepat* sesuai dengan pertanyaan guru.",
        },
        {
          correct: false,
          label: "Rumah bekas banjir itu kini sudah *layak* dihuni.",
        },
      ],
    },
  },
};

export default item;
