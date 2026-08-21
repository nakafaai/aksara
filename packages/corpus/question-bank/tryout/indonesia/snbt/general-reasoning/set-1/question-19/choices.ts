import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Beikost wird im Allgemeinen ab einem Alter von etwa $$6$$ Monaten eingeführt.",
      value: false,
    },
    {
      label:
        "Das Stillen kann nach der Einführung von Beikost fortgesetzt werden.",
      value: false,
    },
    {
      label: "Beikost soll ausreichend, sicher und nährstoffreich sein.",
      value: false,
    },
    {
      label:
        "Obst und Gemüse sind Bestandteil einer abwechslungsreichen Beikost.",
      value: false,
    },
    {
      label:
        "Gemüse allein deckt nach dem Alter von $$6$$ Monaten alle benötigten Lebensmittelgruppen ab.",
      value: true,
    },
  ],
  en: [
    {
      label:
        "Complementary foods are generally introduced at about $$6$$ months of age.",
      value: false,
    },
    {
      label:
        "Breastfeeding can continue after complementary foods are introduced.",
      value: false,
    },
    {
      label:
        "Complementary foods should be adequate, safe, and nutrient-dense.",
      value: false,
    },
    {
      label: "Fruits and vegetables are part of a diverse complementary diet.",
      value: false,
    },
    {
      label:
        "Vegetables alone provide every food group an infant needs after $$6$$ months.",
      value: true,
    },
  ],
  id: [
    {
      label:
        "Makanan pendamping umumnya mulai diberikan sekitar usia $$6$$ bulan.",
      value: false,
    },
    {
      label:
        "Pemberian ASI dapat dilanjutkan setelah makanan pendamping mulai diberikan.",
      value: false,
    },
    {
      label: "Makanan pendamping harus cukup, aman, dan padat gizi.",
      value: false,
    },
    {
      label:
        "Buah dan sayuran merupakan bagian dari makanan pendamping yang beragam.",
      value: false,
    },
    {
      label:
        "Sayuran saja menyediakan seluruh kelompok makanan yang dibutuhkan bayi setelah usia $$6$$ bulan.",
      value: true,
    },
  ],
};

export default choices;
