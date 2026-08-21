import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Der Direktor sagt beide Vorhaben für dieses Jahr ab.",
      value: false,
    },
    {
      label:
        "Der Direktor verschiebt beide Vorhaben bis zur Erteilung der Genehmigung.",
      value: false,
    },
    {
      label: "PT Batik verkauft das neue Produkt in diesem Jahr nicht.",
      value: false,
    },
    {
      label: "PT Batik setzt in diesem Jahr keines der beiden Vorhaben um.",
      value: false,
    },
    {
      label: "PT Batik verkauft das neue Produkt in diesem Jahr.",
      value: true,
    },
  ],
  en: [
    { label: "The director cancels both programs this year.", value: false },
    {
      label:
        "The director postpones both programs until the permit is complete.",
      value: false,
    },
    {
      label: "PT Batik does not sell the new product this year.",
      value: false,
    },
    { label: "PT Batik carries out neither program this year.", value: false },
    { label: "PT Batik sells the new product this year.", value: true },
  ],
  id: [
    {
      label: "Direktur membatalkan kedua program pada tahun ini.",
      value: false,
    },
    {
      label: "Direktur menunda kedua program sampai izin selesai.",
      value: false,
    },
    {
      label: "PT Batik tidak menjual produk baru pada tahun ini.",
      value: false,
    },
    {
      label: "PT Batik tidak menjalankan satu pun program pada tahun ini.",
      value: false,
    },
    { label: "PT Batik menjual produk baru pada tahun ini.", value: true },
  ],
};

export default choices;
