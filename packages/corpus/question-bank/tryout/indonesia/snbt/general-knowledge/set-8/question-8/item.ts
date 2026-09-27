import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Struktur basis data dapat memengaruhi nama siapa yang tampak paling sah bagi pengguna.",
        },
        {
          isCorrect: false,
          label:
            "Setiap objek harus ditampilkan tanpa judul utama agar semua nama benar-benar setara.",
        },
        {
          isCorrect: false,
          label:
            "Nama yang paling sering dikutip pasti merupakan nama yang diberikan pembuat kain.",
        },
        {
          isCorrect: false,
          label: "Salah satu nama dalam buku lama dibuat oleh kurator.",
        },
        {
          isCorrect: false,
          label: "Hasil pencarian akan menampilkan sumber setiap nama.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
