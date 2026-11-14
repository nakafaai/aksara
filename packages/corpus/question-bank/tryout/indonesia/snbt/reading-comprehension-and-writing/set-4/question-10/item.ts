import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "coherence",
  },
  stimulus: "gambut",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "kalimat (4), karena kata _berlebihan_ bertentangan dengan isi paragraf",
        },
        {
          correct: false,
          label: "kalimat (5), karena memuat tiga kegiatan dalam satu kalimat",
        },
        {
          correct: true,
          label:
            "kalimat (6), karena mengulang isi paragraf pertama dan memisahkan _suhu itu_ pada kalimat (7) dari rujukannya",
        },
        {
          correct: false,
          label:
            "kalimat (7), karena rincian alat ukur tidak berhubungan dengan pemadaman",
        },
        {
          correct: false,
          label: "kalimat (8), karena mengulang isi kalimat (5)",
        },
      ],
    },
  },
};

export default item;
