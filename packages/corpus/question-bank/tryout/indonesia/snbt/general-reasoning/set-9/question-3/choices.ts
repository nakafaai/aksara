import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Allein die Temperatur entscheidet darüber, ob der Schädlingsdruck zunimmt",
      value: false,
    },
    {
      label:
        "Der Klimawandel kann beeinflussen, wo sich Schädlinge ausbreiten und wie große Schäden sie anrichten",
      value: true,
    },
    {
      label:
        "Pflanzenschädlinge und Pflanzenkrankheiten vernichten jedes Jahr bei jeder Nutzpflanze genau denselben Anteil",
      value: false,
    },
    {
      label:
        "Niederschlag und Landnutzung haben keinen Einfluss auf den Schädlingsdruck",
      value: false,
    },
    {
      label: "Der Klimawandel macht jeden Schädling überall schädlicher",
      value: false,
    },
  ],
  en: [
    {
      label: "Temperature alone determines whether pest pressure increases",
      value: false,
    },
    {
      label:
        "Climate change can alter where pests spread and how damaging they become",
      value: true,
    },
    {
      label:
        "Plant pests and diseases destroy exactly the same share of every crop each year",
      value: false,
    },
    {
      label: "Rainfall and land use have no effect on pest pressure",
      value: false,
    },
    {
      label: "Climate change makes every pest more destructive everywhere",
      value: false,
    },
  ],
  id: [
    {
      label: "Suhu saja menentukan apakah tekanan hama meningkat",
      value: false,
    },
    {
      label:
        "Perubahan iklim dapat mengubah persebaran hama dan tingkat kerusakan yang ditimbulkannya",
      value: true,
    },
    {
      label:
        "Hama dan penyakit tanaman merusak bagian yang sama persis dari setiap jenis tanaman setiap tahun",
      value: false,
    },
    {
      label: "Curah hujan dan penggunaan lahan tidak memengaruhi tekanan hama",
      value: false,
    },
    {
      label:
        "Perubahan iklim membuat setiap hama lebih merusak di semua tempat",
      value: false,
    },
  ],
};

export default choices;
