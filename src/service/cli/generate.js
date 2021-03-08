'use strict';

const {FILE_NAME, DEFAULT_COUNT, MAX_OFFERS, CATEGORIES, SENTENCES, TITLES, OfferType, SumRestrict, PictureRestrict, ExitCode} = require(`../../constants`);
const {getRandomInt, shuffle, getPictureFileName} = require(`../../utils`);
const fs = require(`fs`);

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, 2)),
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX)
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer > MAX_OFFERS) {
      console.log(`Не больше ${MAX_OFFERS} объявлений!`);
      process.exit(ExitCode.ERROR);
    }
    const content = JSON.stringify(generateOffers(countOffer));
    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.ERROR);
      }
      console.info(`Operation success. File created.`);
      process.exit(ExitCode.SUCCESS);
    });
  }
};
