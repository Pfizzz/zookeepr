const fs = require("fs");
const {
    filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");
jest.mock('fs');

test("creates a new zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "Joe Plumber", id: "sdfdfdf" },
        zookeepers
    );

    expect(zookeeper.name).toBe("Joe Plumber");
    expect(zookeeper.id).toBe("sdfdfdf");
});

 test("filters by query", () => {
    const startingZookeepers = [
        {    
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin"
          },
          {
            id: "2",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear"
          },
    ];

    const updatedZookeepers = filterByQuery({ name: "Raksha" }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
 });

 test("finds by id", () => {
     const startingZookeepers = [
        {    
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin"
          },
          {
            id: "2",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear"
          },
     ];

     const result = findById("1", startingZookeepers);

     expect(result.name).toBe("Raksha");
 });

 test("validates favorite animal", () => {
     const favorite = {  
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin",
          };

    const invalidFavorite = {  
        id: "1",
        name: "Raksha",
        age: 31,
      };

    const result = validateZookeeper(favorite);
    const result2 = validateZookeeper(invalidFavorite);

    expect(result).toBe(true);
    expect(result2).toBe(false);
 });

 test("validates age", () => {
    const zookeeper = {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    };
  
    const invalidZookeeper = {
      id: "3",
      name: "Isabella",
      age: "67",
      favoriteAnimal: "bear",
    };
  
    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);
  
    expect(result).toBe(true);
    expect(result2).toBe(false);
  });