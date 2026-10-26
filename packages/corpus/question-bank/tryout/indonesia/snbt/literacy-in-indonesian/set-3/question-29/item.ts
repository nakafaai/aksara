import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Definisi *simbol* memastikan bahwa lampu selalu berarti kegiatan membaca dalam cerita apa pun, terlepas dari konteksnya.",
        },
        {
          correct: true,
          label:
            "Definisi *simbol* menjelaskan cara lampu membawa makna undangan melalui perbedaan keadaan panggung sebelum dan sesudah tindakan Mira.",
        },
        {
          correct: false,
          label:
            "Definisi itu menjadikan setiap benda yang disebut lebih dari sekali sebagai simbol, meskipun tidak berkaitan dengan konflik atau perubahan.",
        },
        {
          correct: false,
          label:
            "Penyebutan *simbol* membuat kesan pribadi pembaca cukup, meskipun bertentangan dengan keadaan panggung dalam cerita.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut hanya menerangkan fungsi lampu sebagai alat penerangan sehingga respons penumpang tidak relevan.",
        },
      ],
    },
  },
  stimulus: "passage-6",
};

export default item;
