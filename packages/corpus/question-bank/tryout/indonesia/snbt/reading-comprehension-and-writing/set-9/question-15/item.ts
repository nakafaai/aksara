import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nilai slot yang dipesan ulang sebelum waktunya dimulai lebih tinggi. Oleh karena itu, simpulan tentang ruang latihan musik tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Nilai slot yang dipesan ulang sebelum waktunya dimulai lebih tinggi. Selain itu, simpulan tentang ruang latihan musik tetap dibatasi.",
        },
        {
          isCorrect: true,
          label:
            "Nilai slot yang dipesan ulang sebelum waktunya dimulai lebih tinggi. Namun, simpulan tentang ruang latihan musik tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Nilai slot yang dipesan ulang sebelum waktunya dimulai lebih tinggi. Sebelumnya, simpulan tentang ruang latihan musik tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Nilai slot yang dipesan ulang sebelum waktunya dimulai lebih tinggi. Akibatnya, simpulan tentang ruang latihan musik tetap dibatasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
