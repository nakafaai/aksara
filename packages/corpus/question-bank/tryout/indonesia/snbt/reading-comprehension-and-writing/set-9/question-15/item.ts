import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Nilai slot yang dipesan ulang sebelum waktunya dimulai lebih tinggi. Oleh karena itu, simpulan tentang ruang latihan musik tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Nilai slot yang dipesan ulang sebelum waktunya dimulai lebih tinggi. Selain itu, simpulan tentang ruang latihan musik tetap dibatasi.",
        },
        {
          correct: true,
          label:
            "Nilai slot yang dipesan ulang sebelum waktunya dimulai lebih tinggi. Namun, simpulan tentang ruang latihan musik tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Nilai slot yang dipesan ulang sebelum waktunya dimulai lebih tinggi. Sebelumnya, simpulan tentang ruang latihan musik tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Nilai slot yang dipesan ulang sebelum waktunya dimulai lebih tinggi. Akibatnya, simpulan tentang ruang latihan musik tetap dibatasi.",
        },
      ],
    },
  },
};

export default item;
