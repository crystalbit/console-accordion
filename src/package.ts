type AccordionItem = {
  title: string;
  content?: string;
  replace?: string;
};

export type AccordionData = Array<AccordionItem>;

export type AccordionProps = {

};

const drawMapping = (index: number, data: AccordionData) => {
  console.clear();
  const rawArray: Array<AccordionItem> = [...data];
  for (let i = 0; i < rawArray.length; i++) {
    if (i === index) {
      (rawArray[i].replace ?? rawArray[i].title).split('\n').forEach((line, idx) => {
        console.log(`${idx === 0 ? "❯" : "·"} ${line}`);
      });
      if (rawArray[i].content) {
        rawArray[i].content!.split('\n').forEach((line) => {
          console.log(`    ${line}`);
        });
      }
    } else {
      rawArray[i].title.split('\n').forEach((line, idx) => {
        console.log(`${idx === 0 ? " " : " "} ${line}`);
      });
    }
  }
  process.stderr.write('\x1B[?25l'); // hide cursor
}

const UP_CODE = 65;
const DOWN_CODE = 66;

export const showAccordion = (data: AccordionData, props: AccordionProps = {}) => {
  let index = 0;
  (() => {
    drawMapping(index, data);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function(key) {
      const str = key.toString();
      let isUp = false;
      let isDown = false;
      if (str.length == 3) {
        isUp = str.charCodeAt(0) === 27 && str.charCodeAt(1) === 91 && str.charCodeAt(2) === UP_CODE;
        isDown = str.charCodeAt(0) === 27 && str.charCodeAt(1) === 91 && str.charCodeAt(2) === DOWN_CODE;
      }
      if (str.length == 1) {
        if (str.charCodeAt(0) === 3) {
          process.exit(); // ctrl-c
        }
      }
      if (isUp) {
        index = index === 0 ? 0 : index - 1;
      }
      if (isDown) {
        index = index === data.length - 1 ? data.length - 1 : index + 1;
      }
      if (isUp || isDown) {
        drawMapping(index, data);
      }
    });
  })();
};
