import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Parcel M is sent to refrigerated storage.",
      value: false,
    },
    {
      label:
        "Parcel M is sent to manual inspection because it has a blue label.",
      value: true,
    },
    {
      label: "A parcel with a red label is sent to manual inspection.",
      value: false,
    },
    {
      label: "Parcel M is not sent to manual inspection.",
      value: false,
    },
    {
      label: "No parcel is sent to both routes.",
      value: false,
    },
  ],
  id: [
    {
      label: "Paket M dikirim ke penyimpanan berpendingin.",
      value: false,
    },
    {
      label:
        "Paket M dikirim ke pemeriksaan manual karena memiliki label biru.",
      value: true,
    },
    {
      label: "Paket berlabel merah dikirim ke pemeriksaan manual.",
      value: false,
    },
    {
      label: "Paket M tidak dikirim ke pemeriksaan manual.",
      value: false,
    },
    {
      label: "Tidak ada paket yang dikirim ke kedua jalur.",
      value: false,
    },
  ],
};

export default choices;
