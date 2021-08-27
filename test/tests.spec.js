const allData = require('../src/script');
jest.mock('../src/script');

describe('This test verifies the function that calls the API Hyrule Compendium', () => {
  allData = jest.fn().mockResolvedValue({
    creatures: {
      food: 'Armored Porgy',
      non_food: 'Blue Sparrow',
    },
    equipment: 'Windcleaver',
    materials: 'Swift Carrot',
    monsters: 'Silver Lizalfos',
    treasure: 'Treasure Chest',
    all: ['Armored Porgy', 'Blue Sparrow', 'Windcleaver', 'Swift Carrot', 'Silver Lizalfos', 'Treasure Chest'],
  })

  it('should be the APIs response', async () => (
    allData().then(() => {
      expect(allData.creatures.food).toEqual('Armored Porgy');
      expect(allData.creatures.non_food).toEqual('Blue Sparrow');
      expect(allData.equipment).toEqual('Windcleaver');
    })
  ));
});