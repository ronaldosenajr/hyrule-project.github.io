/**
 * @jest-environment jsdom
 */

const api = require('../src/script');
jest.mock('node-fetch');

descibre('This test ')










/* describe('This test verifies the function that calls the API Hyrule Compendium', () => {
  api.allData = jest.fn().mockResolvedValue({
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

  it('should be the APIs response', async () => {
    expect.assertions(1);

    fetch.mockImplementation(async () => {
      return {
        json: async () => {
          return {
            equipment: 'Windcleaver',
          }
        }
      }
    })

    const data = await api.allData;

    expect(data).toEqual({ equipment, treasure });
  }
)}); */