beforeEach(() => {
  cy.visit('/');
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
});
describe('test add ingredients for constructor', () => {
  it('should add to ingredient from list to constructor', () => {
    // cy.get(`[data-cy='643d69a5c3f7b9001cfa093e']`).click();
    cy.contains('Добавить').click();
    console.log(cy.get('button:contains("Добавить")'));
  });
  it('should open modal with ingredients on click card', () => {
    cy.contains('Биокотлета из марсианской Магнолии').click();
  });
});

// it('should add to ingredient from list to constructor', () => {
//   cy.visit('/');
//   const item = cy.get(`[data-cy=${'643d69a5c3f7b9001cfa093e'}]`);
//   item.click();
// });
