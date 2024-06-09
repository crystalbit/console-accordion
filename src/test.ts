import { AccordionData, showAccordion } from "./package";

const data: AccordionData = [
  {
    title: "Title 1",
    content: "Content 1",
  },
  {
    title: "Title 2",
    content: "Content 2",
  },
  {
    title: "Title 3",
    content: "Content 3\nmore content\nгде та молодая шпана что сотрет нас с лица земли",
  }
];

showAccordion(data, {
  title: "Accordion Title",
});
