import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Allein die Temperatur entscheidet darüber, ob der Schädlingsdruck zunimmt",
        },
        {
          isCorrect: true,
          label:
            "Der Klimawandel kann beeinflussen, wo sich Schädlinge ausbreiten und wie große Schäden sie anrichten",
        },
        {
          isCorrect: false,
          label:
            "Pflanzenschädlinge und Pflanzenkrankheiten vernichten jedes Jahr bei jeder Nutzpflanze genau denselben Anteil",
        },
        {
          isCorrect: false,
          label:
            "Niederschlag und Landnutzung haben keinen Einfluss auf den Schädlingsdruck",
        },
        {
          isCorrect: false,
          label: "Der Klimawandel macht jeden Schädling überall schädlicher",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Temperature alone determines whether pest pressure increases",
        },
        {
          isCorrect: true,
          label:
            "Climate change can alter where pests spread and how damaging they become",
        },
        {
          isCorrect: false,
          label:
            "Plant pests and diseases destroy exactly the same share of every crop each year",
        },
        {
          isCorrect: false,
          label: "Rainfall and land use have no effect on pest pressure",
        },
        {
          isCorrect: false,
          label: "Climate change makes every pest more destructive everywhere",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Suhu saja menentukan apakah tekanan hama meningkat",
        },
        {
          isCorrect: true,
          label:
            "Perubahan iklim dapat mengubah persebaran hama dan tingkat kerusakan yang ditimbulkannya",
        },
        {
          isCorrect: false,
          label:
            "Hama dan penyakit tanaman merusak bagian yang sama persis dari setiap jenis tanaman setiap tahun",
        },
        {
          isCorrect: false,
          label:
            "Curah hujan dan penggunaan lahan tidak memengaruhi tekanan hama",
        },
        {
          isCorrect: false,
          label:
            "Perubahan iklim membuat setiap hama lebih merusak di semua tempat",
        },
      ],
    },
  },
};

export default item;
