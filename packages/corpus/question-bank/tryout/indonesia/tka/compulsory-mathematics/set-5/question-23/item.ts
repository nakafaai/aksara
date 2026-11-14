import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "klub",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Kelas X menyumbang anggota Robotik paling banyak, walaupun persentase siswa kelas X yang memilih Robotik paling kecil di antara ketiga kelas.",
        },
        {
          correct: false,
          label:
            "Banyak anggota Paduan Suara dari kelas X tepat dua kali banyak anggota Paduan Suara dari kelas XII.",
        },
        {
          correct: true,
          label:
            "Jika $$8$$ siswa kelas XII pindah dari Robotik ke Futsal, persentase pemilih Robotik dan persentase pemilih Futsal di kelas XII menjadi sama dengan persentase pemilih kedua klub itu di kelas X.",
        },
        {
          correct: false,
          label:
            "Di antara ketiga kelas, kelas XII menyumbang siswa paling banyak untuk gabungan klub Robotik dan Jurnalistik.",
        },
        {
          correct: false,
          label:
            "Jika sekolah menerima $$40$$ siswa baru kelas XII dan semuanya memilih Robotik, lebih dari $$60\\%$$ siswa kelas XII menjadi anggota Robotik.",
        },
      ],
    },
  },
};

export default item;
