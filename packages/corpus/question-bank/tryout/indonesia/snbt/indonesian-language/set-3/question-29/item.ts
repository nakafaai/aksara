import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Definisi *simbol* memastikan bahwa lampu selalu berarti kegiatan membaca dalam cerita apa pun, terlepas dari konteksnya.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *simbol* menjelaskan cara lampu membawa makna undangan melalui perbedaan keadaan panggung sebelum dan sesudah tindakan Mira.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu menjadikan setiap benda yang disebut lebih dari sekali sebagai simbol, meskipun tidak berkaitan dengan konflik atau perubahan.",
        },
        {
          isCorrect: false,
          label:
            "Penyebutan *simbol* membuat kesan pribadi pembaca cukup, meskipun bertentangan dengan keadaan panggung dalam cerita.",
        },
        {
          isCorrect: false,
          label:
            "Definisi tersebut hanya menerangkan fungsi lampu sebagai alat penerangan sehingga respons penumpang tidak relevan.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
