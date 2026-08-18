import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "It is necessarily true because green land cover decreased.",
      value: false,
    },
    {
      label: "It is probably true because land surface temperature increased.",
      value: false,
    },
    {
      label:
        "It is definitely false because the project recorded no flooding data.",
      value: false,
    },
    {
      label:
        "It is not supported by the information because it introduces an outcome that was neither measured nor linked by a stated rule.",
      value: true,
    },
    {
      label:
        "It is supported because airborne particles and flooding are equivalent outcomes.",
      value: false,
    },
  ],
  id: [
    {
      label: "Simpulan itu pasti benar karena tutupan lahan hijau berkurang.",
      value: false,
    },
    {
      label:
        "Simpulan itu mungkin benar karena suhu permukaan lahan meningkat.",
      value: false,
    },
    {
      label:
        "Simpulan itu pasti salah karena proyek tidak mencatat data banjir.",
      value: false,
    },
    {
      label:
        "Simpulan itu tidak didukung oleh informasi karena memperkenalkan hasil yang tidak diukur dan tidak dihubungkan oleh aturan apa pun.",
      value: true,
    },
    {
      label:
        "Simpulan itu didukung karena partikel di udara dan banjir merupakan hasil yang setara.",
      value: false,
    },
  ],
};

export default choices;
