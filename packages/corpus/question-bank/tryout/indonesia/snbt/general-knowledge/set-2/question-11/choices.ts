import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "ein Milcherzeugnis, das garantiert keine Laktose enthält.",
      value: false,
    },
    {
      label: "ein Milcherzeugnis, das nur für ältere Menschen bestimmt ist.",
      value: false,
    },
    {
      label: "ein Arzneimittel zur Behandlung von Verdauungskrankheiten.",
      value: false,
    },
    {
      label:
        "ein durch Mikroorganismen fermentativ verändertes Milcherzeugnis.",
      value: true,
    },
    {
      label: "ein vor dem Verzehr mit Sauerstoff vermischtes Milcherzeugnis.",
      value: false,
    },
  ],
  en: [
    {
      label: "dairy that is guaranteed to contain no lactose.",
      value: false,
    },
    {
      label: "dairy intended only for older adults.",
      value: false,
    },
    {
      label: "a medicine for treating digestive disease.",
      value: false,
    },
    {
      label: "dairy transformed by microorganisms through fermentation.",
      value: true,
    },
    {
      label: "dairy mixed with oxygen before consumption.",
      value: false,
    },
  ],
  id: [
    {
      label: "produk susu yang dijamin tidak mengandung laktosa.",
      value: false,
    },
    {
      label: "produk susu yang hanya ditujukan bagi lansia.",
      value: false,
    },
    {
      label: "obat untuk menangani penyakit pencernaan.",
      value: false,
    },
    {
      label: "produk susu yang diubah oleh mikroorganisme melalui fermentasi.",
      value: true,
    },
    {
      label: "produk susu yang dicampur oksigen sebelum diminum.",
      value: false,
    },
  ],
};

export default choices;
