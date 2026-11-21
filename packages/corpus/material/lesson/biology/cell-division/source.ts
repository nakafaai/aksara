import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/biology/cell-division",
  domain: "biology",
  key: "lesson.biology.cell-division",
  kind: "lesson",
  routeSlugs: {
    de: "zellteilung",
    en: "cell-division",
    id: "pembelahan-sel",
    ms: "pembahagian-sel",
  },
  sections: ["mitosis-meiosis"],
  slug: "cell-division",
  translations: {
    de: {
      description: "Vergleiche Mitose und Meiose im Zellzyklus.",
      title: "Zellteilung",
    },
    en: {
      description: "Compare mitosis and meiosis and follow the cell cycle.",
      title: "Cell Division",
    },
    id: {
      description: "Bandingkan mitosis dan meiosis serta ikuti siklus sel.",
      title: "Pembelahan Sel",
    },
    ms: {
      description: "Bandingkan mitosis dan meiosis serta ikuti kitar sel.",
      title: "Pembahagian Sel",
    },
  },
};

export default lesson;
