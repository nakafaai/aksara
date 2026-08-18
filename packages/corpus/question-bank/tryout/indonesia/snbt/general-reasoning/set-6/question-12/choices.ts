import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "Both economic indicators increased.", value: false },
    {
      label: "Only the real wage of farmworkers failed to increase.",
      value: false,
    },
    {
      label: "Village poverty and rural-urban inequality will both decrease.",
      value: false,
    },
    {
      label: "The model provides no conclusion about poverty or inequality.",
      value: false,
    },
    {
      label: "Village poverty and rural-urban inequality will both increase.",
      value: true,
    },
  ],
  id: [
    { label: "Kedua indikator ekonomi tersebut meningkat.", value: false },
    { label: "Hanya upah riil buruh tani yang tidak meningkat.", value: false },
    {
      label:
        "Kemiskinan desa dan ketimpangan desa-kota akan sama-sama menurun.",
      value: false,
    },
    {
      label:
        "Model tersebut tidak memberikan simpulan tentang kemiskinan atau ketimpangan.",
      value: false,
    },
    {
      label:
        "Kemiskinan desa dan ketimpangan desa-kota akan sama-sama meningkat.",
      value: true,
    },
  ],
};

export default choices;
