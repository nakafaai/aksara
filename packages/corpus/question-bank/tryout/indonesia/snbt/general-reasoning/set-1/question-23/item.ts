import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Allein die Temperatur entscheidet darüber, ob der Schädlingsdruck zunimmt",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Der Klimawandel kann beeinflussen, wo sich Schädlinge ausbreiten und wie große Schäden sie anrichten",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pflanzenschädlinge und Pflanzenkrankheiten vernichten jedes Jahr bei jeder Nutzpflanze genau denselben Anteil",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Niederschlag und Landnutzung haben keinen Einfluss auf den Schädlingsdruck",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Klimawandel macht jeden Schädling überall schädlicher",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Temperature alone determines whether pest pressure increases",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Climate change can alter where pests spread and how damaging they become",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Plant pests and diseases destroy exactly the same share of every crop each year",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Rainfall and land use have no effect on pest pressure",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Climate change makes every pest more destructive everywhere",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Suhu saja menentukan apakah tekanan hama meningkat",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Perubahan iklim dapat mengubah persebaran hama dan tingkat kerusakan yang ditimbulkannya",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Hama dan penyakit tanaman merusak bagian yang sama persis dari setiap jenis tanaman setiap tahun",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Curah hujan dan penggunaan lahan tidak memengaruhi tekanan hama",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Perubahan iklim membuat setiap hama lebih merusak di semua tempat",
            },
          ],
        },
      ],
    },
  },
};

export default item;
