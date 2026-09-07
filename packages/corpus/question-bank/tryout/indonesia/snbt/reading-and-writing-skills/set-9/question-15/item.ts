import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Der Wert der vor ihrem Beginn neu gebuchten Termine war höher. Deshalb blieb die Schlussfolgerung zu den Proberäumen begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Der Wert der vor ihrem Beginn neu gebuchten Termine war höher. Außerdem blieb die Schlussfolgerung zu den Proberäumen begrenzt.",
        },
        {
          isCorrect: true,
          label:
            "Der Wert der vor ihrem Beginn neu gebuchten Termine war höher. Dennoch blieb die Schlussfolgerung zu den Proberäumen begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Der Wert der vor ihrem Beginn neu gebuchten Termine war höher. Zuvor blieb die Schlussfolgerung zu den Proberäumen begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Der Wert der vor ihrem Beginn neu gebuchten Termine war höher. Folglich blieb die Schlussfolgerung zu den Proberäumen begrenzt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The value for slots rebooked before their start time was higher. Therefore, the conclusion about the practice rooms remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The value for slots rebooked before their start time was higher. Moreover, the conclusion about the practice rooms remained limited.",
        },
        {
          isCorrect: true,
          label:
            "The value for slots rebooked before their start time was higher. Nevertheless, the conclusion about the practice rooms remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The value for slots rebooked before their start time was higher. Previously, the conclusion about the practice rooms remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The value for slots rebooked before their start time was higher. Consequently, the conclusion about the practice rooms remained limited.",
        },
      ],
    },
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
